import axios from "./customize-axios";

const fetchAllDependent = () => {
  return axios.get("/CWMSapi/Dependents/GetAllDependentPeople");
};

const SearchDependents = (inputName, filterGender, filterStatus) => {
  const requestBody = {
    inputText : inputName,
    gender: filterGender,
    status: filterStatus,
  };
  
  return axios.post(
    `/CWMSapi/Dependents/SearchDependents`, requestBody
  );
};
const GetDependentPeopleById = (ID) => {
  const id = ID;
  return axios.get(
    `https://sep-g4-api.azurewebsites.net/CWMSapi/Dependents/GetDependentPeopleById/${id}`
  );
};

const UpdateDependent = (dependentId, employeeId, guardian, relationshipId,identifierCode, dobString, status, gender) => {
  const requestBody = {
    dependentId : dependentId,
    employeeId: employeeId,
    fullName:guardian,
    relationshipId: relationshipId,
    identifierCode: identifierCode,
    dobString: dobString,
    status: status,
    noteReason: "",
    gender: Boolean(gender)
  };
  console.log('ga', guardian);
  console.log('dependent', requestBody);
  return axios.put(
    `/CWMSapi/Dependents/UpdateDependent`, requestBody
  );
};
export { fetchAllDependent,SearchDependents,GetDependentPeopleById, UpdateDependent };
