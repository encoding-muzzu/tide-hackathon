
import React, { useEffect, useState, useRef } from "react";
// import { Breadcrumb, Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import Select, { components } from "react-select";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import * as  FileSaver from "file-saver";
import * as XLSX from "xlsx"

import { useNavigate } from "react-router-dom";
import ReportTable from "../../components/Pages/Authentication/ReportTable";
import { useDispatch } from "react-redux";
import { GetCustomerTxnDataActionReq, GetHeaderNameAction, tabledatarequest } from "../../Store/SagaActions/TableSagaAction";
import { GetCustomerTxnDataActionREQ } from "../../Store/SagaActions/SagaActionTypes";
import Loader from "../../shade/Loaders/Loaders";
import moment from "moment";
import { Breadcrumb, Button, Card, Col, InputGroup, ProgressBar, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { toast } from "react-hot-toast";
import { style } from "@mui/system";
import { UserProfilereq } from "../../Store/SagaActions/LoginSagaAction";
var intervelcheck

const CustomerReport = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setdisplayData] = useState([])
  const [clientOptions, setClientOptions] = useState([])
  const [clientSelected, setClientSelected] = useState(() => clientOptions[0] || null)

  const [columndata, setcdisplayData] = useState([])
  const [load, setLoad] = useState(true)
  const [selecttag, setSelectTag] = useState([])
  const [selectedOption, setselectedOption] = useState(0)
  const [dateRange1, setDateRange1] = useState([null, null]);
  const [startDate1, endDate1] = dateRange1;
  const accid = sessionStorage.getItem("accid");

  const [showDropdown, setShowDropdown] = useState(true)
  const [showDropdownOptions, toggleShowDropdownOptions] = useState(false)
  const options = [
    { value: '0', label: 'acc-1' }
  ]
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
    const authkey = JSON.parse(sessionStorage.getItem("authkey"))
    if (authkey.acccode == "LIVQUIK" && process.env.REACT_APP_ISSURENAME == "livquik" || authkey.acccode == "TRANSCORP" && process.env.REACT_APP_ISSURENAME == "transcorp") {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
    const date = new Date();

    const payload = {
      accid: accid,
      fdate: moment(date).format("YYYY-MM-DD"),
      tdate: moment(date).format("YYYY-MM-DD"),
      type: process.env.REACT_APP_ISSURENAME == "livquik" ?"3":"1",
      callback: datahandler
    }


    if (accid) {
      dispatch(GetCustomerTxnDataActionReq(payload))
    } else {
      clearInterval(intervelcheck)
      toast.error("User profile data not found")
    }

  }, [])
   

  useEffect(() => {
    const date = new Date();

    const payload = {
      accid: accid,
      fdate: moment(date).format("YYYY-MM-DD"),
      tdate: moment(date).format("YYYY-MM-DD"),
      type: process.env.REACT_APP_ISSURENAME == "livquik" ?"3":"1",
      callback: datahandler
    }

    intervelcheck = setInterval(() => {
      dispatch(GetCustomerTxnDataActionReq(payload))
    }, 30000);

    return () => clearInterval(intervelcheck);
  }, []);

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


  const datahandler = (data) => {
    // [...new Set(chars)]
    const option = data?.data?.map((i, idx) => i["Client ID"])
    const uniqoption = [...new Set(option)]
    const options = uniqoption.map((i, idx) => ({
      value: idx, label: i
    }))
    setClientOptions(options)

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

    var columns
    var tabledata

    columns = Object.keys(data?.data[0]).map((el, idx) => {
      let key = el
      return {
        Header: el,
        accessor: el,
        className: "text-center ",
        value: el,
        label: el
      }
    })
    var columnslq = columns
    var columnstc = columns


    // console.log(process.env.REACT_APP_ISSURENAME,"ISSURENAME")
    setdisplayData(data?.data)
    setcdisplayData(process.env.REACT_APP_ISSURENAME == "livquik" ? [columns[1], columns[2], columns[5], columns[14]] : [columns[1], columns[2], columns[11], columns[46], columns[53]])

    // setcdisplayData(columns)
    setSelectTag(process.env.REACT_APP_ISSURENAME == "livquik" ? columnslq : columnstc)
    setLoad(false)

  }

  const handleAPIClick = () => {
    setLoad(true)
    clearInterval(intervelcheck);
    var formatDate1 = moment(dateRange1[0]).format("YYYY-MM-DD");
    var formatDate2 = moment(dateRange1[1]).format("YYYY-MM-DD");
    const payload = {
      accid: accid,
      fdate: formatDate1,
      tdate: formatDate2,
      type: process.env.REACT_APP_ISSURENAME == "livquik" ?"3":"1",
      callback: datahandler
    }
    dispatch(GetCustomerTxnDataActionReq(payload))
  }
  const handleAccountChange = (e) => {
    // dispatch(GetHeaderNameAction(e.label))
    setClientSelected(e)
  }


  const handelMultiselectChange = (e) => {
    setcdisplayData(e)
    if (e.length == 0) {
      setcdisplayData(selecttag)
    }
  }



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
    const timeStamp = new Date();
    const new_timeStamp = moment(timeStamp).format("DD-MM-YYYY")
    FileSaver.saveAs(data, new_timeStamp + "," + timeStamp.toString().slice(16, 21) + "," + "Customer Report" + ".xlsx");

  }




  const ValueContainer = ({ children, ...props }) => {
    let [values, inputs] = children
    //  console.log(values,inputs)

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
  return (<>
    <Row>

      <div className="d-flex justify-content-between" style={{ width: '97%' }}>

        <div className="mb-4" style={{ width: '40%', marginLeft: '27px' }}>
          <InputGroup className="input-group  date-pic mt-4">
            <InputGroup.Text className="input-group-text">
              <i className="typcn typcn-calendar-outline tx-24 lh--9 op-6"></i>
            </InputGroup.Text>
            <ReactDatePicker
              className="form-control d-flex"
              placeholderText={moment(new Date()).format("DD/MM/YYYY") + " - " + moment(new Date()).format("DD/MM/YYYY")}
              selectsRange={true}
              dateFormat="dd/MM/yyyy"
              startDate={startDate1}
              endDate={endDate1}
              onChange={(update) => {
                setDateRange1(update);
              }}
              maxDate={new Date()}
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

        <div className="mb-4">
          {showDropdown && <InputGroup className="input-group  date-pic mt-4 ">
            <Select
              options={clientOptions}
              placeholder='Select Client'
              value={clientSelected}
              onChange={handleAccountChange}
              styles={colourStyles}

            />
          </InputGroup>}

        </div>


        {/* <div className="mb-4 ">
          <InputGroup className="input-group  date-pic mt-4">
            <Button variant="" className="btn me-2 btn-primary " onClick={handleAPIClick}> Submit</Button>
          </InputGroup>
        </div> */}



        <div className="mb-4 " ref={dropdownRef}>
          <InputGroup className="input-group  date-pic mt-4" >
            <Select options={selecttag}
              placeholder='Add more columns'
              isMulti
              closeMenuOnSelect={false}
              menuIsOpen={showDropdownOptions}
              hideSelectedOptions={false}
              // href="javascript:void(0)"
              allowSelectAll={true}
              onChange={handelMultiselectChange}
              styles={colourStyles1}
              isSearchable={true}
              components={{ ValueContainer, Option }}
            // components={animatedComponents}

            />
          </InputGroup>
        </div>
      </div>






      {load && <Loader />}
      <div className="breadcrumb-header justify-content-between"></div>
      {!load && <ReportTable
        columns={columndata}
        data={data}
        exportToCSV={exportToCSV}
        clientSelected={clientSelected}
      />}


    </Row>


  </>)
}

export default CustomerReport;
