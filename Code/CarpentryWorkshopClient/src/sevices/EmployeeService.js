import axios from "./customize-axios";

const fetchAllEmplyee = () => {
  return axios.get("/CCMSapi/Employee/GetAllEmployee");
};
const fetchEmplyeebyid = (id) => {
  return axios.get("/CCMSapi/Employee/GetEmployeeDetail/"+id);
};

const SearchEmployees = (inputName, filterGender, filterStatus, filterRole) => {
  const requestBody = {
    inputText : inputName,
    gender: filterGender,
    status: filterStatus,
    roleID: filterRole
  };
  console.log(`/CCMSapi/Employee/SearchEmployee`, requestBody);
  
  return axios.post(
    `/CCMSapi/Employee/SearchEmployee`, requestBody
  );
};
export { fetchAllEmplyee , fetchEmplyeebyid , SearchEmployees };
