import axios from "./customize-axios";

const GetAllHolidays = (inputSearch,month, year) => {
  const requestBody = {
    inputText: inputSearch,
    month: Number(month),
    year: Number(year),
}
  return axios.post(
    `/CCMSapi/Holiday/GetAllHolidays`, requestBody
  );
};

export {GetAllHolidays};