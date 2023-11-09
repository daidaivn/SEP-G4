import React from 'react';
import { Modal, Input, Select } from 'antd'; // Import các component và dependency cần thiết

const ModalAddGroup = ({
  isModalOpenGroup,
  handleAddGroup,
  handleCancelGroup,
  newTeamName,
  setNewTeamName,
  handleChange,
  handleChangeSelect,
  allLeader,
  allSubLeader,
  selectedChangeid,
  selectedChangeid1,
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenGroup}
      onOk={handleAddGroup}
      onCancel={handleCancelGroup}
      width={566}
    >
      <div className="modal-head">
        <h3>Thêm nhóm</h3>
      </div>
      <div className="modal-body modal-body-department">
        <div className="info-add-department">
          <div className="text-department">Tên nhóm</div>
          <Input
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
        </div>
        <div className="info-add-department ">
          <div className="text-department">Ca trưởng</div>
          <Select
            className="select-input"
            type="text"
            defaultValue={selectedChangeid}
            onChange={handleChange}
            options={allLeader.map((leader) => ({
              value: leader.employeeId,
              label: leader.fullName,
            }))}
          />
        </div>
        <div className="info-add-department">
          <div className="text-department">Ca phó</div>
          <Select
            className="select-input"
            type="text"
            defaultValue={selectedChangeid1}
            onChange={handleChangeSelect}
            options={allSubLeader.map((SubLeader) => ({
              value: SubLeader.employeeId,
              label: SubLeader.fullName,
            }))}
          />
        </div>
      </div>
      <div className="modal-footer modal-footer-deparment">
        <button className="btn-cancel" onClick={handleCancelGroup}>
          Hủy bỏ
        </button>
        <button className="btn-edit btn-save" onClick={handleAddGroup}>
          Lưu
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddGroup;
