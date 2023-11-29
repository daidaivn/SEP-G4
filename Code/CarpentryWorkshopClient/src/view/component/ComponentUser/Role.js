import React from "react";
import { Input, Modal } from "antd";
const Role = ({
  isModalOpenUserRole,
  handleOkUserRole,
  handleCancelUserRole,
  employee,
}) => {
  return (
    <>
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
};
export default Role;
