import React, { useState } from "react";
import { Modal, Select } from "antd";
import { createYearOptions, getMonthsInYear } from "../../logicTime/getWeeDays";
import { ExportSalaryExcel } from "../../../sevices/PayrollSevice";
import { toast } from "react-toastify";

const ExcelModal = ({
    isModalOpenExcel,
    handleOkExcel,
    handleCancelExcel,
    handleChange,
}) => {

    const yearOptions = createYearOptions();
    const [date, setDate] = useState(new Date().getFullYear());

    const monthOptions = getMonthsInYear(date)
    const currentMonth = new Date().getMonth();
    const [months, setMonths] = useState(currentMonth.toString());

    console.log('months', months);
    console.log('months', date);


    const handleExportSalaryExcel = () => {
        toast.promise(
          new Promise((resolve) => {
            ExportSalaryExcel(months, date)
              .then((data) => {
                const blob = new Blob([data], { type: 'application/octet-stream' });
                const url = window.URL.createObjectURL(blob);
      
                const a = document.createElement('a');
                a.href = url;
                a.download = `Bảng lương công ty tháng ${months}-${date}.xlsx`; // Sử dụng biến months
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
      
                handleOkExcel();
                resolve(data);
              })
              .catch((error) => {
                resolve(Promise.reject(error));
              });
          }),
          {
            pending: 'Đang xử lý dữ liệu',
            success: 'Tải xuống thành công',
            error: 'Lỗi dữ liệu',
          }
        );
      };
      
      

    return (
        <Modal
            open={isModalOpenExcel}
            onOk={handleOkExcel}
            onCancel={handleCancelExcel}
        >
            <div className="modal-excel">
                <div className="head-excel">Xuất Excel</div>
                <div className="body-excel">
                    <div className="item">
                        <p>Chọn tháng:</p>
                        <Select
                            className="select-input"
                            value={`Tháng ${months}`}
                            style={{ width: 120 }}
                            onChange={setMonths}
                            options={monthOptions.map(month => ({ value: month.value, label: `Tháng ${month.label}` }))}
                            placeholder="Chọn năm"
                        />
                    </div>
                    <div className="item">
                        <p>Chọn năm:</p>
                        <Select
                            className="select-input"
                            value={date}
                            style={{ width: 120 }}
                            onChange={setDate}
                            options={yearOptions}
                            placeholder="Chọn năm"
                        />
                    </div>
                    <div className="footer">
                        <span className="back" onClick={handleCancelExcel}>
                            Hủy bỏ
                        </span>
                        <span className="save" onClick={handleExportSalaryExcel}>
                            Xác nhận
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ExcelModal;
