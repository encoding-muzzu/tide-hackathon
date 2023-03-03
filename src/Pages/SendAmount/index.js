import React from "react";
import {
  Col,
  Row,
} from "react-bootstrap";
import DataTable from "react-data-table-component";

const SendAmount = () => {

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


  return (
    <>
      <div className="wrap" style={{ marginLeft: "-16px" }}>
        <Row>
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

export default SendAmount;


/* 
  input disabled from address
  input (min 42) / camera ==> to address 
  amount to send
  descriptoin
  available balance  with minus amount sends
*/