import axios from "./customize-axios";

const GetEmployeeContract = (id) => {
  const eid = id;
  return axios.get(`/CWMSapi/Contract/GetEmployeeContract?eid=${eid}`);
};

const GetAllContractType = () => {
  return axios.get(`CWMSapi/ContractType/GetAllContractType`);
};

const CreateContract = (
  id,
  contractStartDate,
  contractLink,
  contractStatus,
  contractType,
  contractCode,
  amount,
) => {

  const eid = id;
  const requestBody = {
    startDatestring: contractStartDate,
    linkDoc: contractLink,
    status: contractStatus,
    contractTypeID: Number(contractType),
    contractCode: contractCode,
    amount: Number(amount),
  };
  return axios.post(
    `/CWMSapi/Contract/CreateContract?employeeid=${eid}`,
    requestBody
  );
};

const UpdateContract = (
  cId,
  eid,
  sDatestring,
  eDatestring,
  lDoc,
  stt,
  cTypeID,
  cCode,
  img,
  amount,
  originalOffice
) => {

  console.log('lDoc',lDoc);
  
  const requestBody = {
    contractId: cId,
    employeeId: eid,
    startDatestring: sDatestring,
    endDatestring: eDatestring,
    linkDoc: lDoc,
    status: stt,
    contractTypeID: cTypeID,
    contractCode: cCode,
    image: img,
    amount: Number(amount),
    isOffice: originalOffice
  };

  console.log('requestBody',requestBody);
  

  return axios.put(
    `CWMSapi/Contract/UpdateContract`,
    requestBody
  );
};

export { GetEmployeeContract, GetAllContractType, CreateContract, UpdateContract };
