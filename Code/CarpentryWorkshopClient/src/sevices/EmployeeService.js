import axios from "./customize-axios";

const fetchAllEmplyee = () => {
  return axios.get("/CWMSapi/Employee/GetAllEmployee");
};
const fetchEmplyeebyid = (id) => {
  return axios.get("/CWMSapi/Employee/GetEmployeeDetail/" + id);
};

const SearchEmployees = (inputName, filterGender, filterStatus, filterRole) => {
  const requestBody = {
    inputText: inputName,
    gender: filterGender,
    status: filterStatus,
    roleID: filterRole,
  };

  return axios.post(`/CWMSapi/Employee/SearchEmployee`, requestBody);
};
const DetailID = (id) => {
  var eid = id;
  return axios.get(`/CWMSapi/Employee/GetEmployeeDetail?eid=${eid}`);
};
const DetailEmployeebasic = (id) => {
  var eid = id;
  return axios.get(`/CWMSapi/Employee/GetEmployeeDetailBasic?employeeidstring=${eid}`);
};

const UpdateEmployee = (
  id,
  originalLastName,
  originalFirstName,
  originalPhoneNumber,
  originalGender,
  originalNationality,
  originalAddress,
  originalCIC,
  originalTaxId,
  originalDOB,
  originalStatus,
  Email,
  Image
) => {
  const requestBody = {
    employeeId: id,
    lastName: originalLastName,
    firstName: originalFirstName,
    phoneNumber: originalPhoneNumber,
    gender: originalGender,
    countryId: originalNationality,
    address: originalAddress,
    cic: originalCIC,
    taxId: originalTaxId,
    dobstring: originalDOB,
    status: originalStatus,
    email: Email,
    image: Image,
  };

  return axios.post(`/CWMSapi/Employee/UpdateEmployee`, requestBody);
};

const CreateEmployee = (
  originalLastName,
  originalFirstName,
  originalPhoneNumber,
  originalGender,
  originalNationality,
  originalAddress,
  originalCIC,
  originalTaxId,
  originalDOB,
  originalStatus,
  updatedRoleDepartments,
  Email,
  Image
) => {

  const requestBody = {
    lastName: originalLastName,
    firstName: originalFirstName,
    phoneNumber: originalPhoneNumber,
    gender: originalGender,
    countryId: originalNationality,
    address: originalAddress,
    cic: originalCIC,
    taxId: originalTaxId,
    dobstring: originalDOB,
    status: originalStatus,
    rDs: updatedRoleDepartments,
    email: Email,
    image: Image,
  };

  return axios.post(`/CWMSapi/Employee/CreateEmployee`, requestBody);
};

const GetAllCountry = () => {
  return axios.get(
    `/CWMSapi/Country/GetAllCountry`
  );
};
export { fetchAllEmplyee, fetchEmplyeebyid, SearchEmployees, DetailID, UpdateEmployee, GetAllCountry, CreateEmployee, DetailEmployeebasic};
