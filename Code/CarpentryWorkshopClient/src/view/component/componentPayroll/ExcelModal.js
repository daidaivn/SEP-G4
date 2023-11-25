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
    months,
    date,
    setMonths,
    monthOptions,
    setDate,
    yearOptions
}) => {

 


    const handleExportSalaryExcel = () => {
        ExportSalaryExcel(months, date)
            .then((data) => {
                handleOkExcel();
                const fileName = `Bảng lương ${months}-${date}.xlsx`;
                const url = window.URL.createObjectURL(new Blob([data]));
    
                // Tạo một thẻ a để tạo link tải xuống và kích thước nó
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
    
                // Simulate click để bắt đầu tải xuống
                link.click();
    
                // Xóa thẻ và URL sau khi đã tải xuống
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.log('error', error);
            });
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
                            Tải xuống
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ExcelModal;
