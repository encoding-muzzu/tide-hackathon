import React, { useEffect, useState, useRef } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  InputGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import Select, { components } from "react-select";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import moment from "moment";
import Tooltip from "rc-tooltip";
import * as  FileSaver from "file-saver";
import * as XLSX from "xlsx"

import "rc-tooltip/assets/bootstrap.css";

import { useNavigate } from "react-router-dom";
import ReportTable from "../../components/Pages/Authentication/ReportTable";
import { useDispatch } from "react-redux";
import {
  GetVcipWebhookDetailsActionreqpayload,
  tabledatarequest,
} from "../../Store/SagaActions/TableSagaAction";
import WebhookModal from "../../components/WebhookModal";
import Loader from "../../shade/Loaders/Loaders";
import ReactDatePicker from "react-datepicker";
import { toast } from "react-hot-toast";
import { UserProfilereq } from "../../Store/SagaActions/LoginSagaAction";
var intervelcheck


const LiveTxn = () => {
  const [selectedOption, setselectedOption] = useState(0);
  const [selectedDate, setSelectedDate] = useState("1");
  const [dateRange1, setDateRange1] = useState([null, null]);
  const [startDate1, endDate1] = dateRange1;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [data, setdisplayData] = useState([]);
  const [columndata, setcdisplayData] = useState([]);
  const [selecttag, setSelectTag] = useState([])
  const [State, setState] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true)
  const [showDropdownOptions, toggleShowDropdownOptions] = useState(false)
  let navigate = useNavigate();
  const accid = sessionStorage.getItem("accid");

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333",
      };
    },
    control: base => ({
      ...base,
      height: 40,
      maxHeight: 40,
      width: 200,
      maxWidth: 200,
      border: "1px solid #ededf5 !important",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #ff6a61 !important"
      }
      // overflow: 'scroll',
    })
  };

  const colourStyles1 = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333",
      };
    },
    control: base => ({
      ...base,
      width: 250,
      maxWidth: 250,
      border: "1px solid #ededf5 !important",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #ff6a61 !important"
      }
    })
  };

  const dropdownRef = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        !showDropdownOptions &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        toggleShowDropdownOptions(false);
      }
      else {
        toggleShowDropdownOptions(true)
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  let eventGuid = 0;
  function createEventId() {
    return String(eventGuid++);
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };
  const handleEvents = (events) => { };

  const handleDateSelect = (selectInfo) => {
    setSelectedDate("1");
  };

  const handleBySelectedDate = (e) => {
    setSelectedDate(e.value);
  };

  const barClicked = (e) => {
    setSelectedDate("1");
  };

  const tilesClicked = () => {
    let path = ``;
    navigate(path + "/reports");
  };

  var columns;
  var tabledata;
  const datahandler = (data) => {

    if (data.respcode == '407') {
      toast.error(data.respdesc)
      setLoad(false)
      return
    }
    if (data.respcode == '500') {
      toast.error(data.respdesc)
      setLoad(false)
      return
    }

    if (data.respcode == '500'  && !startDate1 && !endDate1) {
      toast.error("Please select valid date range")
      setLoad(false)
      return
    }
  
    columns = Object.keys(data?.vcipdata[0]).map((el, idx) => {
      let key = el;
      return {
        Header: el,
        accessor: el,
        className: "text-center ",
        label: el,
        value: el
      };
    });
    columns.push({
      Header: " WebhookAction",
      accessor: "WebhookAction",
      className: "text-center ",
      label: "WebhookAction",
      value: "WebhookAction"
    });
    // const fil = columns.filter((item) => item.Header !== "vcipkey");
    let vciparray = [];
    tabledata = data?.vcipdata.map((ele, index) => {
      vciparray.push(ele.vcipkey);
      return {
        agentremarks: ele.agentremarks || "NA",
        agentstatus: ele.agentstatus || "NA",
        auditorremarks: ele.auditorremarks || "NA",
        auditorstatus: ele.auditorstatus || "NA",
        iswalletfinished: ele.iswalletfinished || "NA",
        mobile: ele.mobile || "NA",
        name: ele.name || "NA",
        vcipid: ele.vcipid || "NA",
        vcipkey: ele.vcipkey || "NA",
        finalvcipstatus: ele.finalvcipstatus || "NA",
        WebhookAction: createbuttonFunctions(ele.vcipkey),
      };
    });
    setdisplayData(tabledata);
    // setcdisplayData(columns);


    let columnslq = columns.filter(column => column.Header != "agentstatus" && column.Header != "agentremarks")
    let columnstc = columns
    setcdisplayData([columns[0], columns[2], columns[5], columns[7], columns[columns.length - 1]])

    setSelectTag(process.env.REACT_APP_ISSURENAME == "livquik" ? columnslq : columnstc)
    setLoad(false);
  };

  const webHookHandler = (e) => {
    if (e.respdesc == "No User's Found") {
      console.log("No User's Found")
    }
    setModalData(e?.vcipwebhookdetails);

  };

  const handleTooltipClick = (e) => {
    const authkey = JSON.parse(sessionStorage.getItem("authkey"));
    setState(true);

    const payload = {
      vcipkey: e,
      callback: webHookHandler,

    };


    dispatch(
      GetVcipWebhookDetailsActionreqpayload(payload)
    );
  };
  const createbuttonFunctions = (ele) => {
    return (
      <>
        <Tooltip overlay="Track Webhook Status" placement="right">

          <i className="fe fe-alert-circle" onClick={() => handleTooltipClick(ele)}></i>
        </Tooltip>
      </>
    );
  };



  useEffect(() => {
    const authkey = JSON.parse(sessionStorage.getItem("authkey"));

    const date = new Date();
    // setDateRange1([date, date]);
    const payload = {
      accid: accid,
      fdate: moment(date).format("YYYY-MM-DD"),
      tdate: moment(date).format("YYYY-MM-DD"),
      callback: datahandler,
    };

   

    if (accid) {
      dispatch(tabledatarequest(payload));
    }else{
      clearInterval(intervelcheck)

      toast.error("User profile data not found")
      return
    }
  }, []);

  useEffect(() => {
    const date = new Date();

    const payload = {
      accid: accid,
      fdate: moment(date).format("YYYY-MM-DD"),
      tdate: moment(date).format("YYYY-MM-DD"),
      callback: datahandler,
    };

    intervelcheck = setInterval(() => {
      dispatch(tabledatarequest(payload))
    }, 30000);

    return () => clearInterval(intervelcheck);
  }, []);

  const options = [{ value: "0", label: "acc-1" }];

  const handleAPIClick = () => {
    setLoad(true)
    clearInterval(intervelcheck);
    var formatDate1 = moment(dateRange1[0]).format("YYYY-MM-DD");
    var formatDate2 = moment(dateRange1[1]).format("YYYY-MM-DD");
    const payload = {
      accid: accid,
      fdate: formatDate1,
      tdate: formatDate2,
      callback: datahandler,
    };
    dispatch(tabledatarequest(payload));
  };
  const handleAccountChange = (e) => {
    setselectedOption(e.value);
  };
  const handelMultiselectChange = (e) => {
    setcdisplayData(e)
    if (e.length == 0) {
      setcdisplayData(selecttag)
    }
  }

  const customStyles = {
    control: base => ({
      ...base,
      height: 60,
      maxHeight: 60,
      width: 250,
      maxWidth: 250,
      overflow: 'scroll',
    })
  };
  const exportToCSV = (tabledata) => {
    let datatobeinsertd = tabledata.map((ele, idx) => {
      return ele
    })
    var Heading = Object.keys(tabledata[0])
    let heading1 = []
    heading1.push(Heading)
    let colwidth = 35
    const ws = XLSX.utils.book_new();
    let arr = []
    Heading.map((ele, i) => {
      arr.push({ width: 35 })
    })
    ws['!cols'] = arr; //set col. widths
    XLSX.utils.sheet_add_aoa(ws, heading1);
    var wf = XLSX.utils.sheet_add_json(ws, datatobeinsertd, { origin: 'A2', skipHeader: true });
    XLSX.utils.json_to_sheet(datatobeinsertd);
    const wb = { Sheets: { data: wf }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
    const data = new Blob([excelBuffer], { type: "xlsx" });
    // FileSaver.saveAs(data, "Live VCIP ID Txn" + ".xlsx");
    const timeStamp = new Date();
    const new_timeStamp = moment(timeStamp).format("DD-MM-YYYY")
    FileSaver.saveAs(data, new_timeStamp + "," + timeStamp.toString().slice(16, 21) + "," + "Live VCIP ID Txn" + ".xlsx");
  }


  const ValueContainer = ({ children, ...props }) => {
    let [values, inputs] = children

    if (Array.isArray(values)) {
      const plural = values.length === 1 ? "" : "s";
      values = `${values.length} item${plural} selected`;
    }

    return (
      <components.ValueContainer {...props}>
        {values}
        {inputs}
      </components.ValueContainer>
    );
  }

  const Option = (props) => {
    return (

      <div>

        <components.Option{...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />
          <label style={{ "marginLeft": '10px' }}>{props.label}</label>
        </components.Option>
      </div>
    );
  }
  return (
    <div>
      <div >
        <WebhookModal
          state={State}
          setState={setState}
          modalData1={modalData}
        />
      </div>
      {load && <Loader />}
      <Row>
        <div className="d-flex justify-content-between" style={{ width: '97%' }}>

          <div className="mb-4 " style={{ width: '40%', marginLeft: '27px' }}>
            <InputGroup className="input-group  date-pic mt-4">
              <InputGroup.Text className="input-group-text">
                <i className="typcn typcn-calendar-outline tx-24 lh--9 op-6"></i>
              </InputGroup.Text>
              <ReactDatePicker
                className="form-control d-flex"
                placeholderText={moment(new Date()).format("DD/MM/YYYY") + " - " + moment(new Date()).format("DD/MM/YYYY")}
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
              <InputGroup.Text onClick={handleAPIClick} style={{ backgroundColor: 'white', color: '#ff6a61' }}>
                <i className="si si-arrow-right-circle"></i>
              </InputGroup.Text>
            </InputGroup>
          </div>

          {/* <div className="mb-4 ">
            <InputGroup className="input-group  date-pic mt-4">
              <Select
                options={options}
                placeholder="Select Account"
                value={selectedOption}
                onChange={handleAccountChange}
                styles={colourStyles}
              />
            </InputGroup>
          </div> */}

          {/* <div className="mb-4 ">
            <InputGroup className="input-group  date-pic mt-4">
              <Button
                variant=""
                className="btn me-2 btn-primary"
                onClick={handleAPIClick}

              >
                {" "}
                Submit
              </Button>
            </InputGroup>
          </div> */}
          {/* 
          <div className="mb-4 ">
            <InputGroup className="input-group  date-pic mt-4">
            </InputGroup>
          </div> */}

          <div className="mb-4 " ref={dropdownRef}>
            <InputGroup className="input-group  date-pic mt-4"
            >
              {/* <button onClick={() => exportToCSV(data)} className="download-table-xls-button btn me-2 btn-primary h-excel-btn btn-sm mx-4">Export</button> */}
              <Select options={selecttag}
                placeholder='Add more columns'
                isMulti
                closeMenuOnSelect={false}
                menuIsOpen={showDropdownOptions}
                hideSelectedOptions={false}
                allowSelectAll={true}
                onChange={handelMultiselectChange}
                styles={colourStyles1}
                isSearchable={true}
                components={{ ValueContainer, Option }}

              />
            </InputGroup>
          </div>

        </div>

        <div className="breadcrumb-header justify-content-between"></div>
        {!load && <ReportTable columns={columndata} data={data} exportToCSV={exportToCSV} />}
      </Row>
    </div>
  );
};

export default LiveTxn;
