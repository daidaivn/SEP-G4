import "../scss/reset.scss";
import "../scss/responsive.scss";
import "../scss/ListEmployeeComponent.scss";
import { Input, Switch, Form } from "antd";
import { Col, Row } from "antd";
import user from "../assets/images/Ellipse 69.svg";
import notification from "../assets/images/icons/notification.svg";
import { Select } from "antd";
import add from "../assets/images/icons/Frame 16.svg";
import user1 from "../assets/images/Ellipse 72.svg";
import userDetail from "../assets/images/Ellipse 73.svg";
import { Button, Modal } from "antd";
import { Radio } from "antd";
import React, { useState, useEffect } from 'react';
import { fetchAllEmplyee } from "../../sevices/EmployeeService";
import Table from 'react-bootstrap/Table';


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
        console.error('Error fetching data:', error);
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
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
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
            <i></i>
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
              <tr key={employees.employeesId}>
                <td>{index + 1}</td>
                <td>{employees.employeesName}</td>
                <td>{employees.number}</td>
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
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr   onClick={showModal}>
              <td>?</td>
              <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr  onClick={showModal}>
              <td>?</td>
              <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>trưởng phòng</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr  onClick={showModal}>
              <td>?</td>
              <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr  onClick={showModal}>
              <td>?</td>
              <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
            </tr>
            <tr  onClick={showModal}>
              <td>?</td>
              <td>Nguyễn Văn An</td>
            <td>Nam</td>
            <td>0123456789</td>
            <td>Nhân viên</td>
              <td><Form.Item valuePropName="checked">
                <Switch checked="true" />
              </Form.Item></td>
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
