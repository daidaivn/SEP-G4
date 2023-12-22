import React from "react";
import { Input, Modal, TimePicker } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const EditEmployee = ({
  isModalOpenListEmployee,
  handleCancelListEmployee,
  employCheckInOut,
  convertDobToISO,
  convertTimeToInputFormat,
  handleOkListEmployee,
  UpdateCheckInOutForEmployee,
  showModalListEmployee,
  date,
  employeeId,
  actionEdit
}) => {

  const handleTimeInputChange = (timeIn, timeOut, id) => {

    if (timeIn === null || timeOut === null || timeIn === '' || timeOut === '' || timeIn === 'Invalid Date' || timeOut === 'Invalid Date') {
      return;
    }
    if (timeIn === 1) {
      timeIn = "";
    }
    if (timeOut === 1) {
      timeOut = "";
    }
    console.log('timeIn', timeIn);
    console.log('timeOut', timeOut);
    toast.promise(
      UpdateCheckInOutForEmployee(id, timeIn, timeOut)
        .then((data) => {
          showModalListEmployee(employeeId, date);
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
        success: "",
      }
    );
  };
  return (
    <>
      {/* //chinh sua nhan vien */}
      <Modal
        className="modal"
        open={isModalOpenListEmployee}
        onCancel={handleCancelListEmployee}
      >
        <div className="modal-add-roleyee-employee modal-shift-all">
          <div className="modal-head-employee modal-shift-head ">
            {!actionEdit ? <h3>Thông tin điểm danh</h3> : <h3>Chỉnh sửa điểm danh</h3>} 
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
            <table className="table-modal-checkin">
              <thead>
                <td>STT</td>
                <td>Giờ bắt đầu</td>
                <td>Giờ kết thúc</td>
              </thead>
              <div className="body-table-edit scrollbar" id="style-15">
                {employCheckInOut.map((employee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <TimePicker
                        disableClock
                        defaultValue={dayjs(
                          convertTimeToInputFormat(employee.timeIn),
                          "HH:mm"
                        )}
                        format="HH:mm"
                        onChange={(newTime) =>
                          handleTimeInputChange(
                            dayjs(newTime).format("HH:mm"),
                            1,
                            employee.checkInOutId
                          )
                        }
                        onBlur={handleCancelListEmployee}
                        disabled={!actionEdit} // Disable TimePicker if actionEdit is false
                      />
                    </td>
                    <td>
                      <TimePicker
                        disableClock
                        defaultValue={dayjs(
                          convertTimeToInputFormat(employee.timeout),
                          "HH:mm"
                        )}
                        format="HH:mm"
                        onChange={(newTime) =>
                          handleTimeInputChange(
                            1,
                            dayjs(newTime).format("HH:mm"),
                            employee.checkInOutId
                          )
                        }
                        disabled={!actionEdit} // Disable TimePicker if actionEdit is false
                      />
                    </td>
                  </tr>
                ))}

                <tr></tr>
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
