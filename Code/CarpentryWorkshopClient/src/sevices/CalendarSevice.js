import axios from "./customize-axios";

const GetTeamForSchedule = (id) => {
    const userEmployeeID = id
    return axios.get(
        `/CCMSapi/Team/GetTeamForSchedule?teamleaderid=${userEmployeeID}`
    );
};
const GetAllWorks = () => {
    // const userEmployeeID = id
  return axios.get(
    `/CCMSapi/Works/GetAllWorks`
  );
};


export { GetTeamForSchedule, GetAllWorks };