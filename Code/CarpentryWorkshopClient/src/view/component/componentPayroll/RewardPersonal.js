import React from "react";
import { Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import { CreateAndEditPersonalReward } from "../../../sevices/PayrollSevice";
const RewardPersonal = ({
  isModalOpenRewardPersonal,
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
  featchDataReward,
  resetPersonDetail,
  setIsModalOpenRewardPersonal,
  validateData,
}) => {
  const handleOkRewardPersonal = () => {
    const isDataValid = validateData();

    if (!isDataValid) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        CreateAndEditPersonalReward(0,employeeID,bonusAmount,bonusName,bonusReason)
          .then((data) => {
            resolve(data);
            featchDataReward();
            resetPersonDetail();
            setIsModalOpenRewardPersonal(false);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        success:"add person success",
        pending: "Đang tải dữ liệu",
        error: "Lỗi tải dữ liệu",
      }
    );
    
  };
  
  const handleCancelRewardPersonal = () => {
    resetPersonDetail();
    setIsModalOpenRewardPersonal(false);
  };
  return (
    <>
      {/* Modal Thưởng cá nhân */}
      <Modal
        className="modal"
        open={isModalOpenRewardPersonal}
        onOk={handleOkRewardPersonal}
        onCancel={handleCancelRewardPersonal}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Thưởng cá nhân</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Loại thưởng</p>
              <Input type="text" placeholder="Sản xuất chân ghế" value={bonusName} onChange={(e)=> setBonusName(e.target.value)}></Input>
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
              <span className="back" onClick={handleCancelRewardPersonal}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleOkRewardPersonal}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RewardPersonal;
