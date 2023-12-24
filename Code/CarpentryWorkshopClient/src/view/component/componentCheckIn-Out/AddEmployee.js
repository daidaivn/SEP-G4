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
  convertTimeToInputFormat,

}) => {
  const [timeIn, setTimeIn] = useState("00:00:01");
  const [timeOut, setTimeOut] = useState("00:00:01");
  const [totalTime, setTotalTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (timeIn && timeOut) {
      const startTime = dayjs(timeIn, "HH:mm:ss");
      const endTime = dayjs(timeOut, "HH:mm:ss");
  
      if (endTime.isBefore(startTime)) {
        setErrorMessage("Vui lòng chọn thời gian bắt đầu không được nhỏ hơn thời gian kết thúc");
        setTotalTime("");
      } else {
        const duration = endTime.diff(startTime, "second");
  
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
  
        setTotalTime(`${hours} hours ${minutes} minutes`);
        setErrorMessage("");
      }
    } else {
      setTotalTime("");
      setErrorMessage("");
    }
  }, [timeIn, timeOut]);
  


  const handleTimeInputChange = (timeIn, timeOut) => {
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
            throw toast.error(error.response.data);
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
        onCancel={() => {
          handleCancelAddEmployee();
          setTimeIn("00:00:01");
          setTimeOut("00:00:01");
        }
      }
      >
        <div className="modal-add-roleyee-employee modal-shift-all">
          <div className="modal-head-employee modal-shift-head ">
            <h3>Điểm danh bù</h3>
          </div>
          <div className="body-add-role-employee">
            <p>
              {errorMessage ? errorMessage : timeIn && timeOut
                ? `Tổng thời gian điểm danh bù là: ${totalTime}`
                : "Vui lòng chọn thời gian bắt đầu và kết thúc"}
            </p>
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
                      value={dayjs(
                        convertTimeToInputFormat(timeIn),
                        "HH:mm:ss"
                      )}
                      format="HH:mm:ss"
                      onChange={(newTime) =>
                        setTimeIn(dayjs(newTime).format("HH:mm:ss"))
                      }
                    />
                  </td>
                  <td>
                    <TimePicker
                      disableClock
                      value={dayjs(
                        convertTimeToInputFormat(timeOut),
                        "HH:mm:ss"
                      )}
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
                <span className="back" onClick={() => {
                  handleCancelAddEmployee();
                  setTimeIn("00:00:01");
                  setTimeOut("00:00:01");
                }}>
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
