import axios from "./customize-axios";

const GetEmployeeContract = (id) => {
  const eid = id;
  return axios.get(`/CCMSapi/Contract/GetEmployeeContract?eid=${eid}`);
};

const GetAllContractType = () => {
  return axios.get(`CCMSapi/ContractType/GetAllContractType`);
};

const CreateContract = (
  id,
  contractStartDate,
  contractEndDate,
  contractLink,
  contractStatus,
  contractType,
  contractCode,
  amount,
  originalOffice
) => {

  const eid = id;
  const requestBody = {
    startDatestring: contractStartDate,
    endDatestring: contractEndDate,
    linkDoc: contractLink,
    status: contractStatus,
    contractTypeID: Number(contractType),
    contractCode: contractCode,
    image: "",
    amount: Number(amount),
    isOffice: originalOffice
  };


  return axios.post(
    `CCMSapi/Contract/CreateContract?employeeid=${eid}`,
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

  return axios.put(
    `CCMSapi/Contract/UpdateContract`,
    requestBody
  );
};

export { GetEmployeeContract, GetAllContractType, CreateContract, UpdateContract };
