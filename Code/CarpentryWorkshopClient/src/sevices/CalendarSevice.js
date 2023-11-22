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
const UpdateWork = (workDetailById) => {
  
  const {
    workId,
    workName,
    unitCostId,
    unitCost,
    totalProduct,
    workAreaId,
    timeStart,
    timeEnd
    
  } = workDetailById;
  
  const requestBody = {
    workId: workId ,
    workName: workName,
    totalProduct: totalProduct,
    uniCostId: unitCostId, 
    workAreaId: workAreaId,
    startDateString: timeStart, 
    endDateString: timeEnd, 
    cost: unitCost, 
    note: "", 
  };
  return axios.put(
    `/CCMSapi/Works/UpdateWork`,requestBody
  );
};

const AddWork = (workDetailById,userEmployeeID) => {
  const {
    workName,
    unitCostId,
    unitCost,
    totalProduct,
    workAreaId,
    timeStart,
    timeEnd
  } = workDetailById;
  console.log('workDetailById',workDetailById);
  
  const requestBody = {
    workName: workName,
    totalProduct: totalProduct,
    uniCostId: unitCostId, 
    workAreaId: workAreaId,
    startDateString: timeStart, 
    endDateString: timeEnd, 
    cost: unitCost, 
    note: "", 
    employeeId: userEmployeeID,
  };
  console.log('requestBody',requestBody);
  return axios.post(
    `/CCMSapi/Works/AddWork`,requestBody
  );
};

const GetDataForSchedule = (userEmployeeID,selectedWeek, selectedYear) => {
  const requestBody = {
    leaderId: userEmployeeID,
    date: selectedWeek,
    year: selectedYear
  };
  console.log('requestBody',requestBody);
  return axios.post(
    `/CCMSapi/Team/GetDataForSchedule`,requestBody
  );
};




export { GetTeamForSchedule, GetAllWorks , GetWorkDetailById, UpdateWork, AddWork, GetDataForSchedule};