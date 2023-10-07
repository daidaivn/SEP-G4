import axios from "./customize-axios";

const fetchAllDepadment = () => {
  return axios.get("/CCMSapi/Departments/GetAllDepartments");
};
export { fetchAllDepadment };
