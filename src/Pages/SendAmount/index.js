import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
} from "react-bootstrap";
import DataTable from "react-data-table-component";

import { useDispatch } from "react-redux";
import styled from "styled-components";
import Popup from '../../services/popup';
import InputFields from './InputFields';
import { transactionsAction, transferAction } from '../../Store/SagaActions/LoginSagaAction';
import { toast } from "react-toastify";

const SendAmount = () => {
  const dispatch = useDispatch();
  const [togglePopup, setTogglePopup] = useState(false);
  const [getSendAmount, setSendAmount] = useState({});
  const [transHistoryList, setTransHistoryList] = useState([])


  useEffect(() => {
    dispatch(transactionsAction({ callback: respData }))
  }, [dispatch])

  const respData = (data) => {
    // console.log('data', data)
    //       "from_addr": "0x14BaEb5a68d75220fE5773B05B64982f7A24e0e3",
    // {
    //   "data": [
    //     {
    //       "created_at": "Sat, 04 Mar 2023 00:01:39 GMT",
    //       "from_email": "afaaq@gmail.com",
    //       "to_addr": "0x2b7d884C1ABe5B4C8a30AD4dB4e9d17645F77C12",
    //       "amount": "1",
    //       "description": "adfs",
    //       "txnhash": "0xfe0f1772787f86f2f8f6cf2359477c0a48e41502539c90c8c910d619581f3312",
    //       "status": "success",
    //       "type": "Debit"
    //     }
    //   ],
    //   "message": "success",
    //   "status": 200
    // }



    setTransHistoryList(data?.data)

  };
  const columnsIncidents = [
    {
      name: "Create At",
      selector: (row) => row['created_at'],
      sortable: true,
    },

    {
      name: "To Addr",
      selector: (row) => row['to_addr'],
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row['amount'],
      sortable: true,
      conditionalFormatting: (val) => {
        return val ? { background: 'blue' } : null
      }
    },
    {
      name: "Txn Hash",
      selector: (row) => row['txnhash'],
      sortable: true,
    },



    {
      name: "Status",
      selector: (row) => row['status'],
      sortable: true,
    },

    {
      name: "Type",
      selector: (row) => row["type"],
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Actions",
    //   selector: (row) => (
    //     <div className="flex-child">
    //       {/* <FontAwesomeIcon icon="fa-solid fa-trash" />
    //             <FontAwesomeIcon icon="fa-duotone fa-pen-to-square" /> */}

    //       {/* <FontAwesomeIcon icon={faPenToSquare} onClick={(e) => {}} /> */}
    //     </div>
    //   )
    // }
  ];

  const handlePopupClose = () => {
    setTogglePopup(!togglePopup);
    setSendAmount({})
  };


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSendAmount(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let model = {
      to_addr: getSendAmount?.toAddress,
      amount: getSendAmount?.amount,
      description: "adfs"
    }
    dispatch(transferAction({ model, callback: respTransferData }))


  };
  const respTransferData = (data) => {
    //   {
    //     "data": {
    //         "txn_hash": "0xfe0f1772787f86f2f8f6cf2359477c0a48e41502539c90c8c910d619581f3312"
    //     },
    //     "message": "success",
    //     "status": 200
    // }
    if (data?.data?.status === 200) {
      toast.success(data?.data?.message)
      handlePopupClose();
    } else {
      toast.error(data?.data?.message)
    }
  };


  return (
    <>
      <div className="wrap" style={{ marginLeft: "-16px" }}>
        <Row className="m-3">
          <Col className="d-flex justify-content-between">
            <h4>Heading</h4>
            <Button
              variant=""
              type='submit'
              className="btn btn-primary"
              onClick={() => {
                setTogglePopup(!togglePopup)
              }}>
              Send Amount
            </Button>
            {
              togglePopup &&
              <Wrapper>
                <Popup
                  heading="Transfer"
                  close={handlePopupClose}
                  className="px860"
                  body={
                    <InputFields
                      fromAddress={"wallet"}
                      handleInputChange={handleInputChange}
                      getSendAmount={getSendAmount}
                      handleSubmit={handleSubmit}
                      btnName={"Submit"}
                      transHistoryList={transHistoryList}
                    />
                  }
                />
              </Wrapper>
            }
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

