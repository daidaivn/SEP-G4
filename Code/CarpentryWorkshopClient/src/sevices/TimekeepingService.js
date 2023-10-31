import axios from "./customize-axios";

const fetchAllCheckInOut = (EmployeeID) => {
  return axios.get(`/CCMSapi/CheckInOut/GetEmployeesByTeamLeaderIdOrTeamSubLeaderId/GetEmployeesByTeamLeaderId/${EmployeeID}`);
};
export { fetchAllCheckInOut };