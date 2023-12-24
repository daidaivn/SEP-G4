import React, { useState, useEffect } from "react";
import { AddCheckInOutForEmployee } from "../../../sevices/TimekeepingService";
import { Input, Modal, TimePicker } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const AddEmployee = ({
  handleCancelListEmployee,
  isModalOpenAddEmployee,
  handleCancelAddEmployee,
  date,
  employeeId,
  FetchTimeKeepingInfo,
}) => {
    const [timeIn, setTimeIn] = useState("");
    const [timeOut, setTimeOut] = useState("");
  const handleTimeInputChange = (timeIn, timeOut) => {
    if (
      timeIn === null ||
      timeOut === null ||
      timeIn === "" ||
      timeOut === "" ||
      timeIn === "Invalid Date" ||
      timeOut === "Invalid Date"
    ) {
      return;
    }
    console.log("timeIn", timeIn);
    console.log("timeOut", timeOut);
    console.log("enmployId", employeeId);
    console.log("date", date);
    toast.promise(
      AddCheckInOutForEmployee(employeeId, timeIn, timeOut, date)
        .then((data) => {
          FetchTimeKeepingInfo();
          setTimeIn("");
          setTimeOut("");
          handleCancelAddEmployee();
          return data;
        })

        .catch((error) => {
          if (error.response && error.response.status === 404) {
            throw toast.error(error.response.data);
          } else {
            throw toast.error(error.response.data);
          }
        }),
      {
        pending: "Đang xử lý",
        success: "Thêm dữ liệu điểm danh thành công",
      }
    );
  };

  return (
    <>
      {/* //chinh sua nhan vien */}
      <Modal
        className="modal"
        open={isModalOpenAddEmployee}
        onCancel={handleCancelAddEmployee}
      >
        <div className="modal-add-roleyee-employee modal-shift-all">
          <div className="modal-head-employee modal-shift-head ">
            <h3>Điểm danh bù</h3>
          </div>
          <div className="body-add-role-employee">
            <table className="table-modal-checkin">
              <thead>
                <td></td>
                <td>Giờ bắt đầu</td>
                <td>Giờ kết thúc</td>
              </thead>
              <div className="body-table-edit scrollbar" id="style-15">
                <tr>
                  <td></td>
                  <td>
                    <TimePicker
                      disableClock
                      format="HH:mm:ss"
                      onChange={(newTime) =>
                        setTimeIn(dayjs(newTime).format("HH:mm:ss"))
                      }
                    />
                  </td>
                  <td>
                    <TimePicker
                      disableClock
                      format="HH:mm:ss"
                      onChange={(newTime) =>
                        setTimeOut(dayjs(newTime).format("HH:mm:ss"))
                      }
                    />
                  </td>
                </tr>
                <tr></tr>
              </div>
              <div className="footer-modal">
                <span className="back" onClick={handleCancelAddEmployee}>
                  Thoát
                </span>
                <span className="edit save" onClick={() => handleTimeInputChange(timeIn, timeOut)}>
                  Lưu
                </span>
              </div>
              <thead className="thead-last"></thead>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddEmployee;
