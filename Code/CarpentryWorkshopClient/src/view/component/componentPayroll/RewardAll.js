import React from "react";
import { Input, Modal, Select } from "antd";
import { CreateAndUpdateCompanyRerward } from "../../../sevices/PayrollSevice";
import { toast } from "react-toastify";
const RewardAll = ({
  isModalOpenRewardAll,
  handleChange,
  bonusAmount,
  bonusReason,
  bonusName,
  handleBonusAmountChange,
  setBonusName,
  setBonusReason,
  resetPersonDetail,
  featchDataReward,
  setIsModalOpenRewardAll,
  validateData,
  actionEdit,
  employeeInput,
}) => {
  const handleOkRewardAll = () => {
    const isDataValid = validateData();

    if (!isDataValid) {
      return;
    }
    let id = 0;
    if (actionEdit == "RewardAllEdit") {
      id = employeeInput.id;
    }
    toast.promise(
      CreateAndUpdateCompanyRerward(id, bonusAmount, bonusName, bonusReason)
        .then((data) => {
          resetPersonDetail();
          featchDataReward();
          setIsModalOpenRewardAll(false);
          return toast.success(data);
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang tải dữ liệu",
      }
    );
  };
  const handleCancelRewardAll = () => {
    resetPersonDetail();
    setIsModalOpenRewardAll(false);
  };
  return (
    <>
      {/* Modal Thưởng toàn thể công ty */}
      <Modal
        className="modal"
        open={isModalOpenRewardAll}
        onOk={handleOkRewardAll}
        onCancel={handleCancelRewardAll}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Thưởng toàn thể công ty</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Loại thưởng</p>
              <Input
                type="text"
                value={bonusName}
                onChange={(e) => setBonusName(e.target.value)}
              ></Input>
            </div>
            <div className="item-modal">
              <p>Số tiền thưởng:</p>
              <Input
                type="text"
                value={bonusAmount}
                onChange={handleBonusAmountChange}
              ></Input>
            </div>
            <div className="item-modal">
              <p>Chi tiết thưởng</p>
              <Input
                type="text"
                placeholder="Ví lý do gì đấy nên được thưởng các quyền lợi"
                value={bonusReason}
                onChange={(e) => setBonusReason(e.target.value)}
              ></Input>
            </div>

            <div className="footer-modal">
              <span className="back" onClick={handleCancelRewardAll}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleOkRewardAll}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RewardAll;
