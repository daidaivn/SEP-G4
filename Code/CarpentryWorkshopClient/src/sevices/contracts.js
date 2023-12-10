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
  amount
) => {
  console.log(id);
  console.log(contractStartDate);
  console.log(contractEndDate);
  console.log(contractLink);
  console.log(contractStatus);
  console.log(contractType);
  console.log(contractCode);
  console.log(amount);

  const eid = id;
  const requestBody = {
    startDatestring: contractStartDate,
    endDatestring: contractEndDate,
    linkDoc: contractLink,
    status: contractStatus,
    contractTypeID: Number(contractType),
    contractCode: contractCode,
    image: "",
    amount: Number(amount)
  };

  console.log('requestBody', requestBody);

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
  amount
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
    amount: Number(amount)
  };
  console.log('data contract', requestBody);

  return axios.put(
    `CCMSapi/Contract/UpdateContract`,
    requestBody
  );
};

export { GetEmployeeContract, GetAllContractType, CreateContract, UpdateContract };
