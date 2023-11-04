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
const addDepartment = (Name) => {
  const name = Name;
  return axios.post(
    `/CCMSapi/Departments/CreateDepartment?departmentName=${name}`
  );
};
export { fetchAllDepadment, searchAndFilterDepartment,addDepartment};
