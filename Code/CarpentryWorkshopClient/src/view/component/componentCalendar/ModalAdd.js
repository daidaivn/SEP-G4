import React from 'react';
import { Input, Select , Modal} from 'antd';

const ModalAdd = ({ isModalOpeAdd, handleOkAdd, handleCancelAdd , handleChange}) => {
    return (
        <div className="modal-add">
          <Modal
            className="modal"
            open={isModalOpeAdd}
            onOk={handleOkAdd}
            onCancel={handleCancelAdd}
          >
            <div className="modal-detail-all">
              <div className="head-modal">
                <p>Thêm công việc</p>
              </div>
              <div className="body-edit">
                <div className="item-modal">
                  <p>Tên công việc</p>
                  <Input type="text"></Input>
                </div>
                <div className="item-modal">
                  <p>Loại sản phẩm:</p>
                  <Select
                    defaultValue="lucy"
                    style={{
                      width: 120,
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
                    ]}
                  />
                </div>
                <div className="item-modal">
                  <p>Đơn giá 1 sản phẩm</p>
                  <Input type="text" placeholder="ví dụ: 20.000"></Input>
                </div>
                <div className="item-modal">
                  <p>Số sản phẩm cần sản xuất</p>
                  <Input type="text" placeholder="ví dụ: 500.000"></Input>
                </div>
                <div className="item-modal">
                  <p>Khu vục sản xuất</p>
                  <Select
                    defaultValue="lucy"
                    style={{
                      width: 120,
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
                    ]}
                  />
                </div>
                <div className="item-modal">
                  <p>Thời gian bắt đầu:</p>
                  <Input type="date"></Input>
                </div>
                <div className="item-modal">
                  <p>Thời gian kết thúc</p>
                  <Input type="date"></Input>
                </div>
                <div className="footer-modal">
                  <span className="back" onClick={handleCancelAdd}>
                    Hủy bỏ
                  </span>
                  <span className="edit save" onClick={handleOkAdd}>
                    Lưu
                  </span>
                </div>
              </div>
            </div>
          </Modal>
        </div>
    );
};

export default ModalAdd;