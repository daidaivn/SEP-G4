import axios from "./customize-axios";
const fetchShiftType = (id) => {
    return axios.get(`/CWMSapi/ShiftType/GetShiftTypeById?id=${id}`);
  };
export { fetchShiftType };