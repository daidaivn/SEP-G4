import React from "react";
import { toast } from "react-toastify";
import { Input, Modal, Switch, Form, Select } from "antd";
import { AddWork, UpdateWork } from "../../../sevices/CalendarSevice";


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
  handleCancelDetailWorkInList,
  getTomorrowDateSEAsia,
  userEmployeeID,
  fetchWorkDetailById,
  workidDetail,
  FetchDataForSchedule,
}) => {

  console.log("workDetailById",workDetailById)
  
  const CheckActionEditAndAdd = () => {
    if (actionWork === "addWork") {
      handleAddWork()
    }
    else {
      handleUpdateWork()
    }
  }

  const handleAddWork = () => {
    if (!validateWorkDetail(workDetailById)) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        AddWork(workDetailById, userEmployeeID, workidDetail)
          .then((data) => {
            handleCancelDetailWorkInList()
            FetchDataForSchedule()
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Thêm công việc mới thành công",
        error: "Lỗi thêm vào nhóm",
      }
    );
  };

  const handleUpdateWork = () => {
    if (!validateWorkDetail(workDetailById)) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        UpdateWork(workDetailById)
          .then((data) => {
            resolve(data);
            FetchDataForSchedule();
              handleCancelDetailWorkInList()
              fetchWorkDetailById(workidDetail);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Cập nhật công việ thành công",
        error: "Lỗi thêm vào nhóm",
      }
    );
  };

  const validateWorkDetail = (workDetail) => {
    if (!workDetail.workName || workDetail.workName.length === 0) {
      toast.warning("Tên công việc không được để trống.");
      return false;
    }
    if (!workDetail.unitCostId || workDetail.unitCostId.length === 0) {
      toast.warning("Vui lòng chọn loại sản phẩm.");
      return false;
    }
    if (
      isNaN(parseFloat(workDetail.unitCost)) ||
      parseFloat(workDetail.unitCost) < 0
    ) {
      toast.warning("Đơn giá sản phẩm không hợp lệ.");
      return false;
    }

    if (
      isNaN(parseFloat(workDetail.totalProduct)) ||
      parseFloat(workDetail.totalProduct) < 0
    ) {
      toast.warning("Số lượng sản phẩm không hợp lệ.");
      return false;
    }

    if (!workDetail.workAreaId || workDetail.workAreaId.length === 0) {
      toast.warning("Vui lòng chọn khu vực.");
      return false;
    }

    return true;
  };

  return (
    <div className="modal-detail ">
      <Modal
        className="modal"
        open={isModalOpenDetailShift}
        onOk={handleOkDetailShift}
        onCancel={handleCancelDetailWorkInList}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            {
              actionWork === "addWork" ? (<p>Thêm công việc</p>) : actionWork === "editWork" ? (<p>Sửa công việc</p>) : (<p>Chi tiết công việc</p>)
            }
            {
              actionWork === "viewWork" || actionWork === "viewWorkList" ? (
                <svg
                  onClick={handleCancelDetailWorkInList}
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
                </svg>) : (<></>)
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
                disabled={actionWork === "viewWork"}
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
                  disabled={actionWork === "viewWork"}
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
                onChange={actionWork !== "viewWork" ? (e) => {
                  if (e.target.value.match(/^\d*$/)) {
                    setWorkDetailById({ ...workDetailById, unitCost: e.target.value });
                  }
                } : undefined}
                disabled={actionWork === "viewWork"}
              />
            </div>
            <div className="item-modal">
              <p>Số sản phẩm cần sản xuất</p>
              <Input
                type="number"
                value={workDetailById.totalProduct}
                placeholder="Nhập số sản phẩm cần sản xuất"
                onChange={actionWork !== "viewWork" ? (e) => {
                  if (e.target.value.match(/^\d*$/)) {
                    setWorkDetailById({ ...workDetailById, totalProduct: e.target.value });
                  }
                } : undefined}
                disabled={actionWork === "viewWork"}
              />
            </div>
            <div className="item-modal">
              <p>Số sản phẩm đã hoàn thành</p>
              <Input
                type="number"
                value={workDetailById.numberProduct}
                placeholder="Số sản phẩm đã hoàn thành"
                disabled
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
                  onChange={actionWork !== "viewWork" ? handleChangeWorkAreaId : undefined}
                  options={actionWork !== "viewWork"
                    ? allWorkAreas.map((allWorkArea) => ({
                      value: allWorkArea.workAreaId,
                      label: allWorkArea.workAreaName,
                    }))
                    : []}
                  disabled={actionWork === "viewWork"}
                />
              ) : (
                <Select
                  style={{ width: 120 }}
                  placeholder="Không có khu vực nào"
                />
              )}
            </div>
            <div className="item-modal">
              <p>Ngày:</p>
              <Input
                type="date"
                placeholder="Chọn ngày kết thúc"
                value={workDetailById && convertDate(workDetailById.date) ? convertDate(workDetailById.date) : convertDate(getTomorrowDateSEAsia())}
                min={convertDate(getTomorrowDateSEAsia())}
                onChange={(e) =>
                  setWorkDetailById({
                    ...workDetailById,
                    date: convertDate(e.target.value),
                  })
                }
                disabled={actionWork === "viewWork" || actionWork === "addWork" || actionWork === "editWork"}
              />
            </div>
            {
              actionWork !== "viewWork" && actionWork !== "viewWorkList" ? (
                <div className="footer-modal">
                  <span className="back" onClick={handleCancelDetailWorkInList}>
                    Hủy bỏ
                  </span>
                  <span className="save" onClick={CheckActionEditAndAdd}>
                    Lưu
                  </span>
                </div>
              ) : (<></>)
            }
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListModuleDetail3;
