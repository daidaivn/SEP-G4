import axios from "./customize-axios";

const GetAllHolidays = (m, y) => {
  const month = m;
  const year = y;
  return axios.get(
    `/CCMSapi/Holiday/GetAllHolidays?month=${month}&year=${year}`
  );
};

export {GetAllHolidays};