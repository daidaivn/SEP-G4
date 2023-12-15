import axios from "./customize-axios";

const fetchAllDependent = () => {
  return axios.get("/CCMSapi/Dependents/GetAllDependentPeople");
};

const SearchDependents = (inputName, filterGender, filterStatus) => {
  const requestBody = {
    inputText : inputName,
    gender: filterGender,
    status: filterStatus,
  };
  
  return axios.post(
    `/CCMSapi/Dependents/SearchDependents`, requestBody
  );
};
const GetDependentPeopleById = (ID) => {
  const id = ID;
  return axios.get(
    `https://sep-g4-api.azurewebsites.net/CCMSapi/Dependents/GetDependentPeopleById/${id}`
  );
};

const UpdateDependent = (dependentId, employeeId, guardian, relationshipId,identifierCode, dobString, status) => {
  const requestBody = {
    dependentId : dependentId,
    employeeId: employeeId,
    fullName:guardian,
    relationshipId: relationshipId,
    identifierCode: identifierCode,
    dobString: dobString,
    status: status,
  };
  
  return axios.put(
    `/CCMSapi/Dependents/UpdateDependent`, requestBody
  );
};
export { fetchAllDependent,SearchDependents,GetDependentPeopleById, UpdateDependent };
