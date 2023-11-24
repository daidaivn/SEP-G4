import axios from "./customize-axios";

const fetchAllSalaries = (month, year) =>{    
    return axios.get(`/CCMSapi/Salary/GetAllSalary?month=${month}&year=${year}`);
};
const fetchAllReward = (date) => {
    return axios.get(`/CCMSapi/Reward/GetAllRewards?date=${date}`);

};

const ExportSalaryExcel = (month, year) => {
    return axios.get(
        `/CCMSapi/ExcelSalary/ExportSalaryExcel/export/${month}/${year}`,
        { responseType: 'blob' }
    );
};
export{fetchAllSalaries, fetchAllReward, ExportSalaryExcel}