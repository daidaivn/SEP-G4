import axios from "./customize-axios";

const GetTeamForSchedule = (id) => {
    const userEmployeeID = id
    return axios.get(
        `/CWMSapi/Team/GetTeamForSchedule?teamleaderid=${userEmployeeID}`
    );
};
const GetAllWorks = (userEmployeeID ,selectedWeek, selectedYear) => {
  const requestBody = {
    id: userEmployeeID,
    date: selectedWeek,
    year: selectedYear,
  };
  return axios.post(
    `/CWMSapi/Works/GetAllWorks`,requestBody
  );
};

const GetWorkDetailById = (tId) => {
  const wid = tId;
  
  return axios.get(
    `/CWMSapi/Works/GetWorkDetailById/${wid}`
  );
};
const UpdateWork = (workDetailById) => {
  
  const {
    workId,
    workName,
    unitCostId,
    unitCost,
    totalProduct,
    workAreaId,
    date,
  } = workDetailById;
  
  const requestBody = {
    workId: workId ,
    workName: workName,
    totalProduct: totalProduct,
    uniCostId: unitCostId, 
    workAreaId: workAreaId,
    startDateString: "", 
    endDateString: "", 
    cost: unitCost, 
    note: "", 
    dateString:date
  };
  return axios.put(
    `/CWMSapi/Works/UpdateWork`,requestBody
  );
};

const AddWork = (workDetailById, userEmployeeID, teamId) => {
  const {
    workName,
    unitCostId,
    unitCost,
    totalProduct,
    workAreaId,
    date
  } = workDetailById;
  
  const requestBody = {
    teamId: Number(teamId),
    workName: workName,
    totalProduct: Number(totalProduct),
    uniCostId: Number(unitCostId), 
    workAreaId: Number(workAreaId),
    startDateString: "", 
    endDateString: "", 
    cost: Number(unitCost), 
    note: "", 
    employeeId: Number(userEmployeeID),
    dateString:date
  };
  console.log('work', requestBody);
  return axios.post(
    `/CWMSapi/Works/AddWork`,requestBody
  );
};

const GetDataForSchedule = (userEmployeeID,selectedWeek, selectedYear, iText) => {
  const requestBody = {
    leaderId: userEmployeeID,
    date: selectedWeek,
    year: selectedYear,
    inputText:iText
  };

  return axios.post(
    `/CWMSapi/Team/GetDataForSchedule`,requestBody
  );
};





export { GetTeamForSchedule, GetAllWorks , GetWorkDetailById, UpdateWork, AddWork, GetDataForSchedule};