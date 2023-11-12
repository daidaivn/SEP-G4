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
  sDatestring,
  eDatestring,
  lDoc,
  stt,
  contractType,
  cCode
) => {
  const eid = id;
  const requestBody = {
    startDatestring: sDatestring,
    endDatestring: eDatestring,
    linkDoc: lDoc,
    status: stt,
    contractTypeID: contractType,
    contractCode: cCode,
    image: "",
  };
  
  return axios.post(
    `CCMSapi/Contract/CreateContract?employeeid=${eid}`,requestBody);
};


export { GetEmployeeContract, GetAllContractType, CreateContract };
