import axios from "./customize-axios";

const fetchAllPages = () => {
  return axios.get("/CCMSapi/Pages/GetAllPage");
};
export { fetchAllPages };