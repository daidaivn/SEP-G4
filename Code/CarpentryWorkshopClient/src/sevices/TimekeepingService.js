import axios from "./customize-axios";

const fetchAllCheckInOut = (EmployeeID) => {
  return axios.get(`/CWMSapi/CheckInOut/GetEmployeesByTeamLeaderIdOrTeamSubLeaderId/GetEmployeesByTeamLeaderId/${EmployeeID}`);
};
const addAllCheckInOut = (EmployeeID) => {
  return axios.post(`/CWMSapi/CheckInOut/AddCheckInOutForEmployee?employeeId=${EmployeeID}`);
};
const fetchAllDataWorks = (EmployeeID) => {
  return axios.post(`/CWMSapi/TeamWorks/GetWorkDetaiForShiftManage?id=${EmployeeID}`);
};
const updateDataWorks = (
  id,
  number
) => {
  const requestBody = {
    teamWorkId: id,
    numberProduct: number,
  };
  console.log('teamwork', requestBody);
  return axios.post(`/CWMSapi/TeamWorks/UpdateTeamWork`, requestBody);
};
const GetDataCheckInOutByDateAndEmployeeId = (employeeId, dateString) => {
  return axios.get(
    `/CWMSapi/CheckInOut/GetDataCheckInOutByDateAndEmployeeId?employeeId=${employeeId}&dateString=${dateString}`
  );
};
const UpdateCheckInOutForEmployee = (id, checkIn, checkOut) => {

  const requestBody = {
    id: id,
    checkIn: checkIn,
    checkOut: checkOut,
  };
  console.log('dataCheckIn', requestBody);
  return axios.post(`/CWMSapi/CheckInOut/UpdateCheckInOutForEmployee`, requestBody);
};
export { fetchAllCheckInOut, addAllCheckInOut ,fetchAllDataWorks, updateDataWorks, GetDataCheckInOutByDateAndEmployeeId, UpdateCheckInOutForEmployee};