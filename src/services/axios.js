import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
});


instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["apikey"] =
  "0";

instance.interceptors.request.use(
  (request) => {
    const authkey = sessionStorage.getItem("authkey");
    if (authkey != undefined) {
      let data = JSON.parse(authkey);
      const authToken = data?.authkey || null;
      request.headers["authkey"] = authToken;
    } else {
      console.log("sadf");
    }

    return request;
  },

  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(

  (response) => {
    if(response.data.respdesc=="Session Expired"){
      // console.log("Session Expired");
      window.location.href = "/"
      
    } 
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
