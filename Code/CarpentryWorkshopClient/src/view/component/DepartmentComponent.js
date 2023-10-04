import React, { useState, useEffect } from "react";
import "../scss/index.scss"
import "../scss/DepartmentComponent.scss"
import user from "../assets/images/Ellipse 69.svg";
import notification from "../assets/images/icons/notification.svg";
import { Input, Switch, Form, Select } from "antd";
import { fetchAllDepadment } from "../../sevices/DepartmentService";

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
            <span>Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc</span>
          </div>
          <div className="list-user-header">
            <span>User</span>
            <img className="user-list" src={user} alt="" />
            <img className="notification-list" src={notification} alt="" />
          </div>
        </div>
        <div className="list-search-filter-add">
          <div className="list-input-search">
            <i ></i>
            <Input placeholder="Tìm kiếm" ></Input>
          </div>
          <div className="list-filter">
            <i className="list-filter-icon1"></i>
            <span>Bộ lọc</span>
            <i className="list-filter-icon2"></i>
          </div>
          <div className="list-add">
            <i></i>
          </div>
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
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr>
              <td>?</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListDepartmentComponent;  