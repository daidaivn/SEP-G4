import React from "react";
import { useState } from "react";
import { Input, Modal } from "antd";
import { GetEmployees, CreateAdvanceSalary, UpdateAdvanceSalary } from "../../../sevices/AdvanceService";
import { toast } from "react-toastify";
import { formatMoney } from "../../logicTime/formatAll";

const ModalAdvance = ({
    isModalOpenAdvance,
    handleOkAdvance,
    handleCancelAdvance,
    setInputAdvance,
    inputAdvance,
    action,
    handleCancel,
    setHandleCancel,
    FetchAllAdvances,
}) => {

    const handleCreateAdvanceSalary = () => {
        toast.promise(
            CreateAdvanceSalary(inputAdvance)
                .then((data) => {
                    console.log('data',data);
                    
                    handleCancelAdvance()
                    FetchAllAdvances()
                    return toast.error(data);
                })
                .catch((error) => {
                    throw toast.error(error.response.data);
                }),
            {
                pending: "Đang xử lý",
            }
        );
    }

    const handleUpdateAdvanceSalary = () => {
        toast.promise(
            UpdateAdvanceSalary(inputAdvance)
                .then((data) => {
                    handleCancelAdvance()
                    FetchAllAdvances()
                    console.log('data',data);
                    return toast.error(data);
                })
                .catch((error) => {
                    throw toast.error(error.response.data);
                }),
            {
                pending: "Đang xử lý",
            }
        );
    }

    const FetchEmployees = (id) => {
        toast.promise(
            GetEmployees(id)
                .then((data) => {
                    setInputAdvance({
                        IdAdvanceString: id,
                        IdAdvance: data.employeeID,
                        nameUserAdvance: data.employeeName,
                        maxAdvance: data.maxAdvance,
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
    console.log('handleCancel', handleCancel);

    function handleCheckAncance(event) {
        setInputAdvance({
            ...inputAdvance,
            IdAdvanceString: convertDobToISO(event.target.value), // Chuyển đổi ngày tháng sang ISO format và cập nhật giá trị startDate
        });
        setTimeout(() => {
            handleUserInput(event)
        }, 1000);
    }

    function handleUserInput(event) {
        if (event.type === "keydown" && event.key === "Enter") {
            if (event.target.value.trim() && handleCancel === true) {
                FetchEmployees(event.target.value);
            } else {
                toast.error("Vui lòng nhập mã nhân viên!");
            }
        } else if (event.type === "blur") {
            if (event.target.value.trim() && handleCancel === true) {
                FetchEmployees(event.target.value);
            } else {
                toast.error("Vui lòng nhập mã nhân viên!");
            }
        }

    }
    const handleNoteChange = (e) => {
        setInputAdvance({
            ...inputAdvance,
            note: convertDobToISO(e.target.value), // Chuyển đổi ngày tháng sang ISO format và cập nhật giá trị startDate
        });
    };

  function handleAmountInput(event) {
    const enteredAmount = parseInt(event.target.value, 10);
    const allowedAmount = parseInt(inputAdvance.maxAdvance, 10);

    if (enteredAmount > allowedAmount) {
      setInputAdvance({
        ...inputAdvance,
        amountAdvance: allowedAmount.toString(),
      });
      toast.warn("Số tiền ứng đã vượt quá số tiền tối đa!");
    } else {
      setInputAdvance({
        ...inputAdvance,
        amountAdvance: event.target.value,
      });
    }
  }

  const convertDobToISO = (dobstring) => {
    if (dobstring) {
      const parts = dobstring.split("-");
      if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
      return dobstring;
    }
    return dobstring;
  };

  console.log("inputAdvance", inputAdvance);

    return (
        <Modal className="modal" open={isModalOpenAdvance} onOk={handleOkAdvance}>
            <div className="modal-add-holiday">
                <div className="body">
                    <div className="head">
                        <h3>Tạo ứng lương</h3>
                    </div>
                </div>
                <div className="footer">
                    <div className="item-body">
                        <p>Nhập mã nhân viên:</p>
                        <input
                            type="number"
                            value={inputAdvance.IdAdvanceString}
                            placeholder="Nhập mã nhân viên"
                            onChange={handleCheckAncance}
                            onKeyDown={handleCheckAncance}
                            onBlur={handleCheckAncance}
                            disabled={action !== "add"}
                        />
                    </div>
                    <div className="item-body gray">
                        <p>Tên nhân viên:</p>
                        <input type="text" value={inputAdvance.nameUserAdvance} disabled />
                    </div>
                    <div className="item-body">
                        <p>Số tiền ứng (tối đa: {formatMoney(inputAdvance.maxAdvance)}):</p>
                        <input
                            type="text"
                            value={formatMoney(inputAdvance.amountAdvance)}
                            onChange={handleAmountInput}
                            placeholder="Số tiền ứng"
                            disabled={inputAdvance.nameUserAdvance === ""}
                        />
                    </div>
                    {action === "add" ? (
                        <div className="item-body">
                            <p>Ngày ứng:</p>
                            <input
                                type="date"
                                defaultValue={new Date().toISOString().split("T")[0]}
                                disabled
                            />
                        </div>
                    ) : (
                        <>
                            <div className="item-body">
                                <p>Ngày ứng:</p>
                                <input
                                    type="date"
                                    value={convertDobToISO(inputAdvance.date)}
                                    disabled
                                />
                            </div>
                        </>
                    )}
                    <div className="item-body">
                        <p>Lý do:</p>
                        <textarea
                            placeholder="Lý do"
                            value={inputAdvance.note}
                            onChange={handleNoteChange}
                            disabled={inputAdvance.nameUserAdvance === ""}
                        />
                    </div>
                    <div className="btn-footer">
                        <div className="btn cancel" onClick={() => {
                            setHandleCancel(false);
                            handleCancelAdvance()
                        }}>
                            Hủy bỏ
                        </div>
                        <div className="btn save" onClick={action === "add" ? handleCreateAdvanceSalary : handleUpdateAdvanceSalary}>
                            Lưu
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAdvance;
