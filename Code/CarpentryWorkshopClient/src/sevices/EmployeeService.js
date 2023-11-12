import axios from "./customize-axios";

const fetchAllEmplyee = () => {
  return axios.get("/CCMSapi/Employee/GetAllEmployee");
};
const fetchEmplyeebyid = (id) => {
  return axios.get("/CCMSapi/Employee/GetEmployeeDetail/" + id);
};

const SearchEmployees = (inputName, filterGender, filterStatus, filterRole) => {
  const requestBody = {
    inputText: inputName,
    gender: filterGender,
    status: filterStatus,
    roleID: filterRole,
  };
  console.log(`/CCMSapi/Employee/SearchEmployee`, requestBody);

  return axios.post(`/CCMSapi/Employee/SearchEmployee`, requestBody);
};
const DetailID = (id) => {
  var eid = id;
  return axios.get(`/CCMSapi/Employee/GetEmployeeDetail?eid=${eid}`);
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
  console.log(`/CCMSapi/Employee/UpdateEmployee`, requestBody);

  return axios.post(`/CCMSapi/Employee/UpdateEmployee`, requestBody);
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

  return axios.post(`/CCMSapi/Employee/CreateEmployee`, requestBody);
};


const GetAllCountry = () => {
  return axios.get(
    `/CCMSapi/Country/GetAllCountry`
  );
};
export { fetchAllEmplyee, fetchEmplyeebyid, SearchEmployees, DetailID, UpdateEmployee, GetAllCountry, CreateEmployee};
