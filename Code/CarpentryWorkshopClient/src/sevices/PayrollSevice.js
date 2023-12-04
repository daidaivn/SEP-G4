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
const fetchAllSalaryDetail = (month,year) => {
    return axios.get(`/CCMSapi/ExcelSalary/GetEmployeesByContractDate/ContractsByDate/${month}/${year}`);
};
const ExportSalaryExcel = (month, year) => {
    return axios.get(
        `/CCMSapi/ExcelSalary/ExportSalaryExcel/export/${month}/${year}`,
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
const CreateAndEditPersonalReward = (bonusId, employeeId, bonusAmount, bonusName, bonusReason) => {
    const requestBody = {
        bonusId: bonusId,
        employeeId: Number(employeeId),
        bonusAmount: Number(bonusAmount),
        bonusName: bonusName,
        bonusReason: bonusReason,
        bonusDatestring: '',
    }
    console.log('person', requestBody);
    return axios.post(`/CCMSapi/Reward/CreateAndEditPersonalReward`,requestBody);
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
    console.log('special', requestBody);
    return axios.post(`/CCMSapi/Reward/CreateAndEditSpecialOccasion`,requestBody);
};
const CreateAndUpdateCompanyRerward = (bonusId, bonusAmount, bonusName, bonusReason) => {
    const requestBody = {
        companyBonusId: bonusId,
        bonusAmount: Number(bonusAmount),
        bonusName: bonusName,
        bonusDatestring: '',
        bonusReason: bonusReason,
    }
    console.log('special', requestBody);
    return axios.post(`/CCMSapi/Reward/CreateAndEditCompanyReward`,requestBody);
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
    ExcelSalary
};
