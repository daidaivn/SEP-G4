import axios from "./customize-axios";

const fetchAllTeam = () => {
  return axios.get("/CCMSapi/Team/GetAllTeams");
};
const createTeam = (teamName) => {
  const name = teamName ; 
  return axios.post(`/CCMSapi/Team/AddTeam?name=${name}`);
};
export { fetchAllTeam, createTeam };
