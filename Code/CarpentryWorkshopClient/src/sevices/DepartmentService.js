import axios from "./customize-axios";

const fetchAllDepadment = () => {
  return axios.get("/CWMSapi/Departments/GetAllDepartments");
};

const searchAndFilterDepartment = (departmentName, status) => {
  const name = {
    departmentName: departmentName,
    status: status,
  };
  return axios.post(
    `/CWMSapi/Departments/SearchAndFilterDepartment/search`,
    name
  );
};

const addDepartment = (Name) => {
  const name = Name;
  return axios.post(
    `/CWMSapi/Departments/CreateDepartment?departmentName=${name}`
  );
};

const updateDepartment = (id, name) => {
  const requestBody = {
    departmentId: id,
    departmentName: name,
    status: null,
  };
  return axios.put(`/CWMSapi/Departments/UpdateDepartment`, requestBody);
};

const CreateDependent = (eid, name, code, gd, dob, stt, relaId) => {
  const requestBody = {
    dependentId: 0,
    employeeId: Number(eid),
    fullName: name,
    identifierCode: code,
    gender: Boolean(gd),
    dobString: dob,
    status: stt,
    relationshipId: Number(relaId),
  };
  console.log('dependperson', requestBody);
  return axios.post(`/CWMSapi/Dependents/CreateDependent`, requestBody);
};

const detailOfDepartment = (ID) => {
  const id = ID;
  return axios.get(
    `/CWMSapi/Departments/GetEmployeeInDepartment/DepartmentDetail/${id}`
  );
};
export {
  fetchAllDepadment,
  searchAndFilterDepartment,
  addDepartment,
  detailOfDepartment,
  updateDepartment,
  CreateDependent,
};
