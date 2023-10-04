import axios from "./customize-axios";

const fetchAllDepadment = () => {
  return axios.get("/api/Departments");
};
export { fetchAllDepadment };
