// import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Loader from "./shade/Loaders/Loaders"
import Loader from "../../shade/Loaders/Loaders"

import { useDispatch } from "react-redux";
import {
  loginrequest,
  registerUserAction,
  getUserProfileAction,
  getUserProfile,
  loginSagaAction,
  UserProfilereq,
} from "../../Store/SagaActions/LoginSagaAction";
import toast from "react-hot-toast";

import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

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

export default Dashboard;
