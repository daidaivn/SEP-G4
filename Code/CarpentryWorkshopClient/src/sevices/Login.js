import axios from "./customize-axios"; // Import Axios instance

const apiLogin = {
  login: (userData) => {
    return axios.post("/CCMSapi/Accounts/GetToken/gettoken", userData);
  },
};

export default apiLogin;
