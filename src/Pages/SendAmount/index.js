import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Table from 'react-bootstrap/Table';

import { useDispatch } from "react-redux";
import styled from "styled-components";
import Popup from '../../services/popup';
import InputFields from './InputFields';
import {transactionsAction} from '../../Store/SagaActions/LoginSagaAction';

const SendAmount = () => {
  const dispatch = useDispatch();
  const [togglePopup, setTogglePopup] = useState(false);
  const [getSendAmount, setSendAmount] = useState({});
  const [transHistoryList, setTransHistoryList] = useState([
    {
        "amount": "200",
        "description": "adfs",
        "from_addr": "0x300Da92b0Fe881eDc23d91F666505faBe392d183",
        "from_email": "muzammil1@syntizen.com",
        "status": "failed",
        "to_addr": "0x4DBA707d5a84d9861804D79AF25aA9dC9A223086",
        "txnhash": "NA",
        "type": "Debit"
    },
    {
        "amount": "500",
        "description": "adfs",
        "from_addr": "0x300Da92b0Fe881eDc23d91F666505faBe392d183",
        "from_email": "muzammil1@syntizen.com",
        "status": "failed",
        "to_addr": "0x4DBA707d5a84d9861804D79AF25aA9dC9A223086",
        "txnhash": "NA",
        "type": "Debit"
    },
    {
        "amount": "400",
        "description": "adfs",
        "from_addr": "0x300Da92b0Fe881eDc23d91F666505faBe392d183",
        "from_email": "muzammil1@syntizen.com",
        "status": "failed",
        "to_addr": "0x4DBA707d5a84d9861804D79AF25aA9dC9A223086",
        "txnhash": "NA",
        "type": "Debit"
    },
])

useEffect(() => {
  dispatch(transactionsAction({callback: respData}))
}, [dispatch])


  const columnsIncidents = [

    {
        name: "SID",
        selector: (row) => row['siid'],
        sortable: true,
    },
    {
        name: "Reason",
        selector: (row) => row["reason"],
        sortable: true,
        wrap: true,
    },
    {
        name: "Date Created",
        selector: (row) => row["datecreated"],
        sortable: true,
        wrap: true,
    },
    {
        name: "Actions",
        selector: (row) => (
            <div className="flex-child">
                {/* <FontAwesomeIcon icon="fa-solid fa-trash" />
                <FontAwesomeIcon icon="fa-duotone fa-pen-to-square" /> */}

                {/* <FontAwesomeIcon icon={faPenToSquare} onClick={(e) => {}} /> */}
            </div>
        )
    }
];

const handlePopupClose = () => { 
  setTogglePopup(!togglePopup);
 };


 const handleInputChange = (event) => { 
    const {id, value } = event.target;
    setSendAmount(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = () => { 
   };

   const respData = (data) => { 
    console.log('data', data)
  };

  return (
    <>
      <div className="wrap" style={{ marginLeft: "-16px"}}>
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
               heading="heaing"
               close={handlePopupClose}
               className="px860"
               body={
                <InputFields
                fromAddress={"wallet"}
                handleInputChange={handleInputChange}
                getSendAmount={getSendAmount}
                handleSubmit={handleSubmit}
                btnName={"Submit"}
              />
               }
           />
              </Wrapper>
            }
          </Col>
        </Row>
        <Row className="border border-primary">
        <Col>
            <DataTable
              columns={columnsIncidents}
              data={[]}
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

