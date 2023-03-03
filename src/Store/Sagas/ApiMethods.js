import toast from "react-hot-toast";
import Axios from "../../services/axios";

/**
 * @description funtion to get base url for Prod and UAT
 * @returns {string} base url
 */
const getBaseUrl = () => sessionStorage.getItem("account")==0 ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_PRODUCTION_URL;

export const getAPI = (url) => {
  return Axios.get(getBaseUrl()+url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        toast.error(
          err?.response?.data?.errors?.length &&
            err?.response?.data?.errors[0]?.message
        );
      } else {
        toast.error(err.message);
      }
    });
};

export const postAPI = (url, body) => {
  // if(sessionStorage.getItem("account")==0){
  //   var baseURL = "https://vcipapi.syntizen.com/uatv2/api/vkyc/";
  // }else{
  //   var baseURL = "https://api.getkyc.com/api/vkyc/";
  // }
  return Axios.post(getBaseUrl()+url, body)
    .then((res) => {
        // console.log(res,"---------------------->")
      return res?.data;
    })
    .catch((err) => {
        console.log(err)
      return err
    });
};