import axios from "./customize-axios";

const GetTeamForSchedule = (id) => {
    const userEmployeeID = id
    return axios.get(
        `/CCMSapi/Team/GetTeamForSchedule?teamleaderid=${userEmployeeID}`
    );
};
const GetAllWorks = (id) => {
    const userEmployeeID = id
  return axios.get(
    `/CCMSapi/Works/GetAllWorks?employeeId=${userEmployeeID}`
  );
};

const GetWorkDetailById = (tId) => {
  const wid = tId;
  console.log(`/CCMSapi/Works/GetWorkDetailById/${wid}`);
  
  return axios.get(
    `/CCMSapi/Works/GetWorkDetailById/${wid}`
  );
};


export { GetTeamForSchedule, GetAllWorks , GetWorkDetailById};