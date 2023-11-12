import axios from "./customize-axios";

const fetchAllCheckInOut = (EmployeeID) => {
  return axios.get(`/CCMSapi/CheckInOut/GetEmployeesByTeamLeaderIdOrTeamSubLeaderId/GetEmployeesByTeamLeaderId/${EmployeeID}`);
};
const addAllCheckInOut = (EmployeeID) => {
  return axios.post(`/CCMSapi/CheckInOut/AddCheckInOutForEmployee?employeeId=${EmployeeID}`);
};
const fetchAllDataWorks = (EmployeeID) => {
  return axios.post(`/CCMSapi/CheckInOut/AddCheckInOutForEmployee?employeeId=${EmployeeID}`);
};
export { fetchAllCheckInOut, addAllCheckInOut };