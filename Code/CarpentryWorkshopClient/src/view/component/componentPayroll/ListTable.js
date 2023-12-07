import React from "react";
import { Input } from "antd";
import { formatMoney } from "../../logicTime/formatAll";

const ListTable = ({
  salaryDetail,
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
      {salaryDetail.length === 0 ? (
        <p>Thông tin sẵn sàng hoặc không tồn tại.</p>
      ) : (
        <tbody className="scrollbar" id="style-15">
          {salaryDetail.map((Salary, index) => (
            <tr>
              <td>{Salary.employeeId}</td>
              <td>{Salary.fullName}</td>
              <td>
                {Salary.actualDaySalary === 0 ? "0" : formatMoney(Salary.actualDaySalary)}{" "}
                VNĐ{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                >
                  <path
                    d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </td>
              {/* show Modal Chi tiết phụ cấp */}
              <td
                onClick={() => fetchEmployeeAllowanceDetail(Salary.employeeId)}
              >
                {Salary.allowances.meal + Salary.allowances.uniform + Salary.allowances.petrol  === 0 ? "0" : formatMoney(Salary.allowances.meal + Salary.allowances.uniform + Salary.allowances.petrol)}{" "}
                VNĐ{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                >
                  <path
                    d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </td>
              {/* show Modal Chi tiết khoản giảm trừ */}
              <td
                onClick={() => fetchEmployeeDeductionDetail(Salary.employeeId)}
              >
                {Salary.deductions.socialInsurance + Salary.deductions.healthInsurance + Salary.deductions.unemploymentInsurance + Salary.deductions.unionFees === 0 ? "0" : formatMoney(Salary.deductions.socialInsurance + Salary.deductions.healthInsurance + Salary.deductions.unemploymentInsurance + Salary.deductions.unionFees)}{" "}
                VNĐ{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                >
                  <path
                    d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </td>
              {/* show Modal Chi tiết thưởng */}
              <td
                onClick={() =>
                  fetchEmployeeActualSalaryDetail(Salary.employeeId)
                }
              >
                {Salary.jobIncentives === 0
                  ? "0"
                  : formatMoney(Salary.jobIncentives)}{" "}
                VNĐ{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                >
                  <path
                    d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                    stroke="#FF8F19"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default ListTable;
