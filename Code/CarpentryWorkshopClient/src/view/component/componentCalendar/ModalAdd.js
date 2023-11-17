import React from "react";
import { Input, Select, Modal } from "antd";
import { getCurrentDateSEAsia, getTomorrowDateSEAsia } from "../../logicTime/getDate";

const ModalAdd = ({
  isModalOpeAdd,
  handleOkAdd,
  handleCancelAdd,
  workDetailById,
  setWorkDetailById,
  handleChangeUnitCostId,
  allUnitCosts,
  handleChangeWorkAreaId,
  allWorkAreas,
  convertDate,
  handleAddWork,
}) => {
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
            <p>Sửa công việc</p>
          </div>
          <div className="body-edit">
            <div className="item-modal">
              <p>Tên công việc</p>
              <Input
                type="text"
                placeholder="Nhập tên công việc"
                value={workDetailById ? workDetailById.workName : ''}
                onChange={(e) =>
                  setWorkDetailById({
                    ...(workDetailById || {}),
                    workName: e.target.value,
                  })
                }
              />

            </div>
            <div className="item-modal">
              <p>Loại sản phẩm:</p>
              {allUnitCosts && allUnitCosts.length > 0 ? (
                <Select
                  style={{ width: 120 }}
                  placeholder="Chọn sản phẩm"
                  value={workDetailById && allUnitCosts.some(uc => uc.uniCostId === workDetailById.unitCostId)
                    ? workDetailById.unitCostId
                    : undefined}
                  onChange={handleChangeUnitCostId}
                  options={allUnitCosts.map((unitCost) => ({
                    value: unitCost.uniCostId,
                    label: unitCost.unitName,
                  }))}
                />
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
            <div className="item-modal">
              <p>Đơn giá 1 sản phẩm</p>
              <Input
                type="number"
                value={workDetailById.unitCost}
                placeholder="Nhập giá sản phẩm"
                onChange={(e) => {
                  if (e.target.value.match(/^\d*$/)) { // Chỉ cho phép số nguyên
                    setWorkDetailById({ ...workDetailById, unitCost: e.target.value });
                  }
                }}
              />
            </div>
            <div className="item-modal">
              <p>Số sản phẩm cần sản xuất</p>
              <Input
                type="number"
                value={workDetailById.totalProduct}
                placeholder="Nhập số sản phẩm cần sản xuất"
                onChange={(e) => {
                  if (e.target.value.match(/^\d*$/)) { // Chỉ cho phép số nguyên
                    setWorkDetailById({ ...workDetailById, totalProduct: e.target.value });
                  }
                }}
              />
            </div>
            <div className="item-modal">
              <p>Khu vực:</p>
              {allWorkAreas && allWorkAreas.length > 0 ? (
                <Select
                  style={{ width: 120 }}
                  placeholder="Chọn khu vực"
                  value={workDetailById && allWorkAreas.some(area => area.workAreaId === workDetailById.workAreaId)
                    ? workDetailById.workAreaId
                    : undefined}
                  onChange={handleChangeWorkAreaId}
                  options={allWorkAreas.map((allWorkArea) => ({
                    value: allWorkArea.workAreaId,
                    label: allWorkArea.workAreaName,
                  }))}
                />
              ) : (
                <p>Không có khu vực nào</p>
              )}
            </div>
            <div className="item-modal">
              <p>Thời gian bắt đầu:</p>
              <Input
                type="date"
                placeholder="Chọn ngày bắt đầu"
                value={workDetailById && workDetailById.timeStart ? convertDate(workDetailById.timeStart) : convertDate(getCurrentDateSEAsia())}
                min={convertDate(getCurrentDateSEAsia())}
                onChange={(e) =>
                  setWorkDetailById({
                    ...workDetailById,
                    timeStart: convertDate(e.target.value),
                  })
                }
              />
            </div>
            <div className="item-modal">
              <p>Thời gian kết thúc:</p>
              <Input
                type="date"
                placeholder="Chọn ngày kết thúc"
                value={workDetailById && workDetailById.timeEnd ? convertDate(workDetailById.timeEnd) : convertDate(getTomorrowDateSEAsia())}
                min={convertDate(getTomorrowDateSEAsia())}
                onChange={(e) =>
                  setWorkDetailById({
                    ...workDetailById,
                    timeEnd: convertDate(e.target.value),
                  })
                }
              />
            </div>

            <div className="footer-modal">
              <span className="back" onClick={handleCancelAdd}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleAddWork}>
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
