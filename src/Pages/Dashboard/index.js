import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  ProgressBar,
  Row,
  InputGroup,
} from "react-bootstrap";
// import Select from "react-select";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import { useNavigate } from "react-router-dom";
import ReportTable from "../../components/Pages/Authentication/ReportTable";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import {
  GetTodayVcipDashboardCountActionReq,
  tabledatarequest,
} from "../../Store/SagaActions/TableSagaAction";
import ReportCards from "../../components/ReportCards";
import { toast } from "react-hot-toast";
import Select, { components } from "react-select";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import Loader from "../../shade/Loaders/Loaders";
import { UserProfilereq } from "../../Store/SagaActions/LoginSagaAction";
import axios from "axios";

var intervelcheck

const Dashboard = () => {
  const [todayVcipData, setTodayVcipData] = useState([]);

  const dispatch = useDispatch();
  const [dateRange1, setDateRange1] = useState([null, null]);
  const [startDate1, endDate1] = dateRange1;
  const [selectedOption, setselectedOption] = useState(0);
  const [load, setLoad] = useState(true);
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const accid = sessionStorage.getItem("accid");

  useEffect(() => {
    // const date = new Date();
    // const payload = {
    //   accid: accid,
    //   fdate: moment(date).format("YYYY-MM-DD"),
    //   tdate: moment(date).format("YYYY-MM-DD"),
    //   callback: TodayVcipDashboardCount,
    // };

    // const payloadUser = {
    //   callback: userProfileData,
    // };
    // if (accid) {
    //   dispatch(GetTodayVcipDashboardCountActionReq(payload));
    // }

    // dispatch(UserProfilereq(payloadUser));
    getUsers();
  }, []);
  // const datahandler = (data) => {};

  const getUsers = () => {
    // axios
    //   .post("https://d33rdsqeflhtup.cloudfront.net/login",{email: 'muzammilahmed.166@gmail.com', password: 'asdf'})
    //   .then((response) => response
    //     // response.data.results.map((user) => ({
    //     //   name: `${user.name.first} ${user.name.last}`,
    //     //   username: `${user.login.username}`,
    //     //   email: `${user.email}`,
    //     //   image: `${user.picture.thumbnail}`,
    //     // }))
    //   )
    //   .then((users) => {
    //     this.setState({ users, isLoading: false });
    //   })
    //   .catch((error) => this.setState({ error, isLoading: false }));
  };

  const userProfileData = (data) => {
    // if (data.respcode == "200" && data.accid) {
      // const date = new Date();
      // const payload = {
      //   accid: data.accid,
      //   fdate: moment(date).format("YYYY-MM-DD"),
      //   tdate: moment(date).format("YYYY-MM-DD"),
      //   callback: TodayVcipDashboardCount,
      // };
      // dispatch(GetTodayVcipDashboardCountActionReq(payload));

      // intervelcheck = setInterval(() => {
      //   dispatch(GetTodayVcipDashboardCountActionReq(payload));
      // }, 30000);
    // } else {
    //   setLoad(true);
    //   TodayVcipDashboardCount({"respmsg":"User profile data not found"});
    // }
  };

  
  // useEffect(() => {
  //     return () => clearInterval(intervelcheck);
  // }, []);

  // const TodayVcipDashboardCount = (data) => {
  //   if (data.respcode == "407") {
  //     toast.error(data.respdesc);
  //     setLoad(false);
  //     return;
  //   }
  //   if (data.respcode == "500") {
  //     toast.error("Please select valid date range");
  //     setLoad(false);
  //     return;
  //   }
  //   if (data.respcode == "406") {
  //     toast.error("No Data Found");
  //     setLoad(false);

  //     return;
  //   }
  //   if(data.respmsg){
  //     toast.error(data.respmsg);
  //     setLoad(false);

  //     return;
  //   }
  //   setTodayVcipData(data?.data);
  //   setLoad(false);
  // };

  return (
    <>
      <div className="wrap" style={{ marginLeft: "-16px " }}>
        <div className="example" style={{ border: "none" }}>
        {/* <ReportTable columns={columndata} data={data} exportToCSV={exportToCSV} /> */}
          <h3 className="text-primary mb-3">Welcome To Tide Bank Dashboard</h3>
          <Row>
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
                {/* <tr>
                  <td>Balance</td>
                  <td colSpan={2}>16000</td>
                </tr>
                <tr>
                  <td>Wallet</td>
                  <td colSpan={2}>0x987sdfas9d87asdf76fgd9878asdf5sd43j2446345jlljlkgsdfasfd</td>
                </tr> */}
              </tbody>
            </Table>
            </Col>
            <Col className="border p-4">
            <h5>Wallet/Account Address</h5></Col>
          </Row>
          <Row>
            <Col className="border p-4"><h5>QR Code </h5></Col>
            <Col className="border p-4"><h5>Wallet Balance</h5> </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
