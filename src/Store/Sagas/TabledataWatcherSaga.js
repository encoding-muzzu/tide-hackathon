import moment from "moment/moment";
// import { takeEvery } from "redux-saga-effects";
import { put, takeLatest, call, retry, takeEvery } from "redux-saga/effects";
import Axios from "../../services/axios";
import * as SagaActionTypes from "../SagaActions/SagaActionTypes";
import { postAPI } from "./ApiMethods";

// const tabledata = (payloadData) => {

//   var data = {
//     "accid": payloadData.accid,
//     "fdate": payloadData.fdate,
//     "tdate": payloadData.tdate
//   };


//   const URL = "GetVcipDashboardDetails";
//   return Axios.post(URL, data).then((res) => res?.data);
// };

function* gettabledataSaga(action) {
  var data = {
    "accid": action?.payload?.accid,
    "fdate": action?.payload?.fdate,
    "tdate": action?.payload?.tdate
  };
  try {
    const resp = yield call(postAPI, 'GetVcipDashboardDetails', data);

    // console.log(resp, 'ares')
    action?.payload?.callback(resp);
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}

// const GetTodayVcipDashboardCountReq = () => {
//   const date = new Date();

//   const data = {
//     "accid": "0",
//     "fdate": moment(date).format("YYYY-MM-DD"),
//     "tdate": moment(date).format("YYYY-MM-DD")
//   }

//   const URL = "GetTodayVcipDashboardCount";
//   return Axios.post(URL, data).then((res) => res?.data);
// };

function* GetTodayVcipDashboardCountSaga(action) {
  const date = new Date();

  const data = {
    "accid": action?.payload?.accid,
    "fdate": action?.payload?.fdate,
    "tdate": action?.payload?.tdate
  }
  try {
    const resp = yield call(postAPI, 'GetTodayVcipDashboardCount', data);

    action?.payload?.callback(resp);
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}




// const GetCustomerReportTxnDataActionReq = (payloadData) => {

//   const data = {
//     "accid": action?.payload.accid,
//     "fdate": action?.payload.fdate,
//     "tdate": action?.payload.tdate
//   }

//   const URL = "GetCustomerTxnData";
//   return Axios.post(URL, data).then((res) => res?.data);
// };

function* GetCustomerTxnSaga(action) {

  const data = {
    "accid": action?.payload.accid,
    "fdate": action?.payload.fdate,
    "tdate": action?.payload.tdate,
    "type": action?.payload.type
  }
  try {
    const resp = yield call(postAPI, "GetCustomerTxnData", data);

    action?.payload?.callback(resp);
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}



// const GetWebhookDetailsActionReq = () => {
//   // console.log(payloadData,"watcher api call")

//   // const data = {
//   //   "vcipkey":payloadData?.vcipkey
//   // }

//   const data  = {
//     "vcipkey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIyMjkzfDI5M3wxM3xFQlROVC1KUkZISy1MSUVVTC1FQlROVHwxfDIiLCJuYmYiOjE2NjE4NTQyOTksImV4cCI6MTc0ODE2Nzg5OSwiaWF0IjoxNjYxODU0Mjk5fQ.2yoKUv4Ab5VLFL0Wqktg1QRalrXcpx77i1VzPJpo8nI"
//   }

//   const URL = "GetVcipWebhookDetails";
//   return Axios.post(URL, data).then((res) => res?.data);
// };

function* GetWebhookDetailsActionSaga(action) {
  //  console.log(action.payload?.vcipkey,"actionnnn")
  const data = {
    "vcipkey": action.payload?.vcipkey
  }

  // const data = {
  //   "vcipkey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIyMjkzfDI5M3wxM3xFQlROVC1KUkZISy1MSUVVTC1FQlROVHwxfDIiLCJuYmYiOjE2NjE4NTQyOTksImV4cCI6MTc0ODE2Nzg5OSwiaWF0IjoxNjYxODU0Mjk5fQ.2yoKUv4Ab5VLFL0Wqktg1QRalrXcpx77i1VzPJpo8nI"
  // }

  try {
    const resp = yield call(postAPI, "GetVcipWebhookDetails", data);
    // console.log(resp, 'resp wtac')
    action?.payload?.callback(resp);
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}




export default function* TabledataWatcherSaga() {
  yield takeLatest(SagaActionTypes.WEBHOOKDETAILSREQUEST, GetWebhookDetailsActionSaga);
  yield takeLatest(SagaActionTypes.TABLEDATAREQUEST, gettabledataSaga);
  yield takeLatest(SagaActionTypes.DASHBOARDCOUNTREQUEST, GetTodayVcipDashboardCountSaga);
  yield takeLatest(SagaActionTypes.CUSTOMERREPORTREQUEST, GetCustomerTxnSaga);


}
