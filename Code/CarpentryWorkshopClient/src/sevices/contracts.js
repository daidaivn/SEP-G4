import axios from "./customize-axios";

const GetEmployeeContract = (id, ) => {
  const eid = id;
  return axios.get(
    `/CCMSapi/Contract/GetEmployeeContract?eid=${eid}`
  );
};

const GetAllContractType = () => {
  return axios.get(
    `CCMSapi/ContractType/GetAllContractType`
  );
};


export {GetEmployeeContract, GetAllContractType}