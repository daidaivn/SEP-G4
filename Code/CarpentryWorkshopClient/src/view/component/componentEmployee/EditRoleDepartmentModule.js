import React from 'react';
import { Modal, Select } from "antd";
const EditRoleDepartmentModule = ({
    isModalOpenEditRole,
    handleOkEditRole,
    handleCancelEditRole,
    idDetail,
    updatedIdDetail,
    setIdDetail,
    roles,
    departments,
    handleCancelView1,
    handleSaveRole,
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
                    <h3>Sửa chức vụ / phòng ban</h3>
                </div>
                <div className="body-add-role-employee">
                    <table>
                        <thead>
                            <td>Chức vụ</td>
                            <td>Phòng ban</td>
                        </thead>
                        <div className="body-table">
                            {idDetail.roleDepartments.map((roleDept, index) => (
                                <tr key={index}>
                                    <Select
                                        className="select-input"
                                        value={roleDept.roleID}
                                        onChange={(value) => {
                                            updatedIdDetail.roleDepartments[index].roleID = value;
                                            setIdDetail(updatedIdDetail);
                                        }}
                                        style={{
                                            width: "100%",
                                        }}
                                        options={[
                                            { value: null, label: "Bỏ chức vụ" },
                                            ...roles.map((role) => ({
                                                value: role.roleID,
                                                label: role.roleName,
                                            })),
                                        ]}
                                    />
                                    <Select
                                        className="select-input"
                                        value={roleDept.departmentID}
                                        onChange={(value) => {
                                            updatedIdDetail.roleDepartments[index].departmentID = value;
                                            setIdDetail(updatedIdDetail);
                                        }}
                                        style={{
                                            width: "100%",
                                        }}
                                        options={[
                                            { value: null, label: "Bỏ phòng - ban" },
                                            ...departments.map((department) => ({
                                                value: department.departmentId,
                                                label: department.departmentName,
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
                    <button className="btn-cancel" onClick={handleCancelView1}>
                        Hủy bỏ
                    </button>
                    <button className="btn-edit btn-save" onClick={handleSaveRole}>
                        Lưu
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditRoleDepartmentModule;
