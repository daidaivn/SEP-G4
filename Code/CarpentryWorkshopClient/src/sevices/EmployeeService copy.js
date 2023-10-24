import axios from "./customize-axios";

const fetchAllEmplyee = () => {
  return axios.get("/CCMSapi/Employee/GetAllEmployee");
};
export { fetchAllEmplyee };
