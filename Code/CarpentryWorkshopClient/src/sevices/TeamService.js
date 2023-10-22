import axios from "./customize-axios";

const fetchAllTeam = () => {
  return axios.get("/CCMSapi/Team/GetAllTeams");
};
export { fetchAllTeam };
