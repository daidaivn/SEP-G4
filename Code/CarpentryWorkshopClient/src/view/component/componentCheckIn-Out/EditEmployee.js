import React from "react";
import { Input, Modal } from "antd";

const EditEmployee = ({
  isModalOpenListEmployee,
  handleSave,
  handleCancelListEmployee,
  handleCancel,
}) => {
  return (
    <>
      {/* //chinh sua nhan vien */}
      <Modal
        className="modal"
        open={isModalOpenListEmployee}
        onOk={handleSave}
        onCancel={handleCancelListEmployee}
      >
        <div className="modal-add-roleyee-employee modal-shift-all">
          <div className="modal-head-employee modal-shift-head ">
            <h3>Chỉnh sửa điểm danh</h3>
            <svg
              onClick={handleCancelListEmployee}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M26.25 5.48077L16.7308 15L26.25 24.5192L24.5192 26.25L15 16.7308L5.48077 26.25L3.75 24.5192L13.2692 15L3.75 5.48077L5.48077 3.75L15 13.2692L24.5192 3.75L26.25 5.48077Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="body-add-role-employee">
            <table className="table-modal-shift">
              <thead>
                <td>STT</td>
                <td>Giờ bắt đầu</td>
                <td>Giờ kết thúc</td>
              </thead>
              <div
                className="body-table body-table-edit scrollbar"
                id="style-15"
              >
                <tr>
                  <td>1</td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                </tr>
                
              </div>

              <thead className="thead-last"></thead>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditEmployee;