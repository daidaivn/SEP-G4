import axios from "./customize-axios";

const fetchAllTeam = () => {
  return axios.get("/CCMSapi/Team/GetAllTeams");
};
const createTeam = (teamName) => {
  const name = teamName ; 
  return axios.post(`/CCMSapi/Team/AddTeam?name=${name}`);
};
const detailTeamByID = (teamID) => {
  return axios.get(`/CCMSapi/Team/GetTeamMembers/${teamID}/members`);
};
const fetchAllShiftManagers = () => {
  return axios.get("/CCMSapi/Team/GetShiftManagers");
};
const fetchAllShiftAssistants = () => {
  return axios.get("/CCMSapi/Team/GetAllTeams");
};
const fetchAllStaffs = () => {
  return axios.get("/CCMSapi/Team/GetStaffs");
};
const changeLeaderId = (teamOld, teamNew) => {
  const oldTeam = teamOld ; 
  const newTeam = teamNew ; 
  return axios.put(`/CCMSapi/Team/ChangeLeaderTwoTeam?oldTeam=${oldTeam}&newTeam=${newTeam}`);
};
const changeSubLeaderId = (teamOld, teamNew) => {
  const oldTeam = teamOld ; 
  const newTeam = teamNew ; 
  return axios.put(`/CCMSapi/Team/ChangeSubLeaderTwoTeam?oldTeam=${oldTeam}&newTeam=${newTeam}`);
};
const changeStafId = (teamNew, employeeTeamId) => {
  const newTeam = teamNew ; 
  const employee = employeeTeamId;
  return axios.post(`/CCMSapi/Team/ChangeTeamStaff?teamid=${newTeam}&employeeid=${employee}`);
};
export { fetchAllTeam, createTeam, detailTeamByID,fetchAllShiftManagers,fetchAllShiftAssistants,fetchAllStaffs, changeLeaderId , changeSubLeaderId, changeStafId};
