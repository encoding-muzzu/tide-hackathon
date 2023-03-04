import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Popup from "../../services/popup";
import InputFields from "./InputFields";
import {
  getUserProfile,
  getUserProfileAction,
  transactionsAction,
  transferAction,
} from "../../Store/SagaActions/LoginSagaAction";
import toast from "react-hot-toast";

import { useNavigate } from "react-router";
import Loader from "../../shade/Loaders/Loaders";
// import "SendAmount/sendAmount.css";
import "./sendAmount.css";

const SendAmount = () => {
  const dispatch = useDispatch();
  const [togglePopup, setTogglePopup] = useState(false);
  const [getSendAmount, setSendAmount] = useState({});
  const [transHistoryList, setTransHistoryList] = useState([]);
  const [load, setLoad] = useState(false);
  const { userData } = useSelector((store) => store.HomeReducer);

  const navigate = useNavigate();
  useEffect(() => {
    setLoad(true);
    transactions();
    dispatch(getUserProfileAction({ callback: useProfileResponseData }));
  }, [dispatch]);

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
      dispatch(getUserProfile(data?.data?.data));
    }
    setLoad(false);
  };

  const transactions = () => {
    dispatch(transactionsAction({ callback: respData }));
  };

  const respData = (data) => {
    setLoad(false);
    setTransHistoryList(data?.data);
  };
  const columnsIncidents = [
    {
      name: "Create At",
      selector: (row) => row["created_at"],
      sortable: true,
    },

    {
      name: "To Addr",
      selector: (row) => row["to_addr"],
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row["amount"],
      sortable: true,
      conditionalFormatting: (val) => {
        return val ? { background: "blue" } : null;
      },
    },
    {
      name: "Txn Hash",
      selector: (row) => row["txnhash"],
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row["status"],
      sortable: true,
    },

    {
      name: "Type",
      selector: (row) => row["type"],
      sortable: true,
      wrap: true,
    },
  ];

  const handlePopupClose = () => {
    setTogglePopup(!togglePopup);
    setSendAmount({});
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSendAmount((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let model = {
      to_addr: getSendAmount?.toAddress,
      amount: getSendAmount?.amount,
      description: "adfs",
    };
    dispatch(transferAction({ model, callback: respTransferData }));
    setLoad(true);
  };
  const respTransferData = (data) => {
    setLoad(false);
    console.log("data tf", data.data.status, data.data);
    if (data?.data?.status === 200) {
      transactions();
      toast.success(data?.data?.data?.txn_hash, {
        duration: 10000, // 10 seconds,
        style: {
          width: "590px",
          maxWidth: "1000px",
        },
      });
      handlePopupClose();
    } else {
      toast.error(data?.data?.message);
    }
  };

  return (
    <>
      {load && <Loader />}

      <div className="wrap" style={{ marginLeft: "-16px" }}>
        {userData?.is_kyc ? (
          <>
            <Row className="m-3">
              <Col className="d-flex justify-content-between">
                <h4>Send Amount</h4>
                <Button
                  variant=""
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    setTogglePopup(!togglePopup);
                  }}
                >
                  Send Amount
                </Button>
                {togglePopup && (
                  <Wrapper>
                    <Popup
                      heading="Transfer"
                      close={handlePopupClose}
                      className="px860"
                      body={
                        <InputFields
                          handleInputChange={handleInputChange}
                          getSendAmount={getSendAmount}
                          handleSubmit={handleSubmit}
                          btnName={"Submit"}
                          transHistoryList={transHistoryList}
                          userData={userData}
                          load={load}
                        />
                      }
                    />
                  </Wrapper>
                )}
              </Col>
            </Row>
            <Row className="mx-3 shadow p-0">
              <Col className="m-0">
                <DataTable
                  columns={columnsIncidents}
                  data={transHistoryList}
                  pagination
                />
              </Col>
            </Row>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="mt-5">
            <p className="text-primary fs-5 mb-2" >
              <span className="fa fa-exclamation-circle me-2"></span>KYC not verified
            </p>
            <p className="fs-6 text-center cursor-pointer" role="button">Please verify KYC</p>
            </div>
          </div>
        )}
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

export default SendAmount;

/* 
  input disabled from address
  input (min 42) / camera ==> to address 
  amount to send
  descriptoin
  available balance  with minus amount sends
*/
