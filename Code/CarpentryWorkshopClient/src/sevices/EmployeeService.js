import axios from "./customize-axios";

const fetchAllEmplyee = () => {
  return axios.get("/CCMSapi/Employee/GetAllEmployee");
};
const fetchEmplyeebyid = (id) => {
  return axios.get("/CCMSapi/Employee/GetEmployeeDetail/"+id);
};
export { fetchAllEmplyee , fetchEmplyeebyid  };
