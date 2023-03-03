// import { navigate } from "@reach/router";
import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";


import {
  Col,
  Row,
} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
const Dashboard = () => {
  const navigate = useNavigate();


  useEffect(()=>{
    const isLoggedIn = sessionStorage.getItem("token");
    if(!isLoggedIn){
      navigate("/");
    }
  },[])

  return (
    <>
      <div className="wrap" style={{ marginLeft: "-16px " }}>
        <div className="example" style={{ border: "none" }}>
          <h3 className="text-primary mb-3">Welcome To Tide Bank Dashboard</h3>
          <Row className="gap-3">
            <Col className="border p-4">
              <h5>User Details</h5>
              <Table borderless hover>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>Wasim Akram</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>address asdf asdf asdf asdf </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td colSpan={2}>wasimakram@gmail..com</td>
                </tr>
              </tbody>
            </Table>
            </Col>
            <Col className="border p-4">
            <h5>Wallet/Account Address</h5></Col>
          </Row >
          <Row className="gap-3 my-3">
            <Col className="border rounded p-4"><h5>QR Code </h5></Col>
            <Col className="border rounded p-4"><h5>Wallet Balance</h5> </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
