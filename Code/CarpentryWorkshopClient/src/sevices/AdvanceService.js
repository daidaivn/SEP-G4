
import axios from "./customize-axios"; // Import Axios instance


const FetchDataAdvance = (inputText, month, year) =>{
  const requestBody = {
    inputText: inputText,
    month: month,
    year: year
  };
  return axios.post(`/CCMSapi/AdvanceSalary/GetAllAdvanceSalarys`,requestBody);
}
export {FetchDataAdvance};