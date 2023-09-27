import axios from "./customize-axios";
const fetchAllManage = () => {
  return axios.get("link-api");
};
export { fetchAllManage };
