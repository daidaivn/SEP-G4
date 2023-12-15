import Password from "antd/es/input/Password";
import axios from "./customize-axios"; // Import Axios instance


const forgotPassword = (email) =>{
  return axios.post(`/CCMSapi/Accounts/ForgotPassword?emailInput=${email}`);
}
const ChangeUserNameAndPassWord = (id, userName, password) =>{
  const requestBody = {
    id: id,
    userName: userName,
    password: password
  };
  return axios.post(`/CCMSapi/Accounts/ChangeUserNameAndPassWord`,requestBody);
}
export {forgotPassword, ChangeUserNameAndPassWord};
