import React from 'react';
import { Modal , Input} from "antd";

const ViewRoleDepartmentModule = ({
  isModalOpenEditRole,
  handleOkEditRole,
  handleCancelEditRole,
  idDetail,
  handleEditRole,
}) => {
  return (
    <Modal
          className="modal"
          open={isModalOpenEditRole}
          onOk={handleOkEditRole}
          onCancel={handleCancelEditRole}
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
                  {idDetail && idDetail.roleDepartments && (
                    <div className="show-role">
                      <div className="show-item-role">
                        <tr >
                          <p>Chức vụ chính:</p>
                        </tr>
                        {idDetail.roleDepartments.length > 0 && (
                          <tr>
                            <div className="tr-child">
                              <Input type="text" value={idDetail.roleDepartments[0].roleName} ></Input>
                            </div>

                            <div className="tr-child">
                              <Input type="text" value={idDetail.roleDepartments[0].departmentName}></Input>
                            </div>
                          </tr>
                        )}
                      </div>
                      <div className="show-item-role role-fix">
                        <tr>
                          <p>Kiêm chức vụ:</p>
                        </tr>
                        {idDetail.roleDepartments.slice(1).map((roleDept, index) => (
                          <tr key={index}>
                            <div className="tr-child">
                              <Input type="text" value={roleDept.roleName}></Input>
                            </div>
                            <div className="tr-child">
                              <Input type="text" value={roleDept.departmentName}></Input>
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
            <div className="modal-footer modal-edit-role">
              <button className="btn-cancel" onClick={handleCancelEditRole}>
                Thoát
              </button>
              <button className="btn-edit" onClick={handleEditRole}>
                Sửa chức vụ
              </button>
            </div>
          </div>
        </Modal>
  );
};

export default ViewRoleDepartmentModule;
