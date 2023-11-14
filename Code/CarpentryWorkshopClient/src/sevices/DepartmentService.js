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
const updateDepartment = (id,name) =>{
  const requestBody = {
    departmentId: id,
    departmentName: name,
    status: null
  };
  console.log(requestBody);
  return axios.put(`/CCMSapi/Departments/UpdateDepartment`,requestBody);
};
const detailOfDepartment = (ID)=>{
  const id = ID;
  return axios.get(`/CCMSapi/Departments/GetEmployeeInDepartment/DepartmentDetail/${id}`);
};
export { fetchAllDepadment, searchAndFilterDepartment,addDepartment,detailOfDepartment,updateDepartment};
