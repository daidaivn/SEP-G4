import axios from "./customize-axios";

const fetchAllRole = () => {
  return axios.get("/CCMSapi/Role/GetAllRoles");
};
export { fetchAllRole };
