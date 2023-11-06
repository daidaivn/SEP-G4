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
  console.log(`/CCMSapi/Employee/SearchEmployee`, requestBody);
  
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

const UpdateDependent = (dependentId, employeeId, relationshipId,identifierCode, dobString, status) => {
  const requestBody = {
    dependentId : dependentId,
    employeeId: employeeId,
    relationshipId: relationshipId,
    identifierCode: identifierCode,
    dobString: dobString,
    status: status,
  };
  console.log(`/CCMSapi/Dependents/UpdateDependent`, requestBody);
  
  return axios.put(
    `/CCMSapi/Dependents/UpdateDependent`, requestBody
  );
};
export { fetchAllDependent,SearchDependents,GetDependentPeopleById, UpdateDependent };
