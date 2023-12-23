import React, { useState, useEffect } from "react";
import { Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import { CreateAndUpdateSpecialOccasion } from "../../../sevices/PayrollSevice";
import { DetailEmployeebasic } from "../../../sevices/EmployeeService";
const Holiday = ({
  isModalOpenHoliday,
  handleChange,
  employeeID,
  bonusAmount,
  bonusReason,
  bonusName,
  handleBonusAmountChange,
  setBonusName,
  setBonusReason,
  resetPersonDetail,
  featchDataReward,
  setIsModalOpenHoliday,
  validateData,
  employeeInput,
  setEmployeeInput,
  actionEdit,
  rewardId,
}) => {

  const handleOkHoliday = () => {
    const isDataValid = validateData();
    if (!isDataValid) {
      return;
    }
    let id = 0;
    console.log('rewrd', rewardId);
    if(actionEdit === "HolidayEdit"){
      id = rewardId;
    }
    toast.promise(
      CreateAndUpdateSpecialOccasion(
        id,
        employeeInput.employeeID,
        bonusAmount,
        bonusName,
        bonusReason
      )
        .then((data) => {
          resetPersonDetail();
          featchDataReward();
          setIsModalOpenHoliday(false);
          return toast.success(data);
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang tải dữ liệu",
      }
    );
  };
  const handleCancelHoliday = () => {
    resetPersonDetail();
    setIsModalOpenHoliday(false);
  };
  const FetchEmployees = (id) => {
    toast.promise(
      DetailEmployeebasic(id)
        .then((data) => {
          setEmployeeInput({
            employeeStringID: data.employeeIdstring,
            employeeID: data.employeeId,
            employeeName: data.fullName,
          });
          console.log('employeeinput', employeeInput);
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
      if (event.target.value.trim() && isModalOpenHoliday === true) {
        FetchEmployees(event.target.value);
      } else {
        toast.error("Vui lòng nhập mã nhân viên!");
      }
    } else if (event.type === "blur") {
      if (event.target.value.trim() && isModalOpenHoliday === true) {
        FetchEmployees(event.target.value);
      } else {
        toast.error("Vui lòng nhập mã nhân viên!");
      }
    }
  }
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
              <Input
                type="text"
                placeholder="Viếng thăm"
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
