import axios from "./customize-axios";

const fetchAllTeam = () => {
  return axios.get("/CCMSapi/Team/GetAllTeams");
};
const createTeam = (teamName, teamleaderId, teamsubleaderId) => {
  const name = teamName;
  const teamleaderid = teamleaderId;
  const teamsubleaderid = teamsubleaderId;
  return axios.post(
    `/CCMSapi/Team/AddTeam?name=${name}&teamleaderid=${teamleaderid}&teamsubleaderid=${teamsubleaderid}`
  );
};
const detailTeamByID = (teamID) => {
  return axios.get(`/CCMSapi/Team/GetTeamMembers/${teamID}/members`);
};
const fetchAllShiftManagers = () => {
  return axios.get("/CCMSapi/Team/GetShiftManagers");
};
const fetchAllLeader = () => {
  return axios.get("/CCMSapi/Team/GetLeaderForTeam");
};
const fetchAllSubLeader = () => {
  return axios.get("/CCMSapi/Team/GetSubLeaderForTeam");
};
const fetchAllStaffs = () => {
  return axios.get("/CCMSapi/Team/GetStaffs");
};
const changeLeaderId = (teamOld, teamNew) => {
  const oldTeam = teamOld;
  const newTeam = teamNew;
  return axios.put(
    `/CCMSapi/Team/ChangeLeaderTwoTeam?oldTeamId=${oldTeam}&newTeamId=${newTeam}`
  );
};
const changeSubLeaderId = (teamOld, teamNew) => {
  const oldTeam = teamOld;
  const newTeam = teamNew;
  return axios.put(
    `/CCMSapi/Team/ChangeSubLeaderTwoTeam?oldTeamId=${oldTeam}&newTeamId=${newTeam}`
  );
};
const changeStafId = (teamNew, employeeTeamId) => {
  const newTeam = teamNew;
  const employee = employeeTeamId;
  return axios.post(
    `/CCMSapi/Team/ChangeTeamStaff?teamid=${newTeam}&employeeid=${employee}`
  );
};
const fetTeamContinue = (teamId) => {
  const teamid = teamId;
  console.log('teamid', teamid);
  return axios.get(`/CCMSapi/Team/GetAvailableTeam?teamid=${teamid}`);
};
const createTeamMember = (teamId, memberIDS) => {
  const teamid = teamId;
  const memberIds = memberIDS;
  const requestData = {
    teamId: teamid,
    memberIds: memberIds
  };
  return axios.post('/CCMSapi/Team/AddTeamMember', requestData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
const searchData = (Input) => {
  const input = Input;
  console.log(`/CCMSapi/Team/SearchTeam?input=${input}`);
  return axios.post(`/CCMSapi/Team/SearchTeam?input=${input}`);
};
export {
  fetchAllTeam,
  createTeam,
  detailTeamByID,
  fetchAllShiftManagers,
  fetchAllSubLeader,
  fetchAllLeader,
  fetchAllStaffs,
  changeLeaderId,
  changeSubLeaderId,
  changeStafId,
  fetTeamContinue,
  createTeamMember,
  searchData
};
