import { put, takeLatest, call, retry, takeEvery } from "redux-saga/effects";
import Axios from "../../services/axios";
import * as SagaActionTypes from "../SagaActions/SagaActionTypes";
import { toast } from "react-toastify";
import axios from "axios";

import { getAPI, postAPI } from "./ApiMethods";

// "http://10.10.1.117:3000" || https://d33rdsqeflhtup.cloudfront.net || http://ec2-15-206-146-70.ap-south-1.compute.amazonaws.com || http://10.10.1.117/

// const baseURL = "http://ec2-15-206-146-70.ap-south-1.compute.amazonaws.com"
const baseURL = "http://10.10.1.117"

const getMethod = (url) => {
  return axios
    .get(`${baseURL}${url}`)
    .then((res) => {
    return res?.data;
  })
  .catch((err) => {
    console.log(err)
  return err
});
}

const postMethod = (url, body) => {

  console.log("hitting post in saga", `${baseURL}${url}`, body);
  return axios.post(`${baseURL}${url}`,body,{
    'Content-Type': "application/json"
  })
  .then((response) => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Unable to login");
    }
  });
};

function* getloginSaga(action) {
  try {
    const resp = yield call(postMethod, "/login", action.payload.model);
    // console.log("logggggggggggggggggggggggggg***************",resp);
    if(resp?.status !== 200){
      action?.payload?.callback(resp,true);
      return
    }
    if (resp && resp?.status === 200 && resp?.data?.status === 200) {
      action?.payload?.callback(resp);
    }else{
      action?.payload?.callback(resp,true);
    }
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}

function* registerUser(action) {

  try {
    const resp = yield call(postMethod, "/register", action.payload.model);
    console.log("regis resp", resp.code);
    if(resp?.status !== 200){
      action?.payload?.callback(resp,true);
      return
    }
    if (resp && resp?.status === 200 && resp?.data?.status === 200) {
      action?.payload?.callback(resp);
    }else{
      action?.payload?.callback(resp,true);
    }
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
  yield takeEvery(SagaActionTypes.REGISTER_USER, registerUser)
}
