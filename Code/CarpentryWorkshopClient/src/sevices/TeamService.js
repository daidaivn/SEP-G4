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

export { fetchAllTeam, createTeam, detailTeamByID,fetchAllShiftManagers,fetchAllShiftAssistants,fetchAllStaffs };
