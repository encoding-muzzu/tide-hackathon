import toast from "react-hot-toast";
import Axios from "../../services/axios";

/**
 * @description funtion to get base url for Prod and UAT
 * @returns {string} base url
 */
// "http://192.168.1.6:5001" ||
// const getBaseUrl = () => "http://localhost:5000"
const getBaseUrl = () => "http://ec2-15-206-146-70.ap-south-1.compute.amazonaws.com";

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
  return Axios.post(getBaseUrl()+url, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
        console.log(err)
      return err
    });
};