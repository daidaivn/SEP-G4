import axios from "./customize-axios";

const fetchAllEmplyee = () => {
  return axios.get("/CCMSapi/Employee/GetAllEmployee"); // Đặt đường dẫn tương đối từ baseURL
};
export { fetchAllEmplyee };
