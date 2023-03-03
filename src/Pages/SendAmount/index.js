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
var intervelcheck

const SendAmount = () => {
  const [todayVcipData, setTodayVcipData] = useState([]);

  const dispatch = useDispatch();
  const [dateRange1, setDateRange1] = useState([null, null]);
  const [startDate1, endDate1] = dateRange1;
  const [selectedOption, setselectedOption] = useState(0);
  const [load, setLoad] = useState(true);
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const accid = sessionStorage.getItem("accid");

  return (
    <>
      <div className="wrap" style={{ marginLeft: "-16px " }}>
        <div className="example" style={{ border: "none" }}>
        {/* <ReportTable columns={columndata} data={data} exportToCSV={exportToCSV} /> */}
          <h3 className="text-primary mb-3">Send Amount</h3>
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

export default SendAmount;
