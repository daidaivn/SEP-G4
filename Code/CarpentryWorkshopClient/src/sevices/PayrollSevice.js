import axios from "./customize-axios";

const fetchAllSalaries = (iText, month, year) => {
    const requestBody = {
        inputText: iText,
        month: month,
        year: year,
    }
    return axios.post(`/CWMSapi/Salary/GetAllSalary`,requestBody);
};

const fetchAllReward = (date) => {
    return axios.get(`/CWMSapi/Reward/GetAllRewards?date=${date}`);
};
const fetchAllSalaryDetail = (month,year) => {
    return axios.get(`/CWMSapi/ExcelSalary/GetEmployeesByContractDate/ContractsByDate/${month}/${year}`);
};
const ExportSalaryExcel = (month, year) => {
    return axios.get(
        `/CWMSapi/ExcelSalary/ExportSalaryExcel/export/${month}/${year}`,
        { responseType: "blob" }
    );
};

const fakeApiInstance = axios.create({
    baseURL: "http://localhost:3001"
  });
  
  
  const ExcelSalary = () => {
    return fakeApiInstance.get(`/export`);
  };
  
const GetEmployeeAllowanceDetail = (eid, EMonth, EYear) => {
    const employeeid = eid;
    const month = EMonth;
    const year = EYear;
    return axios.get(
        `/CWMSapi/Salary/GetEmployeeAllowanceDetail?employeeid=${employeeid}&month=${month}&year=${year}`
    );
};

const GetEmployeeDeductionDetail = (eid, EMonth, EYear) => {
    const employeeid = eid;
    const month = EMonth;
    const year = EYear;
    return axios.get(
        `/CWMSapi/Salary/GetEmployeeDeductionDetail?employeeid=${employeeid}&month=${month}&year=${year}`
    );
};

const GetEmployeeActualSalaryDetail = (eid, EMonth, EYear) => {
    const employeeid = eid;
    const month = EMonth;
    const year = EYear;
    return axios.get(
        `/CWMSapi/Salary/GetEmployeeActualSalaryDetail?employeeid=${employeeid}&month=${month}&year=${year}`
    );
}; 
const CreateAndEditPersonalReward = (bonusId, employeeId, bonusAmount, bonusName, bonusReason) => {
    const requestBody = {
        bonusId: bonusId,
        employeeId: Number(employeeId),
        bonusAmount: Number(bonusAmount),
        bonusName: bonusName,
        bonusReason: bonusReason,
        bonusDatestring: '',
    }
    return axios.post(`/CWMSapi/Reward/CreateAndEditPersonalReward`,requestBody);
};
const CreateAndUpdateSpecialOccasion = (bonusId, employeeId, bonusAmount, bonusName, bonusReason) => {
    const requestBody = {
        occasionId: bonusId,
        employeeId: Number(employeeId),
        amount: Number(bonusAmount),
        occasionType: bonusName,
        occasionDateString: '',
        occasionNote: bonusReason,
    }

    return axios.post(`/CWMSapi/Reward/CreateAndEditSpecialOccasion`,requestBody);
};
const CreateAndUpdateCompanyRerward = (bonusId, bonusAmount, bonusName, bonusReason) => {
    const requestBody = {
        companyBonusId: bonusId,
        bonusAmount: Number(bonusAmount),
        bonusName: bonusName,
        bonusDatestring: '',
        bonusReason: bonusReason,
    }
    console.log('reward', requestBody);
    return axios.post(`/CWMSapi/Reward/CreateAndEditCompanyReward`,requestBody);
};
const GetEmployeeDetailSalary = (eid, EMonth, EYear) => {
    const employeeid = eid;
    const month = EMonth;
    const year = EYear;
    return axios.get(
        `/CWMSapi/ExcelSalary/GetEmployeesByContractDate/ContractsByDate/${month}/${year}/${employeeid}`
    );
};
export {
    fetchAllSalaries,
    fetchAllSalaryDetail,
    fetchAllReward,
    ExportSalaryExcel,
    GetEmployeeAllowanceDetail,
    GetEmployeeDeductionDetail,
    GetEmployeeActualSalaryDetail,
    CreateAndEditPersonalReward,
    CreateAndUpdateSpecialOccasion,
    CreateAndUpdateCompanyRerward,
    ExcelSalary,
    GetEmployeeDetailSalary,
};
