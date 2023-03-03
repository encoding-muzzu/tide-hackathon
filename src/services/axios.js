import axios from "axios";

const instance = axios.create({
  // baseURL: "https://d33rdsqeflhtup.cloudfront.net"
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
      sessionStorage.clear();
      window.location.href = "/"
      
    } 
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

// import axios from "axios";

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL
// });

// instance.defaults.headers.common['Content-Type'] = "application/json";
// instance.defaults.headers.common['apikey'] = "0";
// instance.defaults.headers.common["authkey"] = "";
// // instance.defaults.headers.common["authkey"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImhhcmVlc2hAc3ludGl6ZW4uY29tfDF8MHxJTVBJVS1CTEhKTC1NR0lXQi1YU1JRWnxTdXBlckFkbWluIiwibmJmIjoxNjU0NzY2NjI1LCJleHAiOjE2NTQ4NTMwMjUsImlhdCI6MTY1NDc2NjYyNX0.BUz75bwNSEGVsZaFmKCyYf6ARnHVR8VlNnWWnUrOomw";
// instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

// instance.interceptors.request.use(
//     request => {
//         const authkey = sessionStorage.getItem('authkey');
//         request.headers.common["authkey"] = authkey;
//         // request.headers.common["authkey"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImhhcmVlc2hAc3ludGl6ZW4uY29tfDF8MHxJTVBJVS1CTEhKTC1NR0lXQi1YU1JRWnxTdXBlckFkbWluIiwibmJmIjoxNjU0NzY2NjI1LCJleHAiOjE2NTQ4NTMwMjUsImlhdCI6MTY1NDc2NjYyNX0.BUz75bwNSEGVsZaFmKCyYf6ARnHVR8VlNnWWnUrOomw";
//         // }

//         return request;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


// instance.interceptors.response.use(
//     response => {
//         if (response.data.respcode === "4003") {
//             sessionStorage.clear();
//             window.location.assign("/admin")
//             // window.location.reload();
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


// export default instance;
