import React from 'react';
import { Modal, Select } from 'antd';

const ChangeTeamModule = ({
  isModalOpenChange,
  handleOkChange,
  handleCancelChange,
  nameChange,
  idChange,
  teamName,
  changeSelectEdit,
  handleChangeSelectEdit,
  teamsContinue,
  handleChangeSucssecfully,
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenChange}
      onOk={handleOkChange}
      onCancel={handleCancelChange}
      width={566}
    >
      <div className="modal-all-group">
        <div className="modal-head">
          <h3>Chuyển nhóm</h3>
        </div>
        <div className="modal-end-group">
          <div className="body-modal-end-group">
            <div className="modal1">
              <div className="modal1-child">
                <p>Nhân viên: </p>
                <p>{nameChange}</p>
              </div>
              <div className="modal1-child">
                <p>Mã số nhân viên: </p>
                <p>{idChange}</p>
              </div>
              <div className="modal1-child">
                <p>Nhóm hiện tại:</p>
                <p>{teamName}</p>
              </div>
            </div>
            <div className="modal2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="50"
                viewBox="0 0 51 50"
                fill="none"
              >
                <path
                  d="M30.5625 12.3545L43.2083 25.0003L30.5625 37.6462"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.7915 25H42.854"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="modal3">
              <div className="modal3-child">
                <p>Nhóm chuyển đến:</p>

                <div className="list-filter select-modal-end">
                  <Select
                    className="select-input"
                    defaultValue="lucy"
                    value={changeSelectEdit}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChangeSelectEdit}
                    options={teamsContinue.map((team) => ({
                      value: team.teamId,
                      label: team.teamName,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-footer-group">
          <button className="btn-cancel" onClick={handleCancelChange}>
            Hủy bỏ
          </button>
          <button
            className="btn-edit btn-save"
            onClick={handleChangeSucssecfully}
          >
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeTeamModule;
