import React from 'react';
import { Modal, Select, Input, Form, Switch } from "antd";

const EditContractModal = ({
  isModalOpenEditContract,
  handleOkEditContract,
  handleCancelEditContract,
  handleChange,
  handleCancelViewContract,
  handleSaveContract,
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
                <Input
                  className="select-input"
                  placeholder="Mã hợp đồng"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
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
                <div className="input-date">
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
                <div className="input-date-cn">
                  <p>Trạng thái: </p>
                  <Form.Item valuePropName="checked" className="action">
                    <Switch checked="true" />
                  </Form.Item>
                </div>
              </tr>
            </div>
            <thead className="thead-last"></thead>
          </table>
        </div>
        <div className="modal-footer modal-footer-add-employee add">
          <button className="btn-cancel" onClick={handleCancelViewContract}>
            Hủy bỏ
          </button>
          <button className="btn-edit btn-save" onClick={handleSaveContract}>
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditContractModal;
