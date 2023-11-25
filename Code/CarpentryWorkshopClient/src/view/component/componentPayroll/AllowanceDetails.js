import React from "react";
import { Input, Modal } from "antd";
import { formatMoney } from "../../logicTime/formatAll";

const AllowanceDetails = ({
  isModalOpenAllowance,
  handleOkAllowance,
  handleCancelAllowance,
  dataAllowance
}) => {
  
  return (
    <>
      {/* Modal Chi tiết trợ cấp */}
      <Modal
        className="modal"
        open={isModalOpenAllowance}
        on
        Ok={handleOkAllowance}
        onCancel={handleCancelAllowance}
      >
        <div className="modal-payroll payroll-fix">
          <div className="modal-head">
            <div className="body-payroll1">
              <p>Chi tiết phụ cấp</p>
            </div>
            <div className="close">
              <svg
                onClick={handleCancelAllowance}
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
              {dataAllowance.allowances && dataAllowance.allowances.map((allowance, index) => (
                <div className="item-child1-col" key={index}>
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">{index + 1}.</p>
                      <p>{allowance.allowanceName}</p>
                      <div className="money">
                        <p>{allowance.amounts && formatMoney(allowance.amounts)} VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="body-child2">
              <div className="body-child1-cn">
                <div className="item-chil1">
                  <div className="item-chil1-cn">
                    <p>Tổng số tiền trợ cấp</p>
                    <div className="money">
                      <p>{formatMoney(dataAllowance.totalAmount)} VND</p>
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
export default AllowanceDetails;
