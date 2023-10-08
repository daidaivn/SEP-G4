import React, { useState, useEffect } from "react";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import { Switch, Form } from "antd";
import { fetchAllDepadment } from "../../sevices/DepartmentService";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";

function ListDepartmentComponent() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Sử dụng fetchAllDepadment để tải dữ liệu từ API
    fetchAllDepadment()
      .then((data) => {
        setDepartments(data);
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
            <h2>Danh sách phòng - ban</h2>
            <span>Hiển thị thông tin chi tiết phòng - ban trong xưởng mộc</span>
          </div>
          <MenuResponsive />
          <ListUserHeader />
        </div>
        <Filter />
        <div className="list-text-header-res">
          <h2>Danh sách phòng - ban</h2>
          <span>Hiển thị thông tin chi tiết phòng - ban trong xưởng mộc</span>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td>STT</td>
            </tr>
          </thead>
          <tbody class="scrollbar" id="style-15">
            {departments.map((department, index) => (
              <tr key={department.departmentId}>
                <td>{index + 1}</td>
                <td>{department.departmentName}</td>
                <td>{department.number}</td>
                <td>
                  <Form.Item valuePropName="checked">
                    <Switch checked={department.status} />
                  </Form.Item>
                </td>
              </tr>
            ))}
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
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

export default ListDepartmentComponent;
