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
  cCode,
  amount
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
    amount:Number(amount)
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
    image:img,
    amount:Number(amount)
  };
  console.log('data contract',requestBody);

  return axios.put(
    `CCMSapi/Contract/UpdateContract`,
    requestBody
  );
};

export { GetEmployeeContract, GetAllContractType, CreateContract, UpdateContract };
