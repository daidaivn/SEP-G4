import React from "react";
import { Input } from "antd";

const ListTable = ({
  salaries,
  showModalSubsidies,
  showModalReward,
  fetchEmployeeAllowanceDetail,
  fetchEmployeeDeductionDetail,
  fetchEmployeeActualSalaryDetail
}) => {


  return (
    <table className="list-table ">
      <thead>
        <tr>
          <td>MNV</td>
          <td>Họ và tên</td>
          <td>Lương chính</td>
          <td>Phụ cấp</td>
          <td>Khoản giảm trừ</td>
          <td>Lương thực nhận</td>
        </tr>
      </thead>
      {salaries.length === 0 ? (
        <p>Thông tin sẵn sàng hoặc không tồn tại.</p>
      ) : (
        <tbody className="scrollbar" id="style-15">
          {salaries.map((Salary, index) => (
            <tr>
              <td>{Salary.employeeIDstring}</td>
              <td>{Salary.employeeName}</td>
              <td>
                {Salary.mainSalary === 0 ? "-" : Salary.mainSalary} VNĐ{" "}
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
              <td onClick={()=> fetchEmployeeAllowanceDetail(Salary.employeeID)}>
                {Salary.allowances === 0 ? "-" : Salary.allowances} VNĐ{" "}
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
              <td onClick={()=> fetchEmployeeDeductionDetail(Salary.employeeID)}>
                {Salary.deductions === 0 ? "-" : Salary.deductions}VNĐ{" "}
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
              <td onClick={()=> fetchEmployeeActualSalaryDetail(Salary.employeeID)}>
                {Salary.actualSalary === 0 ? "-" : Salary.actualSalary} VNĐ{" "}
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
