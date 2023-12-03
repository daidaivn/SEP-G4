import React, { useState } from "react";
import { Modal, Select } from "antd";
import { createYearOptions, getMonthsInYear } from "../../logicTime/getWeeDays";
import { ExportSalaryExcel, ExcelSalary } from "../../../sevices/PayrollSevice";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

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
        const response = await fetch('/SalaryData (1).xlsx');
        if (!response.ok) {
            throw new Error(`Failed to fetch the template: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        return workbook;
    };


    const fillDataToTemplate = (workbook, jsonData, formatReference) => {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const startingRow = 10;

        jsonData.forEach((item, index) => {
            const row = startingRow + index;
            // Copy formatting and set value for each cell
            copyCellFormat(worksheet, formatReference.employeeId, `C${row}`, { v: item.employeeId });
            copyCellFormat(worksheet, formatReference.orderNumber, `D${row}`, { v: item.orderNumber });
            // ... Điền các trường khác và sao chép định dạng
            for (let col = 66; col <= 77; col++) { // 66 là mã ASCII cho 'B', 77 là mã ASCII cho 'M'
                const colRef = String.fromCharCode(col);
                copyCellFormat(worksheet, 'B8', `${colRef}${row}`, { v: item.someData }); // Thay someData bằng dữ liệu thích hợp
            }
        });

        return workbook;
    };

    const copyCellFormat = (worksheet, sourceCellRef, targetCellRef, newData) => {
        const sourceCell = worksheet[sourceCellRef];
        const targetCell = worksheet[targetCellRef];
        
        if (sourceCell && targetCell) {
            targetCell.s = { ...sourceCell.s, fill: { ...sourceCell.s.fill } };
            targetCell.v = newData.v;
        } else if (!targetCell) {
            worksheet[targetCellRef] = {
                ...newData,
                s: sourceCell ? { ...sourceCell.s, fill: { ...sourceCell.s.fill } } : { fill: { fgColor: { rgb: 'd9e2f3' } } },
            };
        }
    };
    

    const formatReference = {
        employeeId: 'C10',  // Reference format cell for employeeId
        orderNumber: 'D10', // Reference format cell for orderNumber
        // ... Other format references
    };

    const exportToExcel = (workbook) => {
        const bookType = "xlsx";
        const wopts = { bookType, bookSST: false, type: "array" };
        const wbout = XLSX.write(workbook, wopts);
        FileSaver.saveAs(new Blob([wbout], { type: "application/octet-stream" }), "ExportedData.xlsx");
    };

    const handleExport = async () => {
        try {
            const salaryData = await ExcelSalary();
            const workbook = await readTemplate();
            const filledWorkbook = fillDataToTemplate(workbook, salaryData.data, formatReference);
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
