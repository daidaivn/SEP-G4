import React from 'react';
import { Modal, Input } from 'antd';

const ChangeNameTeamModal = ({
  isModalOpenChangeName,
  handleOkChangeName,
  handleCancelChangeName,
  newTeamName,
  setNewTeamName,
}) => {
  return (
    <Modal
      className="modal1"
      open={isModalOpenChangeName}
      onOk={handleOkChangeName}
      onCancel={handleCancelChangeName}
      width={566}
    >
      <div className="modal-head">
        <h3>Đổi tên nhóm</h3>
      </div>
      <div className="modal-body modal-body-department">
        <div className="info-add-department">
          <div className="text-department">Tên nhóm</div>
          <Input
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-footer modal-footer-deparment">
        <button className="btn-cancel" onClick={handleCancelChangeName}>
          Hủy bỏ
        </button>
        <button className="btn-edit btn-save" onClick={handleOkChangeName}>
          Lưu
        </button>
      </div>
    </Modal>
  );
};

export default ChangeNameTeamModal;
