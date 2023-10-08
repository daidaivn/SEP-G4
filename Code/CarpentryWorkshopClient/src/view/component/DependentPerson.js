import React, { useState, useEffect } from "react";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import { Switch, Form } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";
import { fetchAllDependent } from "../../sevices/DependentPersonService";

function DependentPerson() {
  const [dependent, setDependent] = useState([]);

  useEffect(() => {
    // Sử dụng fetchAllDepadment để tải dữ liệu từ API
    fetchAllDependent()
      .then((data) => {
        setDependent(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu ", error);
      });
  }, []);
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách người phụ thuộc</h2>
            <span>
              Hiển thị thông tin của tất các các người phụ thuộc của người lao
              động trong xưởng mộc
            </span>
          </div>
          <MenuResponsive />
          <ListUserHeader />
        </div>
        <Filter />
        <div className="list-text-header-res">
          <h2>Danh sách người phụ thuộc</h2>
          <span>
            Hiển thị thông tin của tất các các người phụ thuộc của người lao
            động trong xưởng mộc
          </span>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Họ và tên</td>
              <td>Giới tính</td>
              <td>Mã định danh</td>
              <td>Trạng thái</td>
            </tr>
          </thead>
          <tbody class="scrollbar" id="style-15">
            {dependent.map((dependent, index) => (
              <tr key={dependent.dependentId}>
                <td>{index + 1}</td>
                <td>{dependent.fullName}</td>
                <td>{dependent.genderString}</td>
                <td>{dependent.identifierCode}</td>
                <td>
                  <Form.Item valuePropName="checked">
                    <Switch checked={dependent.status} />
                  </Form.Item>
                </td>
              </tr>
            ))}
            <tr>
              <td>1</td>
              <td>Lê Văn Toàn</td>
              <td>Nam</td>
              <td>234567891</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lê Văn Toàn</td>
              <td>Nam</td>
              <td>234567891</td>
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

export default DependentPerson;
