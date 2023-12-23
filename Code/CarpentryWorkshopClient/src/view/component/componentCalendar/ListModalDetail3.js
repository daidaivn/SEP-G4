import React from "react";
import { toast } from "react-toastify";
import { Input, Modal, Switch, Form, Select } from "antd";
import { AddWork, UpdateWork } from "../../../sevices/CalendarSevice";
import { useEffect, useState } from "react";
import { updateDataWorks } from "../../../sevices/TimekeepingService";
import { set } from "date-fns";
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
  console.log('actionWork', actionWork);


  const [actionEdit, setActionEdit] = useState("Disable");
  const [numberProduct, setNumberProduct] = useState("");
  const GetActionEdit = () => {

    if (actionEdit === "Disable") {
      setActionEdit("edit");
    } else {
      setActionEdit("Disable");
    }
  };
  const validateData = (number) => {
    const errors = [];
    if (!number || isNaN(number)) {
      errors.push("Please enter a valid number");
    }
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }
    return true;
  };
  const EditWorkProduct = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn sửa thông tin");
    if (!isConfirmed) {
      // If not confirmed, return without executing the rest of the function
      return;
    }
    const check = validateData(workDetailById.numberProduct);
    if (!check) {
      return;
    }
    console.log('teamWorkId', workDetailById.teamWorkId);
    if (actionEdit === "edit") {
      toast.promise(
        updateDataWorks(workDetailById.teamWorkId, workDetailById.numberProduct)
          .then((data) => {
            setActionEdit("Disable");
            return data;
          })
          .catch((error) => {
            throw toast.error(error.response.data);
          }),
        {
          pending: "Đang xử lý",
          success: "Thành công",
        }
      );
    } else {
      return;
    }
  }
  const CheckActionEditAndAdd = () => {
    if (actionWork === "addWork") {
      handleAddWork();
    } else {
      handleUpdateWork();
    }
  };

  const handleAddWork = () => {
    if (!validateWorkDetail(workDetailById)) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        AddWork(workDetailById, userEmployeeID, workidDetail)
          .then((data) => {
            handleCancelDetailWorkInList();
            FetchDataForSchedule();
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
            handleCancelDetailWorkInList();
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
    <div className="modal-detail">
      <Modal
        className="modal calender-modal"
        open={isModalOpenDetailShift}
        onOk={handleOkDetailShift}
        onCancel={handleCancelDetailWorkInList}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            {actionWork === "addWork" ? (
              <p>Thêm công việc</p>
            ) : actionWork === "editWork" ? (
              <p>Sửa công việc</p>
            ) : (
              <p>Chi tiết công việc</p>
            )}
            {actionWork === "viewWork" || actionWork === "viewWorkList" ? (
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
              </svg>
            ) : (
              <></>
            )}
          </div>
          <div className="body-modal" >
            <div className="item-modal">
              <p>Tên công việc</p>
              <Input
                type="text"
                placeholder="Nhập tên công việc"
                value={workDetailById ? workDetailById.workName : ""}
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
                  value={
                    workDetailById &&
                      allUnitCosts.some(
                        (uc) => uc.uniCostId === workDetailById.unitCostId
                      )
                      ? workDetailById.unitCostId
                      : undefined
                  }
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
                onChange={
                  actionWork !== "viewWork"
                    ? (e) => {
                      if (e.target.value.match(/^\d*$/)) {
                        setWorkDetailById({
                          ...workDetailById,
                          unitCost: e.target.value,
                        });
                      }
                    }
                    : undefined
                }
                disabled={actionWork === "viewWork"}
              />
            </div>
            <div className="item-modal">
              <p>Số sản phẩm cần sản xuất</p>
              <Input
                type="number"
                value={workDetailById.totalProduct}
                placeholder="Nhập số sản phẩm cần sản xuất"
                onChange={
                  actionWork !== "viewWork"
                    ? (e) => {
                      if (e.target.value.match(/^\d*$/)) {
                        setWorkDetailById({
                          ...workDetailById,
                          totalProduct: e.target.value,
                        });
                      }
                    }
                    : undefined
                }
                disabled={actionWork === "viewWork"}
              />
            </div>
            {!(actionWork === 'addWork' || actionWork === 'editWork') && (
              <div className="item-modal">
                <p>Số sản phẩm đã hoàn thành</p>
                {actionWork === "viewWork" && (
                  <svg onClick={() => { GetActionEdit(); EditWorkProduct() }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                  >
                    <path
                      d="M21.6001 0H9.6001C3.6001 0 0.600098 3 0.600098 9V28.5C0.600098 29.325 1.2751 30 2.1001 30H21.6001C27.6001 30 30.6001 27 30.6001 21V9C30.6001 3 27.6001 0 21.6001 0ZM14.2651 21.99C13.8901 22.365 13.2001 22.71 12.6901 22.785L9.5701 23.22C9.4501 23.235 9.3301 23.25 9.2251 23.25C8.7001 23.25 8.2201 23.07 7.8751 22.725C7.4551 22.305 7.2751 21.69 7.3801 21.03L7.8151 17.91C7.8901 17.4 8.2351 16.695 8.6101 16.335L14.2651 10.68C14.3551 10.95 14.4751 11.22 14.6101 11.52C14.7451 11.79 14.8801 12.06 15.0301 12.315C15.1501 12.525 15.2851 12.735 15.4051 12.885C15.5551 13.11 15.7051 13.305 15.8101 13.41C15.8701 13.5 15.9301 13.56 15.9451 13.59C16.2751 13.965 16.6201 14.325 16.9501 14.595C17.0401 14.685 17.1001 14.73 17.1151 14.745C17.3101 14.895 17.4901 15.06 17.6701 15.165C17.8651 15.315 18.0751 15.45 18.2851 15.57C18.5401 15.72 18.8101 15.87 19.0951 16.005C19.3801 16.14 19.6501 16.245 19.9201 16.335L14.2651 21.99ZM22.4251 13.845L21.2551 15.015C21.1801 15.09 21.0751 15.135 20.9701 15.135C20.9401 15.135 20.8801 15.135 20.8501 15.12C18.2701 14.385 16.2151 12.33 15.4801 9.75C15.4351 9.615 15.4801 9.465 15.5851 9.36L16.7701 8.175C18.7051 6.24 20.5351 6.285 22.4251 8.175C23.3851 9.135 23.8651 10.065 23.8501 11.025C23.8501 11.97 23.3851 12.885 22.4251 13.845Z"
                      fill="#FF8F19"
                    />
                  </svg>
                )}
                <Input
                  type="number"
                  value={workDetailById.numberProduct}
                  onChange={
                    actionEdit === "edit"
                      ? (e) => {
                        if (e.target.value.match(/^\d*$/)) {
                          setWorkDetailById({
                            ...workDetailById,
                            numberProduct: e.target.value,
                          });
                        }
                      }
                      : undefined
                  }
                  placeholder="Số sản phẩm đã hoàn thành"
                  disabled={actionEdit === "Disable"}
                />
              </div>
            )}

            <div className="item-modal">
              <p>Khu vực:</p>
              {allWorkAreas && allWorkAreas.length > 0 ? (
                <Select
                  style={{ width: 120 }}
                  placeholder="Chọn khu vực"
                  value={
                    workDetailById &&
                      allWorkAreas.some(
                        (area) => area.workAreaId === workDetailById.workAreaId
                      )
                      ? workDetailById.workAreaId
                      : undefined
                  }
                  onChange={
                    actionWork !== "viewWork"
                      ? handleChangeWorkAreaId
                      : undefined
                  }
                  options={
                    actionWork !== "viewWork"
                      ? allWorkAreas.map((allWorkArea) => ({
                        value: allWorkArea.workAreaId,
                        label: allWorkArea.workAreaName,
                      }))
                      : []
                  }
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
                value={
                  workDetailById && convertDate(workDetailById.date)
                    ? convertDate(workDetailById.date)
                    : convertDate(getTomorrowDateSEAsia())
                }
                min={convertDate(getTomorrowDateSEAsia())}
                onChange={(e) =>
                  setWorkDetailById({
                    ...workDetailById,
                    date: convertDate(e.target.value),
                  })
                }
                disabled={
                  actionWork === "viewWork" ||
                  actionWork === "addWork" ||
                  actionWork === "editWork"
                }
              />
            </div>
            {actionWork !== "viewWork" && actionWork !== "viewWorkList" ? (
              <div className="footer-modal">
                <span className="back" onClick={handleCancelDetailWorkInList}>
                  Hủy bỏ
                </span>
                <span className="save" onClick={CheckActionEditAndAdd}>
                  Lưu
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListModuleDetail3;
