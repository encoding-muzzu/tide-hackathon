// import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Loader from "./shade/Loaders/Loaders"
import Loader from "../../shade/Loaders/Loaders"

import { useDispatch, useSelector } from "react-redux";
import {
  loginrequest,
  registerUserAction,
  getUserProfileAction,
  getUserProfile,
  loginSagaAction,
  UserProfilereq,
  kycAction,
} from "../../Store/SagaActions/LoginSagaAction";
import toast from "react-hot-toast";

import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import KycFields from '../kyc/kycFields';
import styled from "styled-components";
import Popup from "../../services/popup";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [load, setLoad] = useState(false);
  const [isKyc, setIsKyc] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);
  const [kycData, setKycData] = useState({});
  const kycStatus = useSelector((store) => store.HomeReducer?.userData?.is_kyc)

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("token");

    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(kycStatus, '--isKyc')
    if (!kycStatus) {
      setIsKyc(kycStatus)
    }
  }, [kycStatus])


  const useProfileResponseData = (data, error) => {
    if (error) {
      // console.log("+++++++++++++++++++++++++++",data);
      toast.error(data?.data?.message);
      setLoad(false);
      return;
    }
    // console.log(data?.data?.data ,"yy!");
    if (data?.data?.status !== 200) {
      // console.log("+++++++++++++");
      toast.error(data?.data?.message);
      sessionStorage.clear();
      navigate("/");
    } else if (data?.data?.status === 200) {
      // console.log("++++++++++++",data.data);
      setUserData(data?.data?.data);
      dispatch(getUserProfile(data?.data?.data));
    }
    setLoad(false);
  };

  useEffect(() => {
    setLoad(true);
    dispatch(getUserProfileAction({ callback: useProfileResponseData }));
  }, []);

  const handlePopupClose = () => {
    setTogglePopup(!togglePopup);
  };
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setKycData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  useEffect(() => {
    console.log(kycData)
  }, [kycData])

  const handleSubmit = (event) => {
    event.preventDefault();
    let model = {
      // to_addr: getSendAmount?.toAddress,
      // amount: getSendAmount?.amount,
      // description: "adfs"
    }
    dispatch(kycAction({ model, callback: respKyc }))
    setLoad(true);


  };

  const respKyc = (data) => {
    setLoad(false);
    if (data?.data?.status === 200) {
      console.log(data?.data?.status, '-p>')
    } else {
      kycData({})
    }
  };




  return (
    <>
      {load && <Loader />}
      <div className="wrap" style={{ marginLeft: "-16px ", color: "black", fontWeight: "600" }}>
        <div className="example" style={{ border: "none" }}>
          <h4 className="text-primary text-center mt-3">
            Hi, <span className="text-uppercase">{userData?.name || ""}</span>
          </h4>
          <h3 className="text-primary mb-3 text-center mt-3 mb-5">Welcome to Tide Bank</h3>
          <div className="w-75 mx-auto">
            <Row className="gap-3">
              <Col className="border border-primary rounded p-4">
                <h5>User Details</h5>
                <Table borderless hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{userData?.name || "-"}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td colSpan={0}>{userData?.email || "-"}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{userData?.address || "-"} </td>
                    </tr>
                    <tr>
                      <td>Currency Name</td>
                      <td>{userData?.cur_name || "-"} </td>
                    </tr>
                    <tr>
                      <td>Currency Symbol</td>
                      <td>{userData?.cur_symbol || "-"} </td>
                    </tr>
                    <tr>
                      <td> KYC </td>
                      <td className={userData?.is_kyc === false ? "text-primary" : "text-success"}>{userData?.is_kyc ? "Verified" : "Not Verified"} </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col className="border border-primary rounded p-4">
                <h5>Wallet/Account Address</h5>
                {userData?.wallet && (
                  <div className="text-center">
                    <QRCode value={userData?.wallet} className="my-2" />
                    <p className="my-2">{userData?.wallet} <span className="text-primary cursor-pointer" onClick={() => navigator.clipboard.writeText(userData?.wallet)}><i className="fa fa-copy ms-1"></i></span></p>
                    <p className="text-success d-flex justify-content-center align-items-center fs-6">Account Balance: <span className="fs-5 ps-1">{userData?.balance || 0}</span></p>

                  </div>
                )}
              </Col>
            </Row>

            {
              // true &&
              !togglePopup &&
              <Wrapper>
                <Popup
                  heading="KYC Form"
                  close={handlePopupClose}
                  className="px860"
                  body={
                    <KycFields
                      handleInputChange={handleInputChange}
                      kycData={kycData}
                      handleSubmit={handleSubmit}
                    />
                  }
                />
              </Wrapper>
            }

            {/* <Row className="gap-3 my-3">
            <Col className="border border-primary  rounded p-4">
              <h5>QR Code </h5>
            </Col>
            <Col className="border border-primary rounded p-4">
              <h5>Wallet Balance</h5>{" "}
            </Col>
          </Row> */}
          </div>
        </div>
      </div>
    </>
  );
};

const Wrapper = styled.div`
margin: 30px 0px;
display: flex;
justify-content: center;
overflow-x: hidden;

.formIncidents {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #fff;

  :last-child:nth-child(-1) {
      background: yellow;
  }
  .mainContainer {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
          width: 100%;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 18px;
          color: #000000;
          margin-top: 6px;
          width: 84%;
      }
      
  }
}
`;


export default Dashboard;
