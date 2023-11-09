import React from 'react';
import { Select, Input, Modal} from "antd";

const NewContractModal = ({
  isModalOpenAddContract,
  handleOkAddContract,
  handleCancelAddContract,
  handleChange,
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenAddContract}
      onOk={handleOkAddContract}
      onCancel={handleCancelAddContract}
    >
      <div className="modal-add-roleyee-employee modal-contract">
        <div className="modal-head">
          <h3>Thêm hợp đồng</h3>
        </div>
        <div className="body-add-role-employee body-modal-add-contract">
          <table>
            <thead className="thead-first">
              Bạn cần tạo hợp đồng để hoàn tất thêm nhân viên
            </thead>
            <div className="body-table body-table-contract">
              <tr>
                <Input
                  className="select-input"
                  placeholder="Mã hợp đồng"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
                <Select
                  className="select-input"
                  defaultValue="lucy"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                    {
                      value: "disabled",
                      label: "Disabled",
                    },
                  ]}
                />
              </tr>

              <tr>
                <div className="input-date">
                  <Input
                    className="select-input"
                    placeholder="Thời gian bắt đầu"
                    type="date"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <div className="input-date">
                  <Input
                    className="select-input"
                    placeholder="Thời gian bắt đầu"
                    type="date"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <Input
                    className="select-input"
                    placeholder="Đường dẫn hợp đồng"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </tr>
            </div>
            <thead className="thead-last"></thead>
          </table>
        </div>
        <div className="modal-footer modal-footer-add-employee add">
          <button className="btn-cancel" onClick={handleCancelAddContract}>
            Hủy bỏ
          </button>
          <button
            className="btn-edit btn-save"
            onClick={handleOkAddContract}
          >
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewContractModal;
