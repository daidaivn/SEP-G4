import React from "react";
import { Switch, Form } from "antd";

function TableEmployee({
  employees,
  showModal,
  setId,
  handlelDetail,
  featchEmployeeContract,
}) {
  return (
    <table className="list-table" onClick={showModal}>
      <thead>
        <tr>
          <td>Ảnh</td>
          <td>MSNV</td>
          <td>Họ và tên</td>
          <td>Giới tính</td>
          <td>Số điện thoại</td>
          <td>Chức vụ</td>
          <td>Trạng thái</td>
        </tr>
      </thead>
      {employees.length === 0 ? (
        <p>Thông tin nhân viên chưa sẵn sàng hoặc không tồn tại.</p>
      ) : (
        <tbody className="scrollbar" id="style-15">
          {employees.map((employee, index) => (
            <tr
              key={employee.employeeID}
              onClick={() => {
                setId(employee.employeeID);
                handlelDetail(employee.employeeID);
                featchEmployeeContract(employee.employeeID);
              }}
            >
              <td>
                <img src={employee.image} alt="avt" loading="lazy"/>
              </td>
              <td>{employee.employeeIdstring}</td>
              <td>{employee.fullName}</td>
              <td>{employee.gender}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.roles}</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked={employee.status} />
                </Form.Item>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

export default TableEmployee;
