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

    const payloadUser = {
      callback: userProfileData,
    };
    // if (accid) {
    //   dispatch(GetTodayVcipDashboardCountActionReq(payload));
    // }

    dispatch(UserProfilereq(payloadUser));
  }, []);
  const datahandler = (data) => {};

  const userProfileData = (data) => {
    if (data.respcode == "200" && data.accid) {
      const date = new Date();
      const payload = {
        accid: data.accid,
        fdate: moment(date).format("YYYY-MM-DD"),
        tdate: moment(date).format("YYYY-MM-DD"),
        callback: TodayVcipDashboardCount,
      };
      dispatch(GetTodayVcipDashboardCountActionReq(payload));

      intervelcheck = setInterval(() => {
        dispatch(GetTodayVcipDashboardCountActionReq(payload));
      }, 30000);
    } else {
      setLoad(true);
      TodayVcipDashboardCount({"respmsg":"User profile data not found"});
    }
  };

  
  useEffect(() => {
      return () => clearInterval(intervelcheck);
  }, []);

  const handleAPIClick = () => {
    setLoad(true);
    clearInterval(intervelcheck)

    var formatDate1 = moment(dateRange1[0]).format("YYYY-MM-DD");
    var formatDate2 = moment(dateRange1[1]).format("YYYY-MM-DD");
    const payload = {
      accid: accid,
      fdate: formatDate1,
      tdate: formatDate2,
      callback: TodayVcipDashboardCount,
    };
    dispatch(GetTodayVcipDashboardCountActionReq(payload));
  };

  const TodayVcipDashboardCount = (data) => {
    if (data.respcode == "407") {
      toast.error(data.respdesc);
      setLoad(false);
      return;
    }
    if (data.respcode == "500") {
      toast.error("Please select valid date range");
      setLoad(false);
      return;
    }
    if (data.respcode == "406") {
      toast.error("No Data Found");
      setLoad(false);

      return;
    }
    if(data.respmsg){
      toast.error(data.respmsg);
      setLoad(false);

      return;
    }
    setTodayVcipData(data?.data);
    setLoad(false);
  };

  return (
    <>
      <div className="wrap" style={{ marginLeft: "-16px " }}>
        <div className="example" style={{ border: "none" }}>
          <h3 className="text-primary mb-3">Welcome to VCIP ID Dashboard</h3>
          <div className="mb-5 d-flex " style={{ width: "40%" }}>
            <InputGroup className="input-group  date-pic">
              <InputGroup.Text className="input-group-text">
                <i
                  className="typcn typcn-calendar-outline tx-24 lh--9 op-6"
                  onClick={() => setCalendarIsOpen(!calendarIsOpen)}
                ></i>
              </InputGroup.Text>

              <ReactDatePicker
                className="form-control d-flex"
                placeholderText={
                  moment(new Date()).format("DD/MM/YYYY") +
                  " - " +
                  moment(new Date()).format("DD/MM/YYYY")
                }
                selectsRange={true}
                startDate={startDate1}
                endDate={endDate1}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                onChange={(update) => {
                  setDateRange1(update);
                }}
                isClearable={true}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={15}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />

              <InputGroup.Text
                onClick={handleAPIClick}
                style={{ backgroundColor: "white", color: "#ff6a61" }}
              >
                <i className="si si-arrow-right-circle"></i>
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </div>

      {todayVcipData?.length > 0
        ? todayVcipData?.map((data) => {
            return (
              <>
                {load && <Loader />}
                <div className="breadcrumb-header justify-content-between"></div>
                {!load && (
                  <ReportCards
                    agent_approved={data.agent_approved}
                    agent_descripency={data.agent_descripency}
                    auditor_approved={data.auditor_approved}
                    agent_rejected={data.agent_rejected}
                    auditor_rejected={data.auditor_rejected}
                    total_vcips_creations={data.total_vcips_creations}
                    in_progress={data.in_progress}
                    auditor_pending={data.auditor_pending}
                  />
                )}
              </>

              // <ReportCards

              //   agent_approved={data.agent_approved}
              //   agent_descripency={data.agent_descripency}
              //   auditor_approved={data.auditor_approved}
              //   agent_rejected={data.agent_rejected}
              //   auditor_rejected={data.auditor_rejected}
              //   total_vcips_creations={data.total_vcips_creations}
              //   in_progress={data.in_progress}
              //   auditor_pending={data.auditor_pending}

              // />
            );
          })
        : null}
    </>
  );
};

export default Dashboard;
