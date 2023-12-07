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


const CreateHolidayDetail = (inputHolidays) => {
  const {
    nameHoliday,
    startDate,
    endDate
  } = inputHolidays;

  const requestBody = {
    holidayName: nameHoliday ,
    startDatestring: startDate,
    endDatestring: endDate,
  };

  return axios.post(
    `/CCMSapi/Holiday/CreateHolidayDetail`,requestBody
  );
};

const GetHolidays = (id) => {
  const newTeam = id;
  return axios.get(
    `/CCMSapi/Holiday/GetHolidays`
  );
};

export {GetAllHolidays, CreateHolidayDetail, GetHolidays};