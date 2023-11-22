import React from "react";
import { Input, Modal, Switch, Form, Select } from "antd";

const ListModuleDetail3 = ({
  isModalOpenDetailShift,
  handleOkDetailShift,
  handleCancelDetailShift,
  actionWork,
  allUnitCosts,
  workDetailById,
  handleChangeUnitCostId,
  setWorkDetailById,
  allWorkAreas,
  handleChangeWorkAreaId,
  convertDate,
  getCurrentDateSEAsia,
  setIsModalOpenDetailShift
}) => {
  
  const CheckActionEditAndAdd =() =>{
    if(actionWork === "addWork"){
      setIsModalOpenDetailShift(false);
    }
    else{
      setIsModalOpenDetailShift(false);
    }
  }


  return (
    <div className="modal-detail ">
      <Modal
        className="modal"
        open={isModalOpenDetailShift}
        onOk={handleOkDetailShift}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            {
              actionWork === "addWork" ? (<p>Thêm công việc</p>) : (<p>Sửa công việc</p>)
            }
          </div>
          <div className="body-modal">
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
                <Select
                  style={{ width: 120 }}
                  placeholder="Không có sản phẩm nào"
                />
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
                <Select
                  style={{ width: 120 }}
                  placeholder="Không có khu vực nào"
                />
              )}
            </div>
            <div className="item-modal">
              <p>Thời gian bắt đầu:</p>
              <Input
                type="date"
                placeholder="Chọn ngày bắt đầu"
                value={workDetailById && convertDate(workDetailById.timeStart) ? convertDate(workDetailById.timeStart) : convertDate(getCurrentDateSEAsia())}
                min={convertDate(getCurrentDateSEAsia())}
                onChange={(e) =>
                  setWorkDetailById({
                    ...workDetailById,
                    timeStart: convertDate(e.target.value),
                  })
                }
              />
            </div>
            <div className="footer-modal">
              <span className="back" onClick={handleCancelDetailShift}>
                Hủy bỏ
              </span>
              {
               <span className="save" onClick={CheckActionEditAndAdd}>
                  Lưu
                </span>
              }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListModuleDetail3;
