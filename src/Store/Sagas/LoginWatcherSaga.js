import { put, takeLatest, call, retry, takeEvery } from "redux-saga/effects";
import Axios from "../../services/axios";
import * as SagaActionTypes from "../SagaActions/SagaActionTypes";
import { toast } from "react-toastify";
import axios from "axios";

import { getAPI, postAPI } from "./ApiMethods";

const baseURL = "https://d33rdsqeflhtup.cloudfront.net"

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


const getMethod = (url) => {
  return axios
    .get(`${baseURL}${url}`)
    .then((res) => {
      // console.log(res,"---------------------->")
    return res?.data;
  })
  .catch((err) => {
    console.log(err)
  return err
});
}

const postMethod = (url, body) => {

  console.log("hitting post in saga", `${baseURL}${url}`, body);

  return axios.post(`${baseURL}${url}`,body)
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unable to login");
    }
  });
  // return axios
  //   .post(`${baseURL}${url}`,body)
  //   .then((res) => {
  //     // console.log(res,"---------------------->")
  //     return res?.data;
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   return err})
    // .then((response) =>
    //   response.data.results.map((user) => ({
    //     name: `${user.name.first} ${user.name.last}`,
    //     username: `${user.login.username}`,
    //     email: `${user.email}`,
    //     image: `${user.picture.thumbnail}`,
    //   }))
    // )
    // .then((users) => {
    //   this.setState({ users, isLoading: false });
    // })
    // .catch((error) => this.setState({ error, isLoading: false }));
};

function* getloginSaga(action) {
  try {
    const resp = yield call(postMethod, "/login", action.payload.model);
    console.log("login resp", resp);
    if(resp.code === "ERR_NETWORK"){
      // toast.info(resp.message);
      // toast.error(resp.message);
      action?.payload?.callback(resp,true);
      return
    }

    if (resp && resp?.respcode === "200") {

      // toast.info(JSON.stringify(resp.desc));
      action?.payload?.callback(resp);
    }

    // sessionStorage.setItem("authkey", JSON.stringify(test));

    // const authToken = resp?.authkey;
    // console.log(authToken , "Login Auth responce")
  } catch (err) {
    action?.payload?.callback({ data: err });
  }
}

function* registerUser(action) {
  // const data = {
  //   username: action?.payload?.username,
  //   password: action?.payload?.password,
  //   rid: 5,
  //   rolename: "User",
  //   authflag: 1,
  // };

  try {
    const resp = yield call(postAPI, "/register", action.payload.model);
    console.log("regis resp", resp.code);
    if(resp.code === "ERR_NETWORK"){
      // toast.info(resp.message);
      // toast.error(resp.message);

      action?.payload?.callback(resp,true);
      return
    }
    if (resp && resp?.respcode === "200") {

      // sessionStorage.setItem("authkey", JSON.stringify(test));
      action?.payload?.callback(resp);
    }
    // toast.info(JSON.stringify(resp.desc));

    // const authToken = resp?.authkey;
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
  yield takeEvery(SagaActionTypes.REGISTER_USER, registerUser)
}
