import toast from "react-hot-toast";
import Axios from "../../services/axios";

/**
 * @description funtion to get base url for Prod and UAT
 * @returns {string} base url
 */
// "http://192.168.1.6:5001" ||
const getBaseUrl = () =>  "https://d33rdsqeflhtup.cloudfront.net";

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

// import axios from "axios";

// const getUsers = () => {
//   axios
//     .get("https://d33rdsqeflhtup.cloudfront.net/profile")
//     .then((response) =>
//       response.data.results.map((user) => ({
//         name: `${user.name.first} ${user.name.last}`,
//         username: `${user.login.username}`,
//         email: `${user.email}`,
//         image: `${user.picture.thumbnail}`,
//       }))
//     )
//     .then((users) => {
//       this.setState({ users, isLoading: false });
//     })
//     .catch((error) => this.setState({ error, isLoading: false }));
// };


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