import React from "react";
import { Modal, Select, Input, Form, Switch } from "antd";

const EditContractModal = ({
  isModalOpenEditContract,
  handleOkEditContract,
  handleCancelEditContract,
  handleChange,
  handleCancelViewContract,
  handleSaveContract,
  contractCode,
  setContractCode,
  contractStartDate,
  setContractStartDate,
  contractEndDate,
  setContractEndDate,
  contractType,
  setContractType,
  contractLink,
  setContractLink,
  contractStatus,
  setContractStatus,
  convertDobToISO,
  contractTypes,
  EditName,
  amount,
  handleContractAmountChange,
  setAmount,
  setOriginalOffice,
  originalOffice,
  handleFileChange,
  setsaveFileContract,
  saveFileContract
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenEditContract}
      onOk={handleOkEditContract}
      onCancel={handleCancelEditContract}
    >
      <div className="modal-add-roleyee-employee modal-contract">
        <div className="modal-head">
          <h3>Sửa hợp đồng</h3>
        </div>
        <div className="body-add-role-employee">
          <table>
            <thead className="thead-first"></thead>
            <div className="body-table body-table-contract">
              <tr>
                <div className="input-date">
                  <p className="salary-contract salary-file">Mã hợp đồng:</p>
                  <Input
                    className="select-input"
                    placeholder="Mã hợp đồng"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    value={contractCode} // Thêm dòng này để hiển thị giá trị từ state
                    onChange={(e) => setContractCode(e.target.value)} // Thêm dòng này để cập nhật giá trị vào state
                  />
                </div>
                <div className="input-date">
                  <p className="salary-contract salary-file">Loại hợp đồng:</p>
                  <Select
                    className="select-input"
                    value={contractType} // Thêm dòng này để hiển thị giá trị từ state
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => setContractType(value)} // Thêm dòng này để cập nhật giá trị vào state
                    options={
                      contractTypes
                        ? contractTypes.map((contractType) => ({
                          value: contractType.contractTypeId,
                          label: contractType.contractName,
                        }))
                        : []
                    }
                  />
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <p className="salary-contract">Lương hợp đồng:</p>
                  <Input type="text" placeholder="Lương hợp đồng" value={amount} onChange={handleContractAmountChange}></Input>
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <p className="salary-contract">Ngày bắt đầu hợp đồng:</p>
                  <Input
                    className="select-input"
                    placeholder="Thời gian bắt đầu"
                    type="date"
                    style={{
                      width: "100%",
                    }}
                    value={convertDobToISO(contractStartDate) || undefined} // Thêm dòng này để hiển thị giá trị từ state
                    onChange={(e) =>
                      setContractStartDate(convertDobToISO(e.target.value))
                    } // Thêm dòng này để cập nhật giá trị vào state
                  />
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <input type="file" onChange={(e) => setsaveFileContract(e.target.files[0])} />
                  <div className="input-date-cn">
                    <p>Trạng thái: </p>
                    <Form.Item valuePropName="checked" className="action">
                      <Switch
                        checked={contractStatus} // Thêm dòng này để hiển thị giá trị từ state
                        onChange={(checked) => setContractStatus(checked)} // Thêm dòng này để cập nhật giá trị vào state
                      />
                    </Form.Item>
                  </div>
                </div>
              </tr>
            </div>
            <thead className="thead-last"></thead>
          </table>
        </div>
        <div className="modal-footer modal-footer-add-employee add">
          <button className="btn-cancel" onClick={handleCancelEditContract}>
            Hủy bỏ
          </button>
          <button className="btn-edit btn-save" onClick={handleFileChange}>
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditContractModal;
