import axios from "./customize-axios";

const fetchAllSalaries = (month, year) =>{    
    return axios.get(`/CCMSapi/Salary/GetAllSalary?month=${month}&year=${year}`);
};
export{fetchAllSalaries}