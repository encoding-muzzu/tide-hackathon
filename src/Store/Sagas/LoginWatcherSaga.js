import { put, takeLatest, call, retry, takeEvery } from "redux-saga/effects";
import Axios from "../../services/axios";
import * as SagaActionTypes from "../SagaActions/SagaActionTypes";
import { toast } from "react-toastify";
import { getAPI, postAPI } from "./ApiMethods";

// const logindata = (payload) => {

//   const data = {
//     username: payload?.username,
//     password: payload?.password,
//     rid: 5,
//     rolename: "User",
//     authflag: 1
//   }
// if(sessionStorage.getItem("account")==0){
//   const URL = "https://vcipapi.syntizen.com/uatv2/api/vkyc/UserAuthentication";
// return Axios.post(URL, data).then((res) => res?.data);

// }else{
//   const URL = "https://api.getkyc.com/api/vkyc/UserAuthentication";
//   return Axios.post(URL, data).then((res) => res?.data);
// }

// var config = {
//   method: 'post',
//   url: 'https://vcipapi.syntizen.com/v2/api/vkyc/UserAuthentication',
//   headers: {
//     'Content-Type': 'application/json',
//     'apikey': '0'
//   },
//   data : data
// };
// return axios(config)
//   .then(response => {
//     return response?.data;
//   })
// };

function* getloginSaga(action) {
  const data = {
    username: action?.payload?.username,
    password: action?.payload?.password,
    rid: 5,
    rolename: "User",
    authflag: 1,
  };
  try {
    const resp = yield call(postAPI, "UserAuthentication", data);
    toast.info(JSON.stringify(resp.desc));
    sessionStorage.setItem("authkey", JSON.stringify(resp));
    action?.payload?.callback(resp);

    const authToken = resp?.authkey;
    // console.log(authToken , "Login Auth responce")
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}

function* getprofileSaga(action) {
  try {
    const resp = yield call(postAPI, "UserProfile");
    toast.info(JSON.stringify(resp.desc));
    action?.payload?.callback(resp);
    sessionStorage.setItem("accid", resp?.accid);
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}

export default function* LoginWatcherSaga() {
  yield takeEvery(SagaActionTypes.LOGINREQUEST, getloginSaga);
  yield takeEvery(SagaActionTypes.USERPROFILEREQ, getprofileSaga);
}
