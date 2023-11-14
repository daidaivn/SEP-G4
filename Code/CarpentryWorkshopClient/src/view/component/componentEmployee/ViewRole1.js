import React from "react";
import { Input, Modal } from "antd";

const ViewRole1 = ({
  isModalOpenViewRole1,
  handleOkViewRole1,
  handleCancelViewRole1,
  idDetail,
}) => {
  return (
    <>
      <Modal
        className="modal"
        open={isModalOpenViewRole1}
        onOk={handleOkViewRole1}
        onCancel={handleCancelViewRole1}
      >
        <div className="modal-add-roleyee-employee">
          <div className="modal-head-employee">
            <h3>Chức vụ / phòng ban</h3>
            <div className="close" onClick={handleCancelViewRole1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35 7.30769L22.3077 20L35 32.6923L32.6923 35L20 22.3077L7.30769 35L5 32.6923L17.6923 20L5 7.30769L7.30769 5L20 17.6923L32.6923 5L35 7.30769Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="body-add-role-employee">
            <table>
              <thead>
                <td>Chức vụ</td>
                <td>Phòng ban</td>
              </thead>
              <div className="body-table">
                {idDetail && idDetail.roleDepartments && (
                  <div className="show-role">
                    <div className="show-item-role">
                      <tr>
                        <p>Chức vụ chính:</p>
                      </tr>
                      {idDetail.roleDepartments.length > 0 && (
                        <tr>
                          <div className="tr-child">
                            <Input
                              type="text"
                              value={idDetail.roleDepartments[0].roleName}
                            ></Input>
                          </div>

                          <div className="tr-child">
                            <Input
                              type="text"
                              value={idDetail.roleDepartments[0].departmentName}
                            ></Input>
                          </div>
                        </tr>
                      )}
                    </div>
                    <div className="show-item-role role-fix">
                      <tr>
                        <p>Kiêm chức vụ:</p>
                      </tr>
                      {idDetail.roleDepartments
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
export default ViewRole1;
