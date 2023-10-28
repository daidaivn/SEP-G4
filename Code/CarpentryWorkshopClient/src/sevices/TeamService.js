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
export { fetchAllTeam, createTeam, detailTeamByID };
