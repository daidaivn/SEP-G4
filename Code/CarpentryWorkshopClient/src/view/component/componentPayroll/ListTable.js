import React from "react";
import { Input } from "antd";
import { formatMoney } from "../../logicTime/formatAll";

const ListTable = ({
  salaries,
  showModalSubsidies,
  showModalReward,
  fetchEmployeeAllowanceDetail,
  fetchEmployeeDeductionDetail,
  fetchEmployeeActualSalaryDetail,
  showModalAllowanceAll,
  showModalDeductions,
  showModalSalaryReceived,
}) => {
  return (
    <table className="list-table ">
      <thead>
        <tr>
          <td>MNV</td>
          <td>Họ và tên</td>
          <td>
            Lương chính
            <div className="detail-icon">
              Chi tiết
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M11.1867 8.0019C11.1867 9.3219 10.12 10.3886 8.8 10.3886C7.48 10.3886 6.41333 9.3219 6.41333 8.0019C6.41333 6.6819 7.48 5.61523 8.8 5.61523C10.12 5.61523 11.1867 6.6819 11.1867 8.0019Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.80019 13.5118C11.1535 13.5118 13.3469 12.1252 14.8735 9.72518C15.4735 8.78518 15.4735 7.20518 14.8735 6.26518C13.3469 3.86518 11.1535 2.47852 8.80019 2.47852C6.44686 2.47852 4.25352 3.86518 2.72686 6.26518C2.12686 7.20518 2.12686 8.78518 2.72686 9.72518C4.25352 12.1252 6.44686 13.5118 8.80019 13.5118Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </td>
          <td>
            Phụ cấp
            <div className="detail-icon" onClick={showModalAllowanceAll}>
              Chi tiết
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M11.1867 8.0019C11.1867 9.3219 10.12 10.3886 8.8 10.3886C7.48 10.3886 6.41333 9.3219 6.41333 8.0019C6.41333 6.6819 7.48 5.61523 8.8 5.61523C10.12 5.61523 11.1867 6.6819 11.1867 8.0019Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.80019 13.5118C11.1535 13.5118 13.3469 12.1252 14.8735 9.72518C15.4735 8.78518 15.4735 7.20518 14.8735 6.26518C13.3469 3.86518 11.1535 2.47852 8.80019 2.47852C6.44686 2.47852 4.25352 3.86518 2.72686 6.26518C2.12686 7.20518 2.12686 8.78518 2.72686 9.72518C4.25352 12.1252 6.44686 13.5118 8.80019 13.5118Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </td>
          <td>
            Khoản giảm trừ{" "}
            <div className="detail-icon" onClick={showModalDeductions}>
              Chi tiết
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M11.1867 8.0019C11.1867 9.3219 10.12 10.3886 8.8 10.3886C7.48 10.3886 6.41333 9.3219 6.41333 8.0019C6.41333 6.6819 7.48 5.61523 8.8 5.61523C10.12 5.61523 11.1867 6.6819 11.1867 8.0019Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.80019 13.5118C11.1535 13.5118 13.3469 12.1252 14.8735 9.72518C15.4735 8.78518 15.4735 7.20518 14.8735 6.26518C13.3469 3.86518 11.1535 2.47852 8.80019 2.47852C6.44686 2.47852 4.25352 3.86518 2.72686 6.26518C2.12686 7.20518 2.12686 8.78518 2.72686 9.72518C4.25352 12.1252 6.44686 13.5118 8.80019 13.5118Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </td>
          <td>
            Lương thực nhận{" "}
            <div className="detail-icon" onClick={showModalSalaryReceived}>
              Chi tiết
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M11.1867 8.0019C11.1867 9.3219 10.12 10.3886 8.8 10.3886C7.48 10.3886 6.41333 9.3219 6.41333 8.0019C6.41333 6.6819 7.48 5.61523 8.8 5.61523C10.12 5.61523 11.1867 6.6819 11.1867 8.0019Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.80019 13.5118C11.1535 13.5118 13.3469 12.1252 14.8735 9.72518C15.4735 8.78518 15.4735 7.20518 14.8735 6.26518C13.3469 3.86518 11.1535 2.47852 8.80019 2.47852C6.44686 2.47852 4.25352 3.86518 2.72686 6.26518C2.12686 7.20518 2.12686 8.78518 2.72686 9.72518C4.25352 12.1252 6.44686 13.5118 8.80019 13.5118Z"
                  stroke="#F7D629"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </td>
        </tr>
      </thead>
      {salaries.length === 0 ? (
        <p>Thông tin sẵn sàng hoặc không tồn tại.</p>
      ) : (
        <tbody className="body-payroll-scroll scrollbar" id="style-15">
          {salaries.map((Salary, index) => (
            <tr>
              <td>{Salary.employeeIDstring}</td>
              <td>{Salary.employeeName}</td>
              <td>
                {Salary.mainSalary === 0 ? "0" : formatMoney(Salary.mainSalary)}{" "}
                VNĐ{" "}
                
              </td>
              <td
                onClick={() => fetchEmployeeAllowanceDetail(Salary.employeeID)}
              >
                {Salary.allowances === 0 ? "0" : formatMoney(Salary.allowances)}{" "}
                VNĐ{" "}
              </td>
              <td
                onClick={() => fetchEmployeeDeductionDetail(Salary.employeeID)}
              >
                {Salary.deductions === 0 ? "0" : formatMoney(Salary.deductions)}{" "}
                VNĐ{" "}
              </td>
              <td
                onClick={() =>
                  fetchEmployeeActualSalaryDetail(Salary.employeeID)
                }
              >
                {Salary.actualSalary === 0
                  ? "0"
                  : formatMoney(Salary.actualSalary)}{" "}
                VNĐ{" "}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default ListTable;
