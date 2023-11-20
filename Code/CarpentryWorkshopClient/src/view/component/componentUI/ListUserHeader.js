import React, { useEffect, useState } from "react";
import user from "../../assets/images/Ellipse 69.svg";
import notification from "../../assets/images/icons/notification.svg";
import "../../scss/index.scss";
import { toast } from "react-toastify";
import { Input, Switch, Form } from "antd";
import { Modal } from "antd";
import { Radio } from "antd";
import { Select, Space } from "antd";
import { DetailID } from "../../../sevices/EmployeeService";
// import avt from ".../";
function ListUserHeader() {
  const [employee, setEmployee] = useState([]);
  const [gender, setGender] = useState("Nguyễn Văn An");
  const [userName, setUserName] = useState("");
  const [userAllVisible, setUserAllVisible] = useState(false);
  const userEmployeeID =
    localStorage.getItem("userEmployeeID") ||
    sessionStorage.getItem("userEmployeeID");
    //convert date
  const convertDobToISO = (dobstring) => {
    if (dobstring) {
      const parts = dobstring.split("-");
      if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
      return dobstring;
    }
    return dobstring;
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const toggleUserAll = () => {
    setUserAllVisible(!userAllVisible);
  };

  const closeUserAll = () => {
    setUserAllVisible(false);
  };
  useEffect(() => {
    const storedUserName =
      localStorage.getItem("userName") || sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const [isModalOpenUser, setIsModalOpenUser] = useState(false);
  const showModalUser = () => {
    toast.promise(
      new Promise((resolve) => {
        DetailID(userEmployeeID)
          .then((data) => {
            setEmployee(data);

            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "success",
        error: `Lỗi làm việc`,
      }
    );
    setIsModalOpenUser(true);
  };
  const handleOkUser = () => {
    setIsModalOpenUser(false);
  };
  const handleCancelUser = () => {
    setIsModalOpenUser(false);
  };

  const [isModalOpenUserRole, setIsModalOpenUserRole] = useState(false);
  const showModalUserRole = () => {
    setIsModalOpenUserRole(true);
  };
  const handleOkUserRole = () => {
    setIsModalOpenUserRole(false);
  };
  const handleCancelUserRole = () => {
    setIsModalOpenUserRole(false);
  };

  const [isModalOpenPayroll, setIsModalOpenPayroll] = useState(false);
  const showModalPayroll = () => {
    setIsModalOpenPayroll(true);
  };
  const handleOkPayroll = () => {
    setIsModalOpenUser(false);
  };
  const handleCancelPayroll = () => {
    setIsModalOpenPayroll(false);
  };
  return (
    <>
      <div className="list-user-header">
        <span onClick={toggleUserAll}>{userName ? `${userName}` : "User"}</span>
        <img onClick={toggleUserAll} className="user-list" src={user} alt="" />
        <img className="notification-list" src={notification} alt="" />
      </div>
      {userAllVisible && (
        <div className="user-all">
          <div className="view-info">
            <svg
              onClick={closeUserAll}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.5 3.65385L11.1538 10L17.5 16.3462L16.3462 17.5L10 11.1538L3.65385 17.5L2.5 16.3462L8.84615 10L2.5 3.65385L3.65385 2.5L10 8.84615L16.3462 2.5L17.5 3.65385Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="view-info" onClick={showModalUser}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M22.6749 27.0254C21.5749 27.3504 20.275 27.5004 18.75 27.5004H11.25C9.72495 27.5004 8.42495 27.3504 7.32495 27.0254C7.59995 23.7754 10.9375 21.2129 15 21.2129C19.0625 21.2129 22.3999 23.7754 22.6749 27.0254Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 23.475 3.925 26.0625 7.325 27.025C7.6 23.775 10.9375 21.2125 15 21.2125C19.0625 21.2125 22.4 23.775 22.675 27.025C26.075 26.0625 27.5 23.475 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5ZM15 17.7125C12.525 17.7125 10.525 15.7 10.525 13.225C10.525 10.75 12.525 8.75 15 8.75C17.475 8.75 19.475 10.75 19.475 13.225C19.475 15.7 17.475 17.7125 15 17.7125Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.4749 13.225C19.4749 15.7 17.4749 17.7125 14.9999 17.7125C12.5249 17.7125 10.5249 15.7 10.5249 13.225C10.5249 10.75 12.5249 8.75 14.9999 8.75C17.4749 8.75 19.4749 10.75 19.4749 13.225Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Xem thông tin</p>
          </div>
          <div className="view-info" onClick={showModalPayroll}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clip-path="url(#clip0_902_1589)">
                <path
                  d="M7.14286 0C8.13058 0 8.92857 0.670312 8.92857 1.5V3H16.0714V1.5C16.0714 0.670312 16.8694 0 17.8571 0C18.8449 0 19.6429 0.670312 19.6429 1.5V3H22.3214C23.8002 3 25 4.00781 25 5.25V7.5H0V5.25C0 4.00781 1.19978 3 2.67857 3H5.35714V1.5C5.35714 0.670312 6.15513 0 7.14286 0ZM0 9H25V21.75C25 22.9922 23.8002 24 22.3214 24H2.67857C1.19978 24 0 22.9922 0 21.75V9ZM4.46429 12C3.97321 12 3.57143 12.3375 3.57143 12.75V15.75C3.57143 16.1625 3.97321 16.5 4.46429 16.5H20.5357C21.0268 16.5 21.4286 16.1625 21.4286 15.75V12.75C21.4286 12.3375 21.0268 12 20.5357 12H4.46429Z"
                  fill="#F7F7F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_902_1589">
                  <rect width="25" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>Xem lương</p>
          </div>
        </div>
      )}
      <Modal
        className="modal"
        visible={isModalOpenUser}
        onOk={handleOkUser}
        onCancel={handleCancelUser}
        width={1252}
      >
        <div className="modal-add-employee">
          <div className="modal-head-employee">
            <h3>Thông tin cá nhân</h3>
            <svg
              onClick={handleCancelUser}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 1.53846L11.5385 10L20 18.4615L18.4615 20L10 11.5385L1.53846 20L0 18.4615L8.46154 10L0 1.53846L1.53846 0L10 8.46154L18.4615 0L20 1.53846Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="modal-add-employee-all modal-user-all">
            <div className="modal-employee-box1">
              <div className="modal-child-body1">
                <div className="img-body1">
                  <img alt="" />
                </div>
              </div>
              <div className="modal-child-body2">
                <div className="div-modal-child2 fix-color">
                  <p>Họ và tên:</p>
                  <p className="fix-input">{employee.fullName}</p>
                </div>

                <div className="div-modal-child2 fix-color">
                  <p>Số điện thoại:</p>
                  <p className="fix-input">{employee.phoneNumber}</p>
                </div>

                <div className="div-modal-child2 fix-color">
                  <p>Giới tính: </p>
                  <p className="fix-input">{employee.genderstring}</p>
                </div>
                <div className="div-modal-child2 fix-color">
                  <p>Quốc tịch:</p>
                  <p className="fix-input">{employee.country}</p>
                </div>
                <div className="div-modal-child2 fix-color">
                  <p>Địa chỉ: </p>
                  <p className="fix-input">{employee.address}</p>
                </div>
                <div className="div-modal-child2 div-detail fix-color">
                  <p>Email: </p>
                  <p className="fix-input">{employee.email}</p>
                </div>
              </div>
            </div>
            <div className="modal-employee-box2">
              <div className="modal-box2-child">
                <div className="box2-child-cn ">
                  <div className="box-child-employee1 div-detail fix-color">
                    <p>Mã số thuế:</p>
                    <p className="fix-input">{employee.taxId}</p>
                  </div>
                  <div className="box-child-employee1 fix-color">
                    <p>Lương cơ bản:</p>
                    <p className="fix-input">4000000</p>
                  </div>
                  <div className="box-child-employee1 fix-color">
                    <p>Mã định danh:</p>
                    <p className="fix-input">{employee.cic}</p>
                  </div>
                </div>
                <div className="box2-child-cn">
                  <div className="box-child-employee1 fix-color">
                    <p>Ngày sinh:</p>
                    <Input
                      type="date"
                      className="fix-input"
                      value={convertDobToISO(employee.dobstring)}
                    ></Input>
                  </div>
                  <div className="box-child-employee1 fix-color">
                    <p>Trạng thái:</p>
                    <Form.Item valuePropName="checked">
                      <Switch checked="true" />
                    </Form.Item>
                    <span>Còn thời hạn</span>
                  </div>
                  <div className="box-child-employee1 fix-color">
                    <button
                      className="btn-role-user"
                      onClick={showModalUserRole}
                    >
                      Xem chức vụ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className="modal"
        open={isModalOpenPayroll}
        on
        Ok={handleOkPayroll}
        onCancel={handleCancelPayroll}
      >
        <div className="modal-payroll">
          <div className="modal-head">
            <div className="body-payroll1">
              <p>Bảng lương</p>
              <Input type="date"></Input>
            </div>
            <div className="close">
              <svg
                onClick={handleCancelPayroll}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30 2.30769L17.3077 15L30 27.6923L27.6923 30L15 17.3077L2.30769 30L0 27.6923L12.6923 15L0 2.30769L2.30769 0L15 12.6923L27.6923 0L30 2.30769Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="body-payroll">
            <div className="body-child1 scrollbar" id="style-15">
              <div className="body-child1-cn">
                <div className="item-chil1">
                  <div className="item-chil1-cn">
                    <p className="text1">1.</p>
                    <p>Lương chính</p>
                    <div className="money">
                      <p>9.000.000 VND</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">2.</p>
                    <p>Phụ cấp</p>
                    <div className="money"></div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Trách nhiệm</p>
                    <div className="money">
                      <p>9.000.000 VND</p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Ăn trưa</p>
                    <div className="money">
                      <p>9.000.000 VND</p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Điện thoại</p>
                    <div className="money">
                      <p>9.000.000 VND</p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Xăng xe</p>
                    <div className="money">
                      <p>9.000.000 VND</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">3.</p>
                    <p>Thưởng</p>
                    <div className="money"></div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Tết dương lịch</p>
                    <div className="money">
                      <p>9.000.000 VND</p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Tết âm lịch</p>
                    <div className="money">
                      <p>9.000.000 VND</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-child2">
              <div className="body-child1-cn">
                <div className="item-chil1">
                  <div className="item-chil1-cn">
                    <p>Tổng số tiền nhận được</p>
                    <div className="money">
                      <p>19.000.000 VND</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="modal"
        open={isModalOpenUserRole}
        onOk={handleOkUserRole}
        onCancel={handleCancelUserRole}
      >
        <div className="modal-add-roleyee-employee">
          <div className="modal-head-employee">
            <h3>Chức vụ / phòng ban</h3>
          </div>
          <div className="body-add-role-employee">
            <table>
              <thead>
                <td>Chức vụ</td>
                <td>Phòng ban</td>
              </thead>
              <div className="body-table">
              {employee && employee.roleDepartments && (
                <div className="show-role">
                  <div className="show-item-role">
                    <tr>
                      <p>Chức vụ chính:</p>
                    </tr>
                    {employee.roleDepartments.length > 0 && (
                      <tr>
                        <div className="tr-child">
                          <Input
                            type="text"
                            value={employee.roleDepartments[0].roleName}
                          ></Input>
                        </div>

                        <div className="tr-child">
                          <Input
                            type="text"
                            value={employee.roleDepartments[0].departmentName}
                          ></Input>
                        </div>
                      </tr>
                    )}
                  </div>
                  <div className="show-item-role role-fix">
                    <tr>
                      <p>Kiêm chức vụ:</p>
                    </tr>
                    {employee.roleDepartments
                      .slice(1)
                      .map((roleDept, index) => (
                        <tr key={index}>
                          <div className="tr-child">
                            <Input
                              type="text"
                              value={roleDept.roleName}
                            ></Input>
                          </div>
                          <div className="tr-child">
                            <Input
                              type="text"
                              value={roleDept.departmentName}
                            ></Input>
                          </div>
                        </tr>
                      ))}
                  </div>
                </div>
              )}
              </div>
              <thead className="thead-last"></thead>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ListUserHeader;
