import axios from "./customize-axios";

const fetchAllCheckInOut = () => {
  return axios.get("/CCMSapi/CheckInOut/GetAllCheckInOut");
};
export { fetchAllCheckInOut };