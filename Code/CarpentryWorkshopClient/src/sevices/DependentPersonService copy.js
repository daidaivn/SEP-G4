import axios from "./customize-axios";

const fetchAllDependent = () => {
  return axios.get("/CCMSapi/Dependents/GetAllDependentPeople");
};
export { fetchAllDependent };
