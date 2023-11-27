import axios from "./customize-axios";

const fetchAllCheckInOut = (EmployeeID) => {
  return axios.get(`/CCMSapi/CheckInOut/GetEmployeesByTeamLeaderIdOrTeamSubLeaderId/GetEmployeesByTeamLeaderId/${EmployeeID}`);
};
const addAllCheckInOut = (EmployeeID) => {
  return axios.post(`/CCMSapi/CheckInOut/AddCheckInOutForEmployee?employeeId=${EmployeeID}`);
};
const fetchAllDataWorks = (EmployeeID) => {
  return axios.post(`/CCMSapi/TeamWorks/GetWorkDetaiForShiftManage?id=${EmployeeID}`);
};
const updateDataWorks = (
  id,
  number
) => {
  const requestBody = {
    teamWorkId: id,
    numberProduct: number,
  };
  console.log(`/CCMSapi/TeamWorks/UpdateTeamWork`, requestBody);

  return axios.post(`/CCMSapi/TeamWorks/UpdateTeamWork`, requestBody);
};
const GetDataCheckInOutByDateAndEmployeeId = (employeeId, dateString) => {
  return axios.get(
    `/CCMSapi/CheckInOut/GetDataCheckInOutByDateAndEmployeeId?employeeId=${employeeId}&dateString=${dateString}`
  );
};
export { fetchAllCheckInOut, addAllCheckInOut ,fetchAllDataWorks, updateDataWorks, GetDataCheckInOutByDateAndEmployeeId};