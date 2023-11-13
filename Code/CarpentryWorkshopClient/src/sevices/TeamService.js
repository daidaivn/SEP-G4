import axios from "./customize-axios";

const fetchAllTeam = (id) => {
  const userEmployeeID= id;
  return axios.post(`/CCMSapi/Team/GetAllTeams?employeeid=${userEmployeeID}`);

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
const fetchAllLeader = (id) => {
  const userEmployeeID= id;
  return axios.post(`/CCMSapi/Team/GetLeaderForTeam?leadId=${userEmployeeID}`);
};
const fetchAllSubLeader = (id) => {
  const userEmployeeID= id;
  return axios.post(`/CCMSapi/Team/GetSubLeaderForTeam?leadId=${userEmployeeID}`);
};
const fetchAllStaffs = id => {
  const userEmployeeID= id;
  return axios.get(`/CCMSapi/Team/GetStaffs?leadId=${userEmployeeID}`);
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
  console.log( `/CCMSapi/Team/ChangeTeamStaff?teamid=${newTeam}&employeeid=${employee}`);
  
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

const DeleteTeamMember = (eid, tid) => {
  const employeeid = eid;
  const teamid = tid;
  return axios.post(
    `/CCMSapi/Team/DeleteTeamMember?employeeid=${employeeid}&teamid=${teamid}`
  );
};
const ChangeTeamName = (name, id) => {
  const newName = name;
  const teamid = id;
  return axios.post(
    `/CCMSapi/Team/ChangeTeamName?newName=${newName}&teamid=${teamid}`
  );
};
export {
  fetchAllTeam,
  createTeam,
  detailTeamByID,
  fetchAllSubLeader,
  fetchAllLeader,
  fetchAllStaffs,
  changeLeaderId,
  changeSubLeaderId,
  changeStafId,
  fetTeamContinue,
  createTeamMember,
  searchData,
  DeleteTeamMember,
  ChangeTeamName
};
