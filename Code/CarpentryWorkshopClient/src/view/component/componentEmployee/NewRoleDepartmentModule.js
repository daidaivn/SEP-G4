import React from 'react';
import { Modal, Select } from "antd";

const NewRoleDepartmentModal = ({
  isModalOpenAddRole,
  handleOkAddRole,
  handleCancelAddRole,
  roleDepartmentValues,
  setRoleDepartmentValues,
  roles,
  departments,
  allRole
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenAddRole}
      onOk={handleOkAddRole}
      onCancel={handleCancelAddRole}
    >
      <div className="modal-add-roleyee-employee">
        <div className="modal-head-employee">
          <h3>Thêm chức vụ / phòng ban</h3>
        </div>
        <div className="body-add-role-employee">
          <table>
            <thead>
              <td>Phòng ban</td>
              <td>Chức vụ</td>
            </thead>
            <div className="body-table">
              {[0].map((index) => (
                <tr key={index}>
                  <Select
                    className="select-input"
                    value={roleDepartmentValues[index]?.departmentID}
                    onChange={(value) => {
                      const newRoleDepartmentValues = [...roleDepartmentValues];
                      newRoleDepartmentValues[index] = {
                        roleID: roleDepartmentValues[index]?.roleID || null,
                        departmentID: value,
                      };
                      setRoleDepartmentValues(newRoleDepartmentValues);
                      allRole(newRoleDepartmentValues[0]?.departmentID);
                    }}
                    style={{
                      width: "100%",
                    }}
                    options={[
                      { value: null, label: "Bỏ phòng - ban" },
                      ...(departments || []).map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      })),
                    ]}
                  />

                  <Select
                    className="select-input"
                    value={roleDepartmentValues[index]?.roleID}
                    onChange={(value) => {
                      const newRoleDepartmentValues = [...roleDepartmentValues];
                      newRoleDepartmentValues[index] = {
                        roleID: value,
                        departmentID: roleDepartmentValues[index]?.departmentID || null,
                      };
                      setRoleDepartmentValues(newRoleDepartmentValues);
                    }}
                    style={{
                      width: "100%",
                    }}
                    options={[
                      { value: null, label: "Bỏ chức vụ" },
                      ...(roles || []).map((role) => ({
                        value: role.roleId,
                        label: role.roleName,
                      })),
                    ]}
                  />
                </tr>
              ))}
            </div>

            <thead className="thead-last"></thead>
          </table>
        </div>
        <div className="modal-footer modal-edit-role">
          <button className="btn-cancel" onClick={handleCancelAddRole}>
            Hủy bỏ
          </button>
          <button className="btn-edit btn-save" onClick={handleOkAddRole}>
            Xong
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewRoleDepartmentModal;
