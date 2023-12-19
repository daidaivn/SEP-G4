import axios from "./customize-axios";

const fetchAllPages = () => {
  return axios.get("/CWMSapi/Pages/GetAllPage");
};
export { fetchAllPages };