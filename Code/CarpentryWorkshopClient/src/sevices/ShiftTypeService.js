import axios from "./customize-axios";
const fetchShiftType = (id) => {
    return axios.get(`/CCMSapi/ShiftType/GetShiftTypeById?id=${id}`);
  };
export { fetchShiftType };