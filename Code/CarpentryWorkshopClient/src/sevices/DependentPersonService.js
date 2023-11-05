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
export { fetchAllDependent,SearchDependents,GetDependentPeopleById };
