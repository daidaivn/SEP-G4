import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/ListEmployeeComponent.scss";
import "../scss/responsive/responsive.scss";
import "../scss/responsive/ListEmployee.scss";
import { Input, Switch, Form } from "antd";
import { Col, Row } from "antd";
import user from "../assets/images/Ellipse 69.svg";
import notification from "../assets/images/icons/notification.svg";
import userDetail from "../assets/images/Ellipse 73.svg";
import { Modal } from "antd";
import { Radio } from "antd";
import React, { useState, useEffect } from "react";
import { fetchAllEmplyee } from "../../sevices/EmployeeService";
import profile from "../assets/images/Ellipse 72.svg";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";

function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Gọi hàm fetchAllEmplyee để lấy dữ liệu từ API khi component được mount
    fetchAllEmplyee()
      .then((response) => {
        // Lưu dữ liệu nhân viên vào state
        setEmployees(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [value, setValue] = useState(1);
  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="col-right-container">
      <div className="list-container-header">
        <div className="list-text-header">
          <h2>Danh sách nhân viên</h2>
          <span>
            Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc
          </span>
        </div>
        <MenuResponsive />
        <div className="list-user-header">
          <span>User</span>
          <img className="user-list" src={user} alt="" />
          <img className="notification-list" src={notification} alt="" />
        </div>
      </div>
      <Filter />
      <div className="list-text-header-res">
        <h2>Danh sách nhân viên</h2>
        <span>
          Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc
        </span>
      </div>
      {employees.map((employees, index) => (
        <div className="info-responsive" key={employees.employeesId}>
          <div className="info-detail-res">
            <div className="info-head-res">
              <img src={profile} alt="" />
              <div className="info-name-gender">
                <h2>{employees.fullName}</h2>
                <p>Giới tính: {employees.gender}</p>
              </div>
            </div>

            <div className="info-body-res">
              <div className="phone-res">
                <div className="icon-phone-res">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.36665 9.96659L6.13331 11.1999C5.87331 11.4599 5.45998 11.4599 5.19331 11.2066C5.11998 11.1333 5.04665 11.0666 4.97331 10.9933C4.28665 10.2999 3.66665 9.57325 3.11331 8.81325C2.56665 8.05325 2.12665 7.29325 1.80665 6.53992C1.49331 5.77992 1.33331 5.05325 1.33331 4.35992C1.33331 3.90659 1.41331 3.47325 1.57331 3.07325C1.73331 2.66659 1.98665 2.29325 2.33998 1.95992C2.76665 1.53992 3.23331 1.33325 3.72665 1.33325C3.91331 1.33325 4.09998 1.37325 4.26665 1.45325C4.43998 1.53325 4.59331 1.65325 4.71331 1.82659L6.25998 4.00659C6.37998 4.17325 6.46665 4.32659 6.52665 4.47325C6.58665 4.61325 6.61998 4.75325 6.61998 4.87992C6.61998 5.03992 6.57331 5.19992 6.47998 5.35325C6.39331 5.50659 6.26665 5.66659 6.10665 5.82659L5.59998 6.35325C5.52665 6.42659 5.49331 6.51325 5.49331 6.61992C5.49331 6.67325 5.49998 6.71992 5.51331 6.77325C5.53331 6.82659 5.55331 6.86659 5.56665 6.90659C5.68665 7.12659 5.89331 7.41325 6.18665 7.75992C6.48665 8.10659 6.80665 8.45992 7.15331 8.81325C7.21998 8.87992 7.29331 8.94659 7.35998 9.01325C7.62665 9.27325 7.63331 9.69992 7.36665 9.96659Z"
                      fill="#386641"
                    />
                    <path
                      d="M14.6467 12.2201C14.6467 12.4068 14.6134 12.6001 14.5467 12.7868C14.5267 12.8401 14.5067 12.8934 14.48 12.9468C14.3667 13.1868 14.22 13.4134 14.0267 13.6268C13.7 13.9868 13.34 14.2468 12.9334 14.4134C12.9267 14.4134 12.92 14.4201 12.9134 14.4201C12.52 14.5801 12.0934 14.6668 11.6334 14.6668C10.9534 14.6668 10.2267 14.5068 9.46002 14.1801C8.69336 13.8534 7.92669 13.4134 7.16669 12.8601C6.90669 12.6668 6.64669 12.4734 6.40002 12.2668L8.58002 10.0868C8.76669 10.2268 8.93336 10.3334 9.07336 10.4068C9.10669 10.4201 9.14669 10.4401 9.19336 10.4601C9.24669 10.4801 9.30002 10.4868 9.36002 10.4868C9.47336 10.4868 9.56002 10.4468 9.63336 10.3734L10.14 9.87344C10.3067 9.70677 10.4667 9.58011 10.62 9.50011C10.7734 9.40677 10.9267 9.36011 11.0934 9.36011C11.22 9.36011 11.3534 9.38677 11.5 9.44677C11.6467 9.50677 11.8 9.59344 11.9667 9.70677L14.1734 11.2734C14.3467 11.3934 14.4667 11.5334 14.54 11.7001C14.6067 11.8668 14.6467 12.0334 14.6467 12.2201Z"
                      fill="#386641"
                    />
                  </svg>
                </div>
                <p>{employees.phoneNumber}</p>
              </div>
              <div className="role-res">
                <div className="icon-role-res">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M14.0602 4.65326C13.4935 4.0266 12.5469 3.71327 11.1735 3.71327H11.0135V3.6866C11.0135 2.5666 11.0135 1.17993 8.50685 1.17993H7.49352C4.98685 1.17993 4.98685 2.57327 4.98685 3.6866V3.71993H4.82685C3.44685 3.71993 2.50685 4.03326 1.94019 4.65993C1.28019 5.39326 1.30019 6.37993 1.36685 7.05326L1.37352 7.09993L1.41764 7.56321C1.43191 7.71299 1.51266 7.84843 1.63881 7.93041C1.79917 8.03461 2.02039 8.1756 2.16019 8.25327C2.25352 8.31327 2.35352 8.3666 2.45352 8.41993C3.59352 9.0466 4.84685 9.4666 6.12019 9.67327C6.18019 10.2999 6.45352 11.0333 7.91352 11.0333C9.37352 11.0333 9.66019 10.3066 9.70685 9.65993C11.0669 9.43993 12.3802 8.9666 13.5669 8.27326C13.6069 8.25326 13.6335 8.23326 13.6669 8.21326C13.9106 8.07549 14.1628 7.90823 14.3966 7.74162C14.5101 7.66075 14.5823 7.53452 14.5977 7.39601L14.6002 7.37327L14.6335 7.05993C14.6402 7.01993 14.6402 6.9866 14.6469 6.93993C14.7002 6.2666 14.6869 5.3466 14.0602 4.65326ZM8.72685 9.21993C8.72685 9.9266 8.72685 10.0333 7.90685 10.0333C7.08685 10.0333 7.08685 9.9066 7.08685 9.2266V8.3866H8.72685V9.21993ZM5.94019 3.71327V3.6866C5.94019 2.55327 5.94019 2.13327 7.49352 2.13327H8.50685C10.0602 2.13327 10.0602 2.55993 10.0602 3.6866V3.71993H5.94019V3.71327Z"
                      fill="#386641"
                    />
                    <path
                      d="M13.6456 9.28368C14.0003 9.11776 14.4077 9.39865 14.3723 9.78863L14.1601 12.1268C14.0201 13.4601 13.4734 14.8201 10.5401 14.8201H5.46006C2.52672 14.8201 1.98006 13.4601 1.84006 12.1335L1.63935 9.92564C1.6043 9.54018 2.00224 9.25964 2.35586 9.41698C3.11559 9.755 4.25609 10.2379 5.02976 10.4541C5.19335 10.4998 5.32589 10.6182 5.40399 10.7691C5.82484 11.5819 6.68651 12.0135 7.91339 12.0135C9.12824 12.0135 9.99996 11.5652 10.4226 10.7493C10.5008 10.5983 10.6338 10.4799 10.7975 10.4338C11.6223 10.2014 12.8451 9.65815 13.6456 9.28368Z"
                      fill="#386641"
                    />
                  </svg>
                </div>
                <p>{employees.roles + " | "}</p>
              </div>
              <div className="active-res">
                <div>
                  <Form.Item valuePropName="checked">
                    <Switch checked={employees.status} />
                  </Form.Item>
                </div>
                <p>Đang hoạt động</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="info-responsive">
        <div className="info-detail-res">
          <div className="info-head-res">
            <img src={profile} alt="" />
            <div className="info-name-gender">
              <h2>Nguyễn Văn An</h2>
              <p>Giới tính: Nam</p>
            </div>
          </div>

          <div className="info-body-res">
            <div className="phone-res">
              <div className="icon-phone-res">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.36665 9.96659L6.13331 11.1999C5.87331 11.4599 5.45998 11.4599 5.19331 11.2066C5.11998 11.1333 5.04665 11.0666 4.97331 10.9933C4.28665 10.2999 3.66665 9.57325 3.11331 8.81325C2.56665 8.05325 2.12665 7.29325 1.80665 6.53992C1.49331 5.77992 1.33331 5.05325 1.33331 4.35992C1.33331 3.90659 1.41331 3.47325 1.57331 3.07325C1.73331 2.66659 1.98665 2.29325 2.33998 1.95992C2.76665 1.53992 3.23331 1.33325 3.72665 1.33325C3.91331 1.33325 4.09998 1.37325 4.26665 1.45325C4.43998 1.53325 4.59331 1.65325 4.71331 1.82659L6.25998 4.00659C6.37998 4.17325 6.46665 4.32659 6.52665 4.47325C6.58665 4.61325 6.61998 4.75325 6.61998 4.87992C6.61998 5.03992 6.57331 5.19992 6.47998 5.35325C6.39331 5.50659 6.26665 5.66659 6.10665 5.82659L5.59998 6.35325C5.52665 6.42659 5.49331 6.51325 5.49331 6.61992C5.49331 6.67325 5.49998 6.71992 5.51331 6.77325C5.53331 6.82659 5.55331 6.86659 5.56665 6.90659C5.68665 7.12659 5.89331 7.41325 6.18665 7.75992C6.48665 8.10659 6.80665 8.45992 7.15331 8.81325C7.21998 8.87992 7.29331 8.94659 7.35998 9.01325C7.62665 9.27325 7.63331 9.69992 7.36665 9.96659Z"
                    fill="#386641"
                  />
                  <path
                    d="M14.6467 12.2201C14.6467 12.4068 14.6134 12.6001 14.5467 12.7868C14.5267 12.8401 14.5067 12.8934 14.48 12.9468C14.3667 13.1868 14.22 13.4134 14.0267 13.6268C13.7 13.9868 13.34 14.2468 12.9334 14.4134C12.9267 14.4134 12.92 14.4201 12.9134 14.4201C12.52 14.5801 12.0934 14.6668 11.6334 14.6668C10.9534 14.6668 10.2267 14.5068 9.46002 14.1801C8.69336 13.8534 7.92669 13.4134 7.16669 12.8601C6.90669 12.6668 6.64669 12.4734 6.40002 12.2668L8.58002 10.0868C8.76669 10.2268 8.93336 10.3334 9.07336 10.4068C9.10669 10.4201 9.14669 10.4401 9.19336 10.4601C9.24669 10.4801 9.30002 10.4868 9.36002 10.4868C9.47336 10.4868 9.56002 10.4468 9.63336 10.3734L10.14 9.87344C10.3067 9.70677 10.4667 9.58011 10.62 9.50011C10.7734 9.40677 10.9267 9.36011 11.0934 9.36011C11.22 9.36011 11.3534 9.38677 11.5 9.44677C11.6467 9.50677 11.8 9.59344 11.9667 9.70677L14.1734 11.2734C14.3467 11.3934 14.4667 11.5334 14.54 11.7001C14.6067 11.8668 14.6467 12.0334 14.6467 12.2201Z"
                    fill="#386641"
                  />
                </svg>
              </div>
              <p>0123456789</p>
            </div>
            <div className="role-res">
              <div className="icon-role-res">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14.0602 4.65326C13.4935 4.0266 12.5469 3.71327 11.1735 3.71327H11.0135V3.6866C11.0135 2.5666 11.0135 1.17993 8.50685 1.17993H7.49352C4.98685 1.17993 4.98685 2.57327 4.98685 3.6866V3.71993H4.82685C3.44685 3.71993 2.50685 4.03326 1.94019 4.65993C1.28019 5.39326 1.30019 6.37993 1.36685 7.05326L1.37352 7.09993L1.41764 7.56321C1.43191 7.71299 1.51266 7.84843 1.63881 7.93041C1.79917 8.03461 2.02039 8.1756 2.16019 8.25327C2.25352 8.31327 2.35352 8.3666 2.45352 8.41993C3.59352 9.0466 4.84685 9.4666 6.12019 9.67327C6.18019 10.2999 6.45352 11.0333 7.91352 11.0333C9.37352 11.0333 9.66019 10.3066 9.70685 9.65993C11.0669 9.43993 12.3802 8.9666 13.5669 8.27326C13.6069 8.25326 13.6335 8.23326 13.6669 8.21326C13.9106 8.07549 14.1628 7.90823 14.3966 7.74162C14.5101 7.66075 14.5823 7.53452 14.5977 7.39601L14.6002 7.37327L14.6335 7.05993C14.6402 7.01993 14.6402 6.9866 14.6469 6.93993C14.7002 6.2666 14.6869 5.3466 14.0602 4.65326ZM8.72685 9.21993C8.72685 9.9266 8.72685 10.0333 7.90685 10.0333C7.08685 10.0333 7.08685 9.9066 7.08685 9.2266V8.3866H8.72685V9.21993ZM5.94019 3.71327V3.6866C5.94019 2.55327 5.94019 2.13327 7.49352 2.13327H8.50685C10.0602 2.13327 10.0602 2.55993 10.0602 3.6866V3.71993H5.94019V3.71327Z"
                    fill="#386641"
                  />
                  <path
                    d="M13.6456 9.28368C14.0003 9.11776 14.4077 9.39865 14.3723 9.78863L14.1601 12.1268C14.0201 13.4601 13.4734 14.8201 10.5401 14.8201H5.46006C2.52672 14.8201 1.98006 13.4601 1.84006 12.1335L1.63935 9.92564C1.6043 9.54018 2.00224 9.25964 2.35586 9.41698C3.11559 9.755 4.25609 10.2379 5.02976 10.4541C5.19335 10.4998 5.32589 10.6182 5.40399 10.7691C5.82484 11.5819 6.68651 12.0135 7.91339 12.0135C9.12824 12.0135 9.99996 11.5652 10.4226 10.7493C10.5008 10.5983 10.6338 10.4799 10.7975 10.4338C11.6223 10.2014 12.8451 9.65815 13.6456 9.28368Z"
                    fill="#386641"
                  />
                </svg>
              </div>
              <p>Nhân viên</p>
            </div>
            <div className="active-res">
              <div>
                <Form.Item valuePropName="checked">
                  <Switch checked="true" />
                </Form.Item>
              </div>
              <p>Đang hoạt động</p>
            </div>
          </div>
        </div>
      </div>
      <table className="list-table">
        <thead>
          <tr>
            <td>Ảnh</td>
            <td>Họ và tên</td>
            <td>Giới tính</td>
            <td>Số điện thoại</td>
            <td>Chức vụ</td>
            <td>Trạng thái</td>
          </tr>
        </thead>
        <tbody class="scrollbar" id="style-15">
          {employees.map((employees, index) => (
            <tr key={employees.employeesId} onClick={showModal}>
              <td>{index + 1}</td>
              <td>{employees.fullName}</td>
              <td>{employees.gender}</td>
              <td>{employees.phoneNumber}</td>
              <td>{employees.roles.join(" - ")}</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked={employees.status} />
                </Form.Item>
              </td>
            </tr>
          ))}
          <tr onClick={showModal}>
            <td>?</td>
            <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>trưởng phòng</td>
            <td>
              <Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item>
            </td>
          </tr>
          <tr onClick={showModal}>
            <td>?</td>
            <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
            <td>
              <Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item>
            </td>
          </tr>
          <tr onClick={showModal}>
            <td>?</td>
            <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>trưởng phòng</td>
            <td>
              <Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item>
            </td>
          </tr>
          <tr onClick={showModal}>
            <td>?</td>
            <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
            <td>
              <Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item>
            </td>
          </tr>
          <tr onClick={showModal}>
            <td>?</td>
            <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
            <td>
              <Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item>
            </td>
          </tr>
          <tr onClick={showModal}>
            <td>?</td>
            <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
            <td>
              <Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal
        className="modal"
        open={isModalOpen}
        on
        Ok={handleOk}
        onCancel={handleCancel}
        width={1252}
      >
        <div className="modal-head"></div>
        <div className="modal-body">
          <div className="avatar">
            <div className="img-avatar">
              <img src={userDetail} alt="" />
            </div>
            <div className="name-avatar">
              <h2>Nguyễn Văn An</h2>
              <div className="activiti">
                <Form.Item valuePropName="checked">
                  <Switch />
                </Form.Item>
                <span>Đang hoạt động</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-info">
          <div className="info-detail">
            <span className="title-info">Thông tin cá nhân</span>
            <Row gutter={16}>
              <Col span={12}>
                <table className="table-info-detail">
                  <tbody>
                    <tr>
                      <th className="text">Họ và tên</th>
                      <td className="input-text">
                        <Input
                          placeholder="Basic usage"
                          value="Nguyễn Văn An"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="text">Giới tính</th>
                      <td className="input-text fix">
                        <Radio.Group onChange={onChangeRadio} value={value}>
                          <Radio value={1} className="gender">
                            Nam
                          </Radio>
                          <Radio value={2} className="gender">
                            Nữ
                          </Radio>
                        </Radio.Group>
                      </td>
                    </tr>
                    <tr>
                      <th className="text">Địa chỉ</th>
                      <td className="input-text">
                        <Input
                          placeholder="Basic usage"
                          value="123 Đường ABC"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="text">Số điện thoại</th>
                      <td className="input-text">
                        <Input placeholder="Basic usage" value="0123456789" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col span={12}>
                <table className="table-info-detail">
                  <tbody>
                    <tr>
                      <th className="text">CCCD</th>
                      <td className="input-text">
                        <Input placeholder="Basic usage" value="123456789" />
                      </td>
                    </tr>
                    <tr>
                      <th className="text">Chức vụ</th>
                      <td className="input-text">
                        <Input placeholder="Basic usage" value="Nhân viên" />
                      </td>
                    </tr>
                    <tr>
                      <th className="text">Mã số thuế</th>
                      <td className="input-text">
                        <Input placeholder="Basic usage" value="0987654321" />
                      </td>
                    </tr>
                    <tr>
                      <th className="text">Phòng ban</th>
                      <td className="input-text">
                        <Input
                          placeholder="Basic usage"
                          value="Phòng kế toán"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleCancel}>
            Hủy bỏ
          </button>
          <button className="btn-edit" onClick={handleOk}>
            Chỉnh sửa
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ListEmployeeComponent;
