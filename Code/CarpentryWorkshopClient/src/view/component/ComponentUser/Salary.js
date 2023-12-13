import React from "react";
import { Input, Modal, Select } from "antd";

import { formatMoney } from "../../logicTime/formatAll";
const Salary = ({
  isModalOpenPayroll,
  handleOkPayroll,
  handleCancelPayroll,
  date,
  setDate,
  yearOptions,
  monthOptions,
  setMonths,
  months,
  salaryUser,
}) => {

  return (
    <>
      <Modal
        className="modal"
        open={isModalOpenPayroll}
        on
        Ok={handleOkPayroll}
        onCancel={handleCancelPayroll}
      >
        <div className="modal-payroll payroll-fix">
          <div className="modal-head">
            <div className="body-payroll1">
              <p>Bảng lương</p>
              <div className="list-filter">
                <Select
                  className="select-input"
                  value={`Tháng ${months}`}
                  style={{ width: 120 }}
                  onChange={setMonths}
                  options={monthOptions.map((month) => ({
                    value: month.value,
                    label: `Tháng ${month.label}`,
                  }))}
                  placeholder="Chọn năm"
                />
              </div>
              <div className="list-filter year">
                <Select
                  className="select-input"
                  value={date}
                  style={{ width: 120 }}
                  onChange={setDate}
                  options={yearOptions}
                  placeholder="Chọn năm"
                />
              </div>
            </div>
            <div className="close">
              <svg
                onClick={handleCancelPayroll}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30 2.30769L17.3077 15L30 27.6923L27.6923 30L15 17.3077L2.30769 30L0 27.6923L12.6923 15L0 2.30769L2.30769 0L15 12.6923L27.6923 0L30 2.30769Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="body-payroll">
            <div className="body-child1 scrollbar" id="style-15">
              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">1.</p>
                    <p>Lương chính</p>
                    <div className="money"></div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Lương thực tế</p>
                    <div className="money">
                      <p>
                        {salaryUser.actualDaySalary === 0
                          ? "0"
                          : formatMoney(salaryUser.actualDaySalary)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Lương làm thêm</p>
                    <div className="money">
                      <p>
                        {salaryUser.overtimesalaryUser === 0
                          ? "0"
                          : formatMoney(salaryUser.overtimeSalary)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Lương kinh doanh sản lưởng</p>
                    <div className="money">
                      <p>
                        {salaryUser.businessSalary === 0
                          ? "0"
                          : formatMoney(salaryUser.businessSalary)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">2.</p>
                    <p>Phụ cấp</p>
                    <div className="money"></div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Ăn trưa</p>
                    <div className="money">
                      <p>
                        {salaryUser && salaryUser.allowances && salaryUser.allowances.meal
                          ? formatMoney(salaryUser.allowances.meal)
                          : "0"} VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Đồng phục</p>
                    <div className="money">
                      <p>
                        {salaryUser && salaryUser.allowances && salaryUser.allowances.uniform
                          ? formatMoney(salaryUser.allowances.uniform)
                          : "0"} VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Xăng xe</p>
                    <div className="money">
                      <p>
                        {salaryUser && salaryUser.allowances && salaryUser.allowances.petrol
                          ? formatMoney(salaryUser.allowances.petrol)
                          : "0"} VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">3.</p>
                    <p>Thưởng</p>
                    <div className="money"></div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Thưởng công ty</p>
                    <div className="money">
                      <p>
                        {salaryUser.companyWideBonus === 0
                          ? "0"
                          : formatMoney(salaryUser.companyWideBonus)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Thưởng cá nhân</p>
                    <div className="money">
                      <p>
                        {salaryUser.bonus === 0 ? "0" : formatMoney(salaryUser.bonus)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Các khoản khác</p>
                    <div className="money">
                      <p>
                        {salaryUser.specialOccasion === 0
                          ? "0"
                          : formatMoney(salaryUser.specialOccasion)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">4.</p>
                    <p>Khoản trừ</p>
                    <div className="money"></div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>BHXH</p>
                    <div className="money">
                      <p>
                        {salaryUser.deductions && salaryUser.deductions.socialInsurance !== undefined
                          ? formatMoney(salaryUser.deductions.socialInsurance)
                          : "0"} VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>BHYT</p>
                    <div className="money">
                      <p>
                        {salaryUser.deductions && salaryUser.deductions.healthInsurance !== undefined
                          ? formatMoney(salaryUser.deductions.healthInsurance)
                          : "0"} VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>BHTT</p>
                    <div className="money">
                      <p>
                        {salaryUser.deductions && salaryUser.deductions.unemploymentInsurance !== undefined
                          ? formatMoney(salaryUser.deductions.unemploymentInsurance)
                          : "0"} VND
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">-</p>
                    <p>Phí công đoàn</p>
                    <div className="money">
                      <p>
                        {salaryUser.deductions && salaryUser.deductions.unionFees !== undefined
                          ? formatMoney(salaryUser.deductions.unionFees)
                          : "0"} VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">5.</p>
                    <p>Thuế thu nhập cá nhân</p>
                    <div className="money">
                      <p>
                        {salaryUser.personalIncomeTax === 0
                          ? "0"
                          : formatMoney(salaryUser.personalIncomeTax)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-child1-col">
                <div className="child1-col">
                  <div className="child1-text">
                    <p className="text1">6.</p>
                    <p>Lương ứng</p>
                    <div className="money">
                      <p>
                        {salaryUser.advances === 0
                          ? "0"
                          : formatMoney(salaryUser.advances)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-child2">
              <div className="body-child1-cn">
                <div className="item-chil1">
                  <div className="item-chil1-cn">
                    <p>Tổng số tiền nhận được</p>
                    <div className="money">
                      <p>
                        {salaryUser.actualReceived === 0
                          ? "0"
                          : formatMoney(salaryUser.actualReceived)}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Salary;
