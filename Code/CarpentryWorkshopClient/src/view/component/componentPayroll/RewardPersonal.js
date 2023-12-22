import React from "react";
import { Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { CreateAndEditPersonalReward } from "../../../sevices/PayrollSevice";
import { DetailEmployeebasic } from "../../../sevices/EmployeeService";
const RewardPersonal = ({
  isModalOpenRewardPersonal,
  handleChange,
  employeeID,
  bonusAmount,
  bonusReason,
  bonusName,
  employeeInput,
  handleBonusAmountChange,
  setBonusName,
  setBonusReason,
  setEmployeeInput,
  featchDataReward,
  resetPersonDetail,
  setIsModalOpenRewardPersonal,
  validateData,
  actionEdit,
}) => {
  const FetchEmployees = (id) => {
    toast.promise(
      DetailEmployeebasic(id)
        .then((data) => {
          setEmployeeInput({
            employeeStringID: data.employeeIdstring,
            employeeID: data.employeeId,
            employeeName: data.fullName,
          });
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
      employeeStringID: event.target.value,
    });
    setTimeout(() => {
      handleUserInput(event);
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
    let id = 0;
    if(actionEdit == "PersonEdit"){
      id = employeeInput.id;
    }
    console.log('PR', id);
    toast.promise(
      CreateAndEditPersonalReward(
        id,
        employeeInput.employeeID,
        bonusAmount,
        bonusName,
        bonusReason
      )
        .then((data) => {
          featchDataReward();
          resetPersonDetail();
          setIsModalOpenRewardPersonal(false);
          return data;
        })
        .catch((error) => {
          throw toast.error(error.response.data);
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
            {actionEdit == "PersonEdit" ? <p> Sửa thưởng cá nhân</p> : <p>Thưởng cá nhân</p>}
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
                value={employeeInput.employeeStringID}
                placeholder="Nhập mã nhân viên"
                onChange={handleEmployee}
                onKeyDown={handleEmployee}
                onBlur={handleEmployee}
              />
            </div>
            <div className="item-modal">
              <p>Tên nhân viên:</p>
              <input type="text" value={employeeInput.employeeName} disabled />
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
