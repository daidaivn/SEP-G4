import React from "react";
import { Input, Select, Modal } from "antd";
const ModalGroup = ({
  isModalOpenGroup,
  handleOkGroup,
  handleCancelGroup,
  shift,
  team,
  setShift,
  SetTeam,
  shiftType,
}) => {
  return (
    <>
      <Modal
        open={isModalOpenGroup}
        className="modal-group"
        on
        Ok={handleOkGroup}
        onCancel={handleCancelGroup}
        width={566}
      >
        <div className="modal-group">
          <div className="head-modal">
            <div className="head-title">
              <p>{shift.TeamName}</p>
            </div>
            <div className="close">
              <svg
                onClick={handleCancelGroup}
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
          <div className="group-all">
            <div className="time">
              <div className="time-detail">
                <p>Thời gian làm việc:</p>
              </div>
              <div className="time-detail">
                <p>- {shift.ShiftName}: {shiftType.startTimestring} đến {shiftType.endTimestring} </p>
              </div>
            </div>
            <div className="shift">
              <div className="shift-detail">
                <p>Ca làm việc:</p>
                <div className="box">
                  <p className="box-item">{shift.ShiftName}</p>
                </div>
              </div>
              <div className="shift-detail">
                <p>Số thành viên:</p>
                <div className="box">
                  <p className="box-item">{shift.NumberOfMember}</p>
                </div>
              </div>
            </div>
            <div className="table">
              <div className="table-child">
                <div className="head">
                  <div className="item">
                    <p>STT</p>
                  </div>
                  <div className="item">
                    <p>Chức vụ</p>
                  </div>
                  <div className="item">
                    <p>Mã nhân viên</p>
                  </div>
                  <div className="item">
                    <p>Họ và tên</p>
                  </div>
                </div>
                <div className="body-all scrollbar" id="style-15">
                  
                  <div className="body">
                    <div className="body-item">
                      <p>1</p>
                    </div>
                    <div className="body-item">
                      <p>Ca trưởng</p>
                    </div>
                    <div className="body-item">
                      <p>001</p>
                    </div>
                    <div className="body-item">
                      <p>Lê Thị Lan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalGroup;
