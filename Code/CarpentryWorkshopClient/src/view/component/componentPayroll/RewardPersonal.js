import React from "react";
import { Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import { CreateAndEditPersonalReward } from "../../../sevices/PayrollSevice";
import { DetailID } from "../../../sevices/EmployeeService";
const RewardPersonal = ({
  isModalOpenRewardPersonal,
  handleChange,
  employees,
  employeeID,
  bonusAmount,
  bonusReason,
  bonusName,
  setEmployeesID,
  employeeName,
  employeeInput,
  handleBonusAmountChange,
  setBonusName,
  setBonusReason,
  setEmployeeName,
  setEmployeeInput,
  featchDataReward,
  resetPersonDetail,
  setIsModalOpenRewardPersonal,
  validateData,
}) => {
  
  const FetchEmployees = (id) => {
    toast.promise(
      DetailID(id)
        .then((data) => {
          setEmployeeInput({
            employeeID: data.employeeId,
            employeeName: data.fullName,
          });
          console.log('employeeInput', employeeInput);
          return data;
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang xử lý",
      }
    );
  };

  function handleEmployee(event) {
    setEmployeeInput({
        ...employeeInput,
        employeeID: event.target.value,
    });
    setTimeout(() => {
        handleUserInput(event)
    }, 1000);
}

  function handleUserInput(event) {
    if (event.type === "keydown" && event.key === "Enter") {
      if (event.target.value.trim() && isModalOpenRewardPersonal === true) {
        FetchEmployees(event.target.value);
      } else {
        toast.error("Vui lòng nhập mã nhân viên!");
      }
    } else if (event.type === "blur") {
      if (event.target.value.trim() && isModalOpenRewardPersonal === true) {
        FetchEmployees(event.target.value);
      } else {
        toast.error("Vui lòng nhập mã nhân viên!");
      }
    }
  }

  const handleOkRewardPersonal = () => {
    const isDataValid = validateData();

    if (!isDataValid) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        CreateAndEditPersonalReward(
          0,
          employeeID,
          bonusAmount,
          bonusName,
          bonusReason
        )
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
        success: "add person success",
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
              <Input
                type="text"
                placeholder="Sản xuất chân ghế"
                value={bonusName}
                onChange={(e) => setBonusName(e.target.value)}
              ></Input>
            </div>
            <div className="item-modal">
              <p>Số tiền thưởng:</p>
              <Input
                type="text"
                placeholder="500.000"
                value={bonusAmount}
                onChange={handleBonusAmountChange}
              ></Input>
            </div>
            <div className="item-modal">
              <p>Mã nhân viên</p>
              <input
                type="number"
                value={employeeInput.employeeID}
                placeholder="Nhập mã nhân viên"
                onChange={handleEmployee}
                onKeyDown={handleEmployee}
                onBlur={handleEmployee}
              />
            </div>
            <div className="item-modal">
              <p>Tên nhân viên:</p>
              <input
                type="text"
                value={employeeInput.employeeName}
                disabled
              />
            </div>
            <div className="item-modal">
              <p>Chi tiết thưởng</p>
              <Input
                type="text"
                placeholder="Ví lý do gì đấy nên được thưởng các quyền lợi"
                value={bonusReason}
                onChange={(e) => setBonusReason(e.target.value)}
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
