import React from "react";
import { Modal } from "antd";
import { formatMoney } from "../../logicTime/formatAll";
const DeductionsAll = ({
  isModalOpenDeductions,
  handleOkDeductions,
  handleCancelDeductions,
  salaryDetail,
}) => {
  return (
    <>
      <div className="AllowanceAll">
        <Modal
          className="modal-AllowanceAll"
          open={isModalOpenDeductions}
          onOk={handleOkDeductions}
          onCancel={handleCancelDeductions}
        >
          <div className="modal-allowance-all">
            <div className="head-allowance-all">
              <div className="text-head">
                <p>Chi tiết danh sách các khoản trừ</p>
                <svg
                  onClick={handleCancelDeductions}
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
            <div className="body-allowance-all">
              <thead>
                <tr>
                  <div className="child1">MNV</div>
                  <div className="item-child">Họ và tên</div>
                  <div className="item-child">BHXH</div>
                  <div className="item-child">BHYT</div>
                  <div className="item-child">BHTT</div>
                  <div className="item-child">Phí công đoàn</div>
                  <div className="item-child">Tổng</div>
                </tr>
              </thead>
              <div className="tbody scrollbar" id="style-15">
                {salaryDetail.length === 0 ? (
                  <p>Thông tin chưa sẵn sàng hoặc không tồn tại.</p>
                ) : (
                  <React.Fragment>
                    {Array.isArray(salaryDetail) &&
                      salaryDetail.map((item, index) => (
                        <div className="item-body">
                          <div className="item-first">{index + 1}</div>
                          <div className="item-second">{item.fullName}</div>
                          <div className="item-child-body">
                            {item.deductions.socialInsurance === 0
                              ? "0"
                              : formatMoney(item.deductions.socialInsurance)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.deductions.healthInsurance === 0
                              ? "0"
                              : formatMoney(item.deductions.healthInsurance)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.deductions.unemploymentInsurance === 0
                              ? "0"
                              : formatMoney(item.deductions.unemploymentInsurance)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.deductions.unionFees === 0
                              ? "0"
                              : formatMoney(item.deductions.unionFees)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.deductions.socialInsurance +
                              item.deductions.healthInsurance +
                              item.deductions.unemploymentInsurance +
                              item.deductions.unionFees ===
                            0
                              ? "0"
                              : formatMoney(
                                  item.deductions.socialInsurance +
                                    item.deductions.healthInsurance +
                                    item.deductions.unemploymentInsurance +
                                    item.deductions.unionFees
                                )}{" "}
                            VNĐ
                          </div>
                        </div>
                      ))}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default DeductionsAll;
