import axios from "./customize-axios";

const GetTeamForSchedule = (id) => {
    const userEmployeeID = id
    return axios.get(
        `/CCMSapi/Team/GetTeamForSchedule?teamleaderid=${userEmployeeID}`
    );
};
const GetAllWorks = (userEmployeeID ,selectedWeek, selectedYear) => {
  const requestBody = {
    id: userEmployeeID,
    date: selectedWeek,
    year: selectedYear,
  };
  console.log('requestBody',requestBody);
  return axios.post(
    `/CCMSapi/Works/GetAllWorks`,requestBody
  );
};

const GetWorkDetailById = (tId) => {
  const wid = tId;
  console.log(`/CCMSapi/Works/GetWorkDetailById/${wid}`);
  
  return axios.get(
    `/CCMSapi/Works/GetWorkDetailById/${wid}`
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
    `/CCMSapi/Works/UpdateWork`,requestBody
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

  console.log('requestBody',requestBody);
  
  return axios.post(
    `/CCMSapi/Works/AddWork`,requestBody
  );
};

const GetDataForSchedule = (userEmployeeID,selectedWeek, selectedYear, iText) => {
  const requestBody = {
    leaderId: userEmployeeID,
    date: selectedWeek,
    year: selectedYear,
    inputText:iText
  };

  console.log('inputText',iText);
  
  console.log('requestBody',requestBody);
  return axios.post(
    `/CCMSapi/Team/GetDataForSchedule`,requestBody
  );
};





export { GetTeamForSchedule, GetAllWorks , GetWorkDetailById, UpdateWork, AddWork, GetDataForSchedule};