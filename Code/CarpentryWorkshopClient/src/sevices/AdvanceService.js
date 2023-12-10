
import axios from "./customize-axios"; // Import Axios instance


const FetchDataAdvance = (inputText, month, year) =>{
  const requestBody = {
    inputText: inputText,
    month: month,
    year: year
  };
  return axios.post(`/CCMSapi/AdvanceSalary/GetAllAdvanceSalarys`,requestBody);
}

const GetEmployees = (id) => {
  const employeeidstring = id;
  return axios.get(
    `/CCMSapi/AdvanceSalary/GetEmployees?employeeidstring=${employeeidstring}`
  );
};

const GetAdvanceSalaryDetail = (id) => {
  const AdvanceID = id;
  return axios.get(
    `/CCMSapi/AdvanceSalary/GetAdvanceSalaryDetail?advanceSalaryId=${AdvanceID}`
  );
};
export {FetchDataAdvance, GetEmployees, GetAdvanceSalaryDetail};