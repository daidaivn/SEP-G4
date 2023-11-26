import React from "react";
import { Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import { CreateAndUpdateSpecialOccasion
 } from "../../../sevices/PayrollSevice";
const Holiday = ({
  isModalOpenHoliday,
  handleChange,
  employees,
  employeeID,
  bonusAmount,
  bonusReason,
  bonusName,
  setEmployeesID,
  handleBonusAmountChange,
  setBonusName,
  setBonusReason,
  resetPersonDetail,
  featchDataReward,
  setIsModalOpenHoliday,
  validateData,
}) => {
  const handleOkHoliday = () => {
    const isDataValid = validateData();

    if (!isDataValid) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        CreateAndUpdateSpecialOccasion(0,employeeID,bonusAmount,bonusName,bonusReason)
          .then((data) => {
            resolve(data);
            resetPersonDetail();
            featchDataReward();
            setIsModalOpenHoliday(false);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        success:"add success",
        pending: "Đang tải dữ liệu",
        error: "Lỗi tải dữ liệu",
      }
    );
  };
  const handleCancelHoliday = () => {
    resetPersonDetail();
    setIsModalOpenHoliday(false);
  };
  return (
    <>
      {/* Modal Thưởng cá nhân */}
      <Modal
        className="modal"
        open={isModalOpenHoliday}
        onOk={handleOkHoliday}
        onCancel={handleCancelHoliday}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Hiếu hỉ</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Loại hiếu hỉ:</p>
              <Input type="text" placeholder="Viếng thăm" value={bonusName} onChange={(e)=> setBonusName(e.target.value)}></Input>
            </div>
            <div className="item-modal">
              <p>Số tiền thưởng:</p>
              <Input type="text" placeholder="500.000" value={bonusAmount} onChange={handleBonusAmountChange}></Input>
            </div>
            <div className="item-modal">
              <p>Chọn nhân viên</p>
              <Select
                style={{
                  width: 120,
                }}
                value={employeeID}
                onChange={(value)=> setEmployeesID(value)}
                options={employees.map((employee) => ({
                  value: employee.employeeID, 
                  label: employee.fullName, 
                }))}
              />
            </div>
            <div className="item-modal">
              <p>Chi tiết thưởng</p>
              <Input
                type="text"
                placeholder="Ví lý do gì đấy nên được thưởng các quyền lợi"
                value={bonusReason}
                onChange={(e)=>setBonusReason(e.target.value)}
              ></Input>
            </div>

            <div className="footer-modal">
              <span className="back" onClick={handleCancelHoliday}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleOkHoliday}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Holiday;
