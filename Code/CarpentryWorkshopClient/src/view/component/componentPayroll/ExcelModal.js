import React, { useState } from "react";
import { Modal, Select } from "antd";
import { createYearOptions, getMonthsInYear } from "../../logicTime/getWeeDays";
import { ExportSalaryExcel, ExcelSalary } from "../../../sevices/PayrollSevice";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';

import FileSaver from 'file-saver';

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

    const readTemplate = async () => {
        try {
          const response = await fetch('/SalaryData.xlsx'); // Update the filename to match the actual filename
          if (!response.ok) {
            throw new Error(`Failed to fetch the template: ${response.statusText}`);
          }
          const arrayBuffer = await response.arrayBuffer();
      
          // Use arrayBuffer instead of buffer for the type
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          return workbook;
        } catch (error) {
          console.error('Error reading template:', error);
          throw error; // Re-throw the error to be caught by the caller
        }
      };
      
      const fillDataToTemplate = (workbook, jsonData) => {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const startingRow = 10;
      
        jsonData.forEach((item, index) => {
          const row = startingRow + index;
      
          // Fill the data directly
          worksheet[`C${row}`] = { v: item.employeeId };
          worksheet[`D${row}`] = { v: item.orderNumber };
          // ... Fill in other fields
      
          // Handle nested fields
          worksheet[`X${row}`] = { v: item.allowances.meal };
          // ... Continue with other nested fields
        });
      
        return workbook;
      };
      
      const exportToExcel = (workbook) => {
        XLSX.writeFile(workbook, 'ExportedData.xlsx');
      };
      
      const handleExport = async () => {
        try {
          const salaryData = await ExcelSalary(); // Assuming ExcelSalary is the function to fetch the salary data
          const workbook = await readTemplate();
          const filledWorkbook = fillDataToTemplate(workbook, salaryData.data);
          exportToExcel(filledWorkbook);
        } catch (error) {
          console.error('Error exporting Excel:', error);
        }
      };

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
                        <span className="save" onClick={handleExport}>
                            Tải xuống
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ExcelModal;
