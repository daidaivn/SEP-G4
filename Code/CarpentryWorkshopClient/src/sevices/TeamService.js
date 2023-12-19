import axios from "./customize-axios";

const fetchAllTeam = (id) => {
  const userEmployeeID= id;
  return axios.post(`/CWMSapi/Team/GetAllTeams?employeeid=${userEmployeeID}`);

};
const createTeam = (teamName, teamleaderId, teamsubleaderId) => {
  const name = teamName;
  const teamleaderid = teamleaderId;
  const teamsubleaderid = teamsubleaderId;
  return axios.post(
    `/CWMSapi/Team/AddTeam?name=${name}&teamleaderid=${teamleaderid}&teamsubleaderid=${teamsubleaderid}`
  );
};
const detailTeamByID = (teamID) => {
  return axios.get(`/CWMSapi/Team/GetTeamMembers/${teamID}/members`);
};
const fetchAllLeader = (id) => {
  const userEmployeeID= id;
  return axios.post(`/CWMSapi/Team/GetLeaderForTeam?leadId=${userEmployeeID}`);
};
const fetchAllSubLeader = (id) => {
  const userEmployeeID= id;
  return axios.post(`/CWMSapi/Team/GetSubLeaderForTeam?leadId=${userEmployeeID}`);
};
const fetchAllStaffs = id => {
  const userEmployeeID= id;
  return axios.get(`/CWMSapi/Team/GetStaffs?leadId=${userEmployeeID}`);
};
const changeLeaderId = (teamOld, teamNew) => {
  const oldTeam = teamOld;
  const newTeam = teamNew;
  return axios.put(
    `/CWMSapi/Team/ChangeLeaderTwoTeam?oldTeamId=${oldTeam}&newTeamId=${newTeam}`
  );
};
const changeSubLeaderId = (teamOld, teamNew) => {
  const oldTeam = teamOld;
  const newTeam = teamNew;
  return axios.put(
    `/CWMSapi/Team/ChangeSubLeaderTwoTeam?oldTeamId=${oldTeam}&newTeamId=${newTeam}`
  );
};
const changeStafId = (teamNew, employeeTeamId) => {
  const newTeam = teamNew;
  const employee = employeeTeamId;
  
  return axios.post(
    `/CWMSapi/Team/ChangeTeamStaff?teamid=${newTeam}&employeeid=${employee}`
  );
};
const fetTeamContinue = (teamId) => {
  const teamid = teamId;

  return axios.get(`/CWMSapi/Team/GetAvailableTeam?teamid=${teamid}`);
};
const createTeamMember = (teamId, memberIDS) => {
  const teamid = teamId;
  const memberIds = memberIDS;
  const requestData = {
    teamId: teamid,
    memberIds: memberIds
  };
  return axios.post('/CWMSapi/Team/AddTeamMember', requestData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
const searchData = (Input) => {
  const input = Input;
  return axios.post(`/CWMSapi/Team/SearchTeam?input=${input}`);
};

const DeleteTeamMember = (eid, tid) => {
  const employeeid = eid;
  const teamid = tid;
  return axios.post(
    `/CWMSapi/Team/DeleteTeamMember?employeeid=${employeeid}&teamid=${teamid}`
  );
};
const ChangeTeamName = (name, id) => {
  const newName = name;
  const teamid = id;
  return axios.post(
    `/CWMSapi/Team/ChangeTeamName?newName=${newName}&teamid=${teamid}`
  );
};
const CancelTeam = (id) => {
  const teamid = Number(id);
  return axios.post(
    `/CWMSapi/Team/CancelTeam?teamId=${teamid}`
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
  ChangeTeamName,
  CancelTeam,
};
