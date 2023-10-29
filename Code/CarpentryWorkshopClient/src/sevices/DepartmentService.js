import axios from "./customize-axios";

const fetchAllDepadment = () => {
  return axios.get("/CCMSapi/Departments/GetAllDepartments");
};
const searchAndFilterDepartment = (departmentName, status) => {
  const name = 
  {
    departmentName: departmentName,
    status: status
  } ; 
  return axios.post(`/CCMSapi/Departments/SearchAndFilterDepartment/search`, name);
};
export { fetchAllDepadment, searchAndFilterDepartment };
