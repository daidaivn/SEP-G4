import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/CalendarComponent.scss";
import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Form, Input, Select, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import {
  GetTeamForSchedule,
  GetAllWorks,
  GetWorkDetailById,
} from "../../sevices/CalendarSevice";
import {
  ListSearchFilterAdd,
  ModalListShift,
  TableCalendar,
  ListModuleDetail2,
  ModalAdd,
  ListModuleDetail3,
  WorkModalTeam,
  EditListModalDetail
} from "./componentCalendar";
const CalendarComponent = () => {
  const userEmployeeID =
    localStorage.getItem("userEmployeeID") ||
    sessionStorage.getItem("userEmployeeID");

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // Modal danh sach cong viec
  const [isModalOpenListShift, setIsModalOpenListShift] = useState(false);
  const [teamForSchedule, setTeamForSchedule] = useState(false);
  const [allWorks, setAllWorks] = useState([]);
  const [workDetailById, setWorkDetailById] = useState({
    workName: '',
    uniCostName: '',
    uniCost: '',
    numberProduct: '',
    workArea: '',
    timeStart: '',
    timeEnd: ''
  });

  const showModalListShift = () => {
    setIsModalOpenListShift(true);
  };
  const handleOkListShift = () => {
    setIsModalOpenListShift(false);
  };
  const handleCancelListShift = () => {
    setIsModalOpenListShift(false);
  };

  // Modal them cong viec
  const [isModalOpeAdd, setIsModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  // Modal chi tiet cong viec
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };
  // Modal Chi tiết phân công việc
  const [isModalOpenDetailShift, setIsModalOpenDetailShift] = useState(false);
  const showModalDetailShift = () => {
    setIsModalOpenDetailShift(true);
    setIsEditingDetailShift(false);
  };
  const handleOkDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };
  const handleCancelDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };

  // Modal phan cong cong viec
  const [isModalOpenAssignWork, setIsModalOpenAssignWork] = useState(false);
  const showModalAssignWork = () => {
    setIsModalOpenAssignWork(true);
  };
  const handleOkAssignWork = () => {
    setIsModalOpenAssignWork(false);
  };
  const handleCancelAssignWork = () => {
    setIsModalOpenAssignWork(false);
  };

  //Thay doi trang thai chinh sua chi tiet cong viec
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  //Thay doi trang thai chinh sua chi tiet phan cong viec
  const [isEditingDetailShift, setIsEditingDetailShift] = useState(false);

  const handleEditDetailShift = () => {
    setIsEditingDetailShift(true);
    setIsModalOpenDetailShift(true);
  };
  const handleSaveDetailShift = () => {
    setIsEditingDetailShift(false);
    setIsModalOpenDetailShift(false);
  };
  const handleBackDetailShift = () => {
    setIsEditingDetailShift(false);
  };

  const log = () => {
    console.log("");
  };

  const fetchAllWorks = () => {
    toast.promise(
      new Promise((resolve) => {
        GetAllWorks(userEmployeeID)
          .then((data) => {
            resolve(data);
            showModalListShift();
            setAllWorks(data);
            console.log("GetAllWorks", data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi thêm vào nhóm",
      }
    );
  };
  console.log('workDetailById', workDetailById);

  const fetchTeamForSchedule = () => {
    toast.promise(
      new Promise((resolve) => {
        GetTeamForSchedule(userEmployeeID)
          .then((data) => {
            resolve(data);
            console.log("data", data);

            setTeamForSchedule(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi dữ liệu",
      }
    );
  };

  const fetchWorkDetailById = (TeamID) => {
    toast.promise(
      new Promise((resolve) => {
        GetWorkDetailById(TeamID)
          .then((data) => {
            console.log('data', data);
            resolve(data);
            setWorkDetailById({
              workName: data.workName || 'Chưa có',
              uniCostName: data.uniCostName || 'Chưa có',
              uniCost: data.uniCost || 'Chưa có',
              numberProduct: data.numberProduct || 'Chưa có',
              workArea: data.workArea || 'Chưa có',
              timeStart: data.timeStart || 'Chưa có',
              timeEnd: data.timeEnd || 'Chưa có'
            });
            showModalDetail();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi thông tin chi tiết công việc",
      }
    );
  };
  useEffect(() => {
    fetchTeamForSchedule();
  }, []);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Lên lịch làm việc</h2>
            <span>Tạo công việc và giao việc làm cho từng nhóm</span>
          </div>
          <MenuResponsive />
          <ListUserHeader />
        </div>
        <ListSearchFilterAdd
          fetchAllWorks={fetchAllWorks}
          showModalAdd={showModalAdd}
        />
        <div className="time-shift">
          <div className="item-time-shift">
            <p>Thời gian làm việc:</p>
          </div>
          <div className="item-time-shift">
            <p>- Ca 1: 6h30 đến 15h30 </p>
            <p>- Ca 2: 6h30 đến15h30 </p>
          </div>
        </div>
        <TableCalendar
          handleEditDetailShift={handleEditDetailShift}
          showModalDetailShift={showModalDetailShift}
          teamForSchedule={teamForSchedule}
          showModalAssignWork={showModalAssignWork}
        />
        {/* modal danh sach cong viec */}
        <ModalListShift
          isModalOpenListShift={isModalOpenListShift}
          handleOkListShift={handleOkListShift}
          handleCancelListShift={handleCancelListShift}
          showModalDetail={showModalDetail}
          allWorks={allWorks}
          fetchWorkDetailById={fetchWorkDetailById}
        />

        {isEditing ? (
          // modal chinh sua cong viec
          <EditListModalDetail
            isModalOpenDetail={isModalOpenDetail}
            handleSave={handleSave}
            handleCancelDetail={handleCancelDetail}
            workDetailById={workDetailById}
            handleChange={handleChange}
            setWorkDetailById={setWorkDetailById}
            handleCancel={handleCancel}
          />
        ) : (
          // modal chi tiet cong viec
          <ListModuleDetail2
            isModalOpenDetail={isModalOpenDetail}
            handleOkDetail={handleOkDetail}
            handleCancelDetail={handleCancelDetail}
            handleEdit={handleEdit}
            workDetailById={workDetailById}
          />
        )}

        {/* modal them cong viec */}
        <ModalAdd
          isModalOpeAdd={isModalOpeAdd}
          handleOkAdd={handleOkAdd}
          handleCancelAdd={handleCancelAdd}
          handleChange={handleChange}
        />

        {isEditingDetailShift ? (
          // modal chỉnh sửa phân công việc
          <WorkModalTeam
            isModalOpenDetailShift={isModalOpenDetailShift}
            handleSaveDetailShift={handleSaveDetailShift}
            handleCancelDetailShift={handleCancelDetailShift}
            handleChange={handleChange}
            handleBackDetailShift={handleBackDetailShift}
          />
        ) : (
          // modal chi tiêt phân công việc
          <ListModuleDetail3
            isModalOpenDetailShift={isModalOpenDetailShift}
            handleOkDetailShift={handleOkDetailShift}
            handleCancelDetailShift={handleCancelDetailShift}
            handleEditDetailShift={handleEditDetailShift}
            showModalDetail={showModalDetail}
          />
        )}

        {/* / Modal phan cong cong viec */}
        <Modal
          className="modal"
          open={isModalOpenAssignWork}
          onOk={handleOkAssignWork}
          onCancel={handleCancelAssignWork}
        >
          <div className="modal-detail-all">
            <div className="head-modal">
              <p>Phân công công việc nhóm 1</p>
            </div>
            <div className="body-modal">
              <div className="item-modal">
                <p>Tên công việc</p>
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
                <p>Loại sản phẩm:</p>
                <Input type="date"></Input>
              </div>
              <div className="item-modal-last">
                <p>Trạng thái:</p>
                <div className="item-right">
                  <p className="switch">
                    <Form.Item valuePropName="checked">
                      <Switch checked="true" />
                    </Form.Item>
                  </p>
                  <p>Làm việc</p>
                </div>
              </div>

              <div className="footer-modal">
                <span className="back" onClick={handleCancelAssignWork}>
                  Hủy bỏ
                </span>
                <span className="edit save" onClick={handleOkAssignWork}>
                  Lưu
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default CalendarComponent;
