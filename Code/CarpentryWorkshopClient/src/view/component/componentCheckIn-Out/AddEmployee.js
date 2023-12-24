import React, { useState, useEffect } from "react";

import { Input, Modal, TimePicker } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const AddEmployee = ({
    handleCancelListEmployee,
    isModalOpenAddEmployee,
    handleCancelAddEmployee,
    date
}) => {

    const [employeeTimeKeepings, setEmployeeTimeKeepins] = useState({
        startDate: "",
        enđate: ""
    });


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
                                            format="HH:mm"
                                            onBlur={handleCancelListEmployee}
                                        />
                                    </td>
                                    <td>
                                        <TimePicker
                                            disableClock
                                            format="HH:mm"
                                        />
                                    </td>
                                </tr>
                                <tr></tr>
                            </div>
                            <div className="footer-modal">
                                <span className="back" onClick={handleCancelAddEmployee}>
                                    Thoát
                                </span>
                                <span className="edit save" onClick={handleCancelAddEmployee}>
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
