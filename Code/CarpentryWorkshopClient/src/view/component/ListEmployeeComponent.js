import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/ListEmployeeComponent.scss";
import "../scss/responsive/responsive.scss";
import "../scss/responsive/ListEmployee.scss";
import "../scss/fonts.scss";
import { Input, Switch, Form } from "antd";
import { Col, Row } from "antd";
import user from "../assets/images/Ellipse 69.svg";
import notification from "../assets/images/icons/notification.svg";
import userDetail from "../assets/images/Ellipse 73.svg";
import { Modal } from "antd";
import { Radio } from "antd";
import React, { useState, useEffect } from "react";
import { fetchAllEmplyee, fetchEmplyeebyid } from "../../sevices/EmployeeService";
import profile from "../assets/images/Ellipse 72.svg";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Select, Space } from "antd";
function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("Hà Nội");
  const [gender, setGender] = useState("Nguyễn Văn An"); // State cho họ và tên
  const [phone, setPhone] = useState("0899999577"); // State cho số điện thoại
  const [fax, setFax] = useState("0899999577");
  const [idCard, setIdCard] = useState("0899999577");
  const [role, setRole] = useState("Nhân viên");
  const [department, setDepartment] = useState("Phòng kế toán");
  const [employeeData, setEmployeeData] = useState(null);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    fetchAllEmplyee()
      .then((response) => {
        setEmployees(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    if (id !== null) {
      fetchEmplyeebyid(id)
        .then((response) => {
          setEmployeeData(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Option } = Select;
  const handleChangeAddEmployee = (value) => {
    console.log(`selected ${value}`);
  };
  const [value, setValue] = useState(1);
  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalDetail = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
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
        <ListUserHeader />
      </div>
      <div className="list-search-filter-add">
        <div className="list-input-search">
          <i className="icon-web">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="vuesax/linear/search-normal">
                <g id="search-normal">
                  <path
                    id="Vector"
                    d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
            </svg>
          </i>
          <i className="icon-responsive">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="vuesax/linear/search-normal">
                <g id="search-normal">
                  <path
                    id="Vector"
                    d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
            </svg>
          </i>
          <Input placeholder="Tìm kiếm"></Input>
        </div>
        <div className="list-filter">
          <i className="list-filter-icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
                stroke="#3A5A40"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.07 16.5201C17.8373 16.5201 19.27 15.0874 19.27 13.3201C19.27 11.5528 17.8373 10.1201 16.07 10.1201C14.3027 10.1201 12.87 11.5528 12.87 13.3201C12.87 15.0874 14.3027 16.5201 16.07 16.5201Z"
                stroke="#3A5A40"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.87 17.1201L18.87 16.1201"
                stroke="#3A5A40"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </i>
          <Select
            className="select-input"
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
              },
            ]}
          />
        </div>
        <i className="icon-responsive icon-filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M7.15979 9.53513C7.15979 9.84013 6.95977 10.2401 6.70477 10.3951L5.99979 10.8501C5.34479 11.2551 4.43478 10.8001 4.43478 9.99013V7.31512C4.43478 6.96012 4.23479 6.50513 4.02979 6.25513L2.10977 4.23512C1.85477 3.98012 1.65479 3.53013 1.65479 3.22513V2.06512C1.65479 1.46012 2.10979 1.00513 2.66479 1.00513H9.33478C9.88978 1.00513 10.3448 1.46012 10.3448 2.01512V3.12512C10.3448 3.53012 10.0898 4.03513 9.83978 4.28513"
              stroke="white"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.03506 8.26006C8.91872 8.26006 9.63507 7.54372 9.63507 6.66006C9.63507 5.77641 8.91872 5.06006 8.03506 5.06006C7.15141 5.06006 6.43506 5.77641 6.43506 6.66006C6.43506 7.54372 7.15141 8.26006 8.03506 8.26006Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.93506 8.56006L9.43506 8.06006"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
        <div className="list-add" onClick={showModalAdd}>
          <i className="icon-web">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M20.8745 16.75H18.6245V14.5C18.6245 14.09 18.2845 13.75 17.8745 13.75C17.4645 13.75 17.1245 14.09 17.1245 14.5V16.75H14.8745C14.4645 16.75 14.1245 17.09 14.1245 17.5C14.1245 17.91 14.4645 18.25 14.8745 18.25H17.1245V20.5C17.1245 20.91 17.4645 21.25 17.8745 21.25C18.2845 21.25 18.6245 20.91 18.6245 20.5V18.25H20.8745C21.2845 18.25 21.6245 17.91 21.6245 17.5C21.6245 17.09 21.2845 16.75 20.8745 16.75Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M22.3745 8.52V3.98C22.3745 2.57 21.7345 2 20.1445 2H16.1045C14.5145 2 13.8745 2.57 13.8745 3.98V8.51C13.8745 9.93 14.5145 10.49 16.1045 10.49H20.1445C21.7345 10.5 22.3745 9.93 22.3745 8.52Z"
                fill="white"
              />
              <path
                d="M10.8745 8.52V3.98C10.8745 2.57 10.2345 2 8.64451 2H4.60451C3.01451 2 2.37451 2.57 2.37451 3.98V8.51C2.37451 9.93 3.01451 10.49 4.60451 10.49H8.64451C10.2345 10.5 10.8745 9.93 10.8745 8.52Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M10.8745 19.77V15.73C10.8745 14.14 10.2345 13.5 8.64451 13.5H4.60451C3.01451 13.5 2.37451 14.14 2.37451 15.73V19.77C2.37451 21.36 3.01451 22 4.60451 22H8.64451C10.2345 22 10.8745 21.36 10.8745 19.77Z"
                fill="white"
              />
            </svg>
          </i>
        </div>
        <Modal
          className="modal"
          open={isModalOpenAdd}
          on
          Ok={handleOkAdd}
          onCancel={handleCancelAdd}
          width={1252}
        >
          <div className="modal-head">
            <h3>Thông tin cá nhân</h3>
          </div>
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
                        <th className="text">Số điện thoại</th>
                        <td className="input-text">
                          <Input placeholder="Basic usage" value="0123456789" />
                        </td>
                      </tr>
                      <tr>
                        <th className="text">CCCD</th>
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
                        <th className="text">Mã số thuế</th>
                        <td className="input-text">
                          <Input placeholder="Basic usage" value="123456789" />
                        </td>
                      </tr>
                      <tr>
                        <th className="text">Chức vụ</th>
                        <td className="input-text">
                          <Select
                            className="select-input"
                            mode="multiple"
                            style={{
                              width: "100%",
                            }}
                            defaultValue={["china"]}
                            onChange={handleChange}
                            optionLabelProp="label"
                          >
                            <Option value="china" label="China">
                              <Space>China</Space>
                            </Option>
                            <Option value="usa" label="USA">
                              <Space>USA</Space>
                            </Option>
                            <Option value="japan" label="Japan">
                              <Space>Japan</Space>
                            </Option>
                            <Option value="korea" label="Korea">
                              <Space>Korea</Space>
                            </Option>
                          </Select>
                        </td>
                      </tr>

                      <tr>
                        <th className="text">Phòng ban</th>
                        <td className="input-text">
                          <Select
                            className="select-input"
                            mode="multiple"
                            style={{
                              width: "100%",
                            }}
                            defaultValue={["china"]}
                            onChange={handleChange}
                            optionLabelProp="label"
                          >
                            <Option value="china" label="China">
                              <Space>China</Space>
                            </Option>
                            <Option value="usa" label="USA">
                              <Space>USA</Space>
                            </Option>
                            <Option value="japan" label="Japan">
                              <Space>Japan</Space>
                            </Option>
                            <Option value="korea" label="Korea">
                              <Space>Korea</Space>
                            </Option>
                          </Select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={handleCancelAdd}>
              Hủy bỏ
            </button>
            <button className="btn-edit btn-save" onClick={handleOkAdd}>
              Lưu
            </button>
          </div>
        </Modal>
        <i className="icon-responsive icon-filter icon-add">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M8.48719 6.94879H7.56411V6.02571C7.56411 5.8575 7.42462 5.71802 7.25642 5.71802C7.08821 5.71802 6.94873 5.8575 6.94873 6.02571V6.94879H6.02565C5.85744 6.94879 5.71796 7.08827 5.71796 7.25648C5.71796 7.42468 5.85744 7.56417 6.02565 7.56417H6.94873V8.48725C6.94873 8.65545 7.08821 8.79494 7.25642 8.79494C7.42462 8.79494 7.56411 8.65545 7.56411 8.48725V7.56417H8.48719C8.65539 7.56417 8.79488 7.42468 8.79488 7.25648C8.79488 7.08827 8.65539 6.94879 8.48719 6.94879Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M9.10254 3.57233V1.70977C9.10254 1.13131 8.83997 0.897461 8.18766 0.897461H6.53023C5.87792 0.897461 5.61536 1.13131 5.61536 1.70977V3.56823C5.61536 4.15079 5.87792 4.38054 6.53023 4.38054H8.18766C8.83997 4.38464 9.10254 4.15079 9.10254 3.57233Z"
              fill="white"
            />
            <path
              d="M4.38458 3.57233V1.70977C4.38458 1.13131 4.12202 0.897461 3.46971 0.897461H1.81227C1.15996 0.897461 0.8974 1.13131 0.8974 1.70977V3.56823C0.8974 4.15079 1.15996 4.38054 1.81227 4.38054H3.46971C4.12202 4.38464 4.38458 4.15079 4.38458 3.57233Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M4.38458 8.18779V6.53035C4.38458 5.87804 4.12202 5.61548 3.46971 5.61548H1.81227C1.15996 5.61548 0.8974 5.87804 0.8974 6.53035V8.18779C0.8974 8.84009 1.15996 9.10266 1.81227 9.10266H3.46971C4.12202 9.10266 4.38458 8.84009 4.38458 8.18779Z"
              fill="white"
            />
          </svg>
        </i>
      </div>
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
      {employees.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="list-table" onClick={showModal}>
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
              <tr key={employees.employeesId} onClick={() => {
                setId(employees.employeesId);
                setIsModalOpen(true);
              }}>
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
      )}
      <div>
        {isEditing ? (
          <Modal
            className="modal"
            open={isModalOpen}
            on
            Ok={handleOk}
            onCancel={handleCancel}
            width={1252}
          >
            <div className="modal-head">
              <h3>Thông tin cá nhân</h3>
            </div>
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
                <div className="dependent">
                  <span>Người phụ thuộc</span>
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
                          <th className="text">Địa chỉ</th>
                          <td className="input-text">
                            <Input
                              placeholder="Basic usage"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Giới tính</th>
                          <td className="input-text fix">
                            <Radio.Group
                              onChange={(e) => setGender(e.target.value)}
                              value={gender}
                            >
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
                          <th className="text">Số điện thoại</th>
                          <td className="input-text">
                            <Input
                              placeholder="Basic usage"
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">CCCD</th>
                          <td className="input-text">
                            <Input
                              placeholder="Basic usage"
                              onChange={(e) => setIdCard(e.target.value)}
                              value={idCard}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col span={12}>
                    <table className="table-info-detail">
                      <tbody>
                        <tr>
                          <th className="text">Mã số thuế</th>
                          <td className="input-text">
                            <Input
                              placeholder="Basic usage"
                              onChange={(e) => setFax(e.target.value)}
                              value={fax}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Chức vụ</th>
                          <td className="input-text">
                            <Select
                              className="select-input"
                              mode="multiple"
                              style={{
                                width: "100%",
                              }}
                              defaultValue={["china"]}
                              onChange={handleChange}
                              optionLabelProp="label"
                            >
                              <Option value="china" label="China">
                                <Space>China</Space>
                              </Option>
                              <Option value="usa" label="USA">
                                <Space>USA</Space>
                              </Option>
                              <Option value="japan" label="Japan">
                                <Space>Japan</Space>
                              </Option>
                              <Option value="korea" label="Korea">
                                <Space>Korea</Space>
                              </Option>
                            </Select>
                          </td>
                        </tr>

                        <tr>
                          <th className="text">Phòng ban</th>
                          <td className="input-text">
                            <Select
                              className="select-input"
                              mode="multiple"
                              style={{
                                width: "100%",
                              }}
                              defaultValue={["china"]}
                              onChange={handleChange}
                              optionLabelProp="label"
                            >
                              <Option value="china" label="China">
                                <Space>China</Space>
                              </Option>
                              <Option value="usa" label="USA">
                                <Space>USA</Space>
                              </Option>
                              <Option value="japan" label="Japan">
                                <Space>Japan</Space>
                              </Option>
                              <Option value="korea" label="Korea">
                                <Space>Korea</Space>
                              </Option>
                            </Select>
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
              <button className="btn-save" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </Modal>
        ) : (
          <Modal
            className="modal"
            open={isModalOpen}
            on
            Ok={handleOk}
            onCancel={handleCancel}
            width={1252}
          >
            <div className="modal-head">
              <h3>Thông tin cá nhân</h3>
            </div>
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
                <div className="dependent">
                  <span>Người phụ thuộc</span>
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
                          <th className="text">Địa chỉ</th>
                          <td className="input-text">
                            <Input placeholder="Basic usage" value={address} />
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
                          <th className="text">Số điện thoại</th>
                          <td className="input-text">
                            <Input placeholder="Basic usage" value={phone} />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">CCCD</th>
                          <td className="input-text">
                            <Input placeholder="Basic usage" value={idCard} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col span={12}>
                    <table className="table-info-detail">
                      <tbody>
                        <tr>
                          <th className="text">Mã số thuế</th>
                          <td className="input-text">
                            <Input placeholder="Basic usage" value={fax} />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Chức vụ</th>
                          <td className="input-text">
                            <Input placeholder="Basic usage" value={role} />
                          </td>
                        </tr>

                        <tr>
                          <th className="text">Phòng ban</th>
                          <td className="input-text">
                            <Input
                              placeholder="Basic usage"
                              value={department}
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
              <button className="btn-edit " onClick={handleEdit}>
                Chỉnh sửa
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ListEmployeeComponent;