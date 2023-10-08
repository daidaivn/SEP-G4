import React, { useState, useEffect } from "react";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import { Switch, Form } from "antd";
import { fetchAllDepadment } from "../../sevices/DepartmentService";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";
import { fetchAllRole } from "../../sevices/RoleService";

function Role() {
  const [role, setRole] = useState([]);

  useEffect(() => {
    // Sử dụng fetchAllDepadment để tải dữ liệu từ API
    fetchAllRole()
      .then((data) => {
        setRole(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu phòng ban:", error);
      });
  }, []);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách chức vụ</h2>
            <span>Hiển thị các chức vụ có trong xưởng mộc</span>
          </div>
          <MenuResponsive />
          <ListUserHeader />
        </div>
        <Filter />
        <div className="list-text-header-res">
          <h2>Danh sách chức vụ</h2>
          <span>Hiển thị các chức vụ có trong xưởng mộc</span>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Chức vụ</td>
              <td>Số thành viên chức vụ</td>
              <td>Trạng thái</td>
            </tr>
          </thead>
          <tbody class="scrollbar" id="style-15">
            {role.map((role, index) => (
              <tr key={role.roleID}>
                <td>{index + 1}</td>
                <td>{role.roleName}</td>
                <td>{role.employees.length}</td>
                <td>
                  <Form.Item valuePropName="checked">
                    <Switch checked={role.status} />
                  </Form.Item>
                </td>
              </tr>
            ))}
            <tr>
              <td>1</td>
              <td>Kế toán</td>
              <td>2</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Kế toán</td>
              <td>2</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Kế toán</td>
              <td>2</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Kế toán</td>
              <td>2</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Role;
