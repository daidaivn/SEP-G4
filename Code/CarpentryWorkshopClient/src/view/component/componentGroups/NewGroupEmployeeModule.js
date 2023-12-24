import React from 'react';
import { Modal, Select, Space } from 'antd';

const { Option } = Select;

const NewGroupEmployeeModule = ({
  isModalOpenAdd,
  handleOkAdd,
  handleCancelAdd,
  teamID,
  getStaffsNoTeam,
  handleChangeSelect,
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenAdd}
      onOk={handleOkAdd}
      onCancel={handleCancelAdd}
      width={566}
    >
      <div className="modal-add-group1">
        <div className="modal-head">
          <h3>Thêm nhân viên</h3>
        </div>
        <div className="body-modal-change">
          <div className="modal1-change">
            <p>Nhân viên:</p>
            <div className="select-all-change">
              <Select
                className="select-input"
                mode="multiple"
                style={{
                  width: "375px",
                }}
                onChange={handleChangeSelect}
                optionLabelProp="label"
              >
                {getStaffsNoTeam.map((staff) => (
                  <Option
                    key={staff.employeeID}
                    value={staff.employeeID}
                    label={staff.fullName + "-" + staff.employeeID}
                  >
                    <Space>{staff.fullName}-{staff.employeeID}</Space>
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-footer-deparment">
          <button className="btn-cancel" onClick={handleCancelAdd}>
            Thoát
          </button>
          <button className="btn-edit btn-save" onClick={handleOkAdd}>
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewGroupEmployeeModule;
