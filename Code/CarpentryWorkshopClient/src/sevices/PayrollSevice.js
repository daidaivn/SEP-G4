import axios from "./customize-axios";

const fetchAllSalaries = (iText, month, year) => {
    const requestBody = {
        inputText: iText,
        month: month,
        year: year,
    }
    return axios.post(`/CCMSapi/Salary/GetAllSalary`,requestBody);
};

const fetchAllReward = (date) => {
    return axios.get(`/CCMSapi/Reward/GetAllRewards?date=${date}`);
};

const ExportSalaryExcel = (month, year) => {
    return axios.get(
        `/CCMSapi/ExcelSalary/ExportSalaryExcel/export/${month}/${year}`,
        { responseType: "blob" }
    );
};

const GetEmployeeAllowanceDetail = (eid, EMonth, EYear) => {
    const employeeid = eid;
    const month = EMonth;
    const year = EYear;
    return axios.get(
        `/CCMSapi/Salary/GetEmployeeAllowanceDetail?employeeid=${employeeid}&month=${month}&year=${year}`
    );
};

const GetEmployeeDeductionDetail = (eid, EMonth, EYear) => {
    const employeeid = eid;
    const month = EMonth;
    const year = EYear;
    return axios.get(
        `/CCMSapi/Salary/GetEmployeeDeductionDetail?employeeid=${employeeid}&month=${month}&year=${year}`
    );
};

const GetEmployeeActualSalaryDetail = (eid, EMonth, EYear) => {
    const employeeid = eid;
    const month = EMonth;
    const year = EYear;
    return axios.get(
        `/CCMSapi/Salary/GetEmployeeActualSalaryDetail?employeeid=${employeeid}&month=${month}&year=${year}`
    );
};
export {
    fetchAllSalaries,
    fetchAllReward,
    ExportSalaryExcel,
    GetEmployeeAllowanceDetail,
    GetEmployeeDeductionDetail,
    GetEmployeeActualSalaryDetail,
};
