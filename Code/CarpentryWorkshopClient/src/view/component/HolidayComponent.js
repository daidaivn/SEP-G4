import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/HolidayComponent.scss";
import "../scss/responsive/Holiday.scss";
import "../scss/responsive/responsive.scss";
import { Input, Modal, Select } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import { useState } from "react";
const HolidayComponent = () => {
  //modal tạo lịch nghỉ lễ
  const [isModalOpenHoliday, setIsModalOpenHoliday] = useState(false);
  const showModalHoliday = () => {
    setIsModalOpenHoliday(true);
  };
  const handleOkHoliday = () => {
    setIsModalOpenHoliday(false);
  };
  const handleCancelHoliday = () => {
    setIsModalOpenHoliday(false);
  };
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Quản lý nghỉ lễ</h2>
            <span>
              Lưu thông tin bắt đầu làm việc và ngưng làm việc củ một nhóm
            </span>
          </div>
          <ListUserHeader />
        </div>
        <div className="list-search-filter-add">
          <div className="list-input-search">
            <i className="icon-web">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="vuesax/linear/search-normal">
                  <g id="search-normal">
                    <path
                      id="Vector"
                      d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                      stroke="#64966E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                      stroke="#64966E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
              </svg>
            </i>
            <Input placeholder="Tìm kiếm"></Input>
          </div>
          <div className="list-filter">
            <Select className="select-input" value={"Tháng 1"} />
          </div>
          <div className="list-filter year">
            <Select className="select-input" value={2023} />
          </div>
          <div className="ListWork" onClick={showModalHoliday}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="37"
              viewBox="0 0 36 37"
              fill="none"
            >
              <path
                d="M30.7505 25.625H27.3755V22.25C27.3755 21.635 26.8655 21.125 26.2505 21.125C25.6355 21.125 25.1255 21.635 25.1255 22.25V25.625H21.7505C21.1355 25.625 20.6255 26.135 20.6255 26.75C20.6255 27.365 21.1355 27.875 21.7505 27.875H25.1255V31.25C25.1255 31.865 25.6355 32.375 26.2505 32.375C26.8655 32.375 27.3755 31.865 27.3755 31.25V27.875H30.7505C31.3655 27.875 31.8755 27.365 31.8755 26.75C31.8755 26.135 31.3655 25.625 30.7505 25.625Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M33 13.28V6.47C33 4.355 32.04 3.5 29.655 3.5H23.595C21.21 3.5 20.25 4.355 20.25 6.47V13.265C20.25 15.395 21.21 16.235 23.595 16.235H29.655C32.04 16.25 33 15.395 33 13.28Z"
                fill="white"
              />
              <path
                d="M15.7495 13.28V6.47C15.7495 4.355 14.7895 3.5 12.4045 3.5H6.34451C3.95951 3.5 2.99951 4.355 2.99951 6.47V13.265C2.99951 15.395 3.95951 16.235 6.34451 16.235H12.4045C14.7895 16.25 15.7495 15.395 15.7495 13.28Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M15.7495 30.155V24.095C15.7495 21.71 14.7895 20.75 12.4045 20.75H6.34451C3.95951 20.75 2.99951 21.71 2.99951 24.095V30.155C2.99951 32.54 3.95951 33.5 6.34451 33.5H12.4045C14.7895 33.5 15.7495 32.54 15.7495 30.155Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên ngày nghỉ</td>
              <td>Ngày bắt đầu nghỉ</td>
              <td>Số ngày nghỉ</td>
            </tr>
          </thead>
          <tbody className="scrollbar" id="style-15">
            <tr>
              <td>1</td>
              <td>Nghỉ tết</td>
              <td>31-12-2023</td>
              <td>5 ngày</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Nghỉ tết</td>
              <td>31-12-2023</td>
              <td>5 ngày</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Nghỉ tết</td>
              <td>31-12-2023</td>
              <td>5 ngày</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Nghỉ tết</td>
              <td>31-12-2023</td>
              <td>5 ngày</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Nghỉ tết</td>
              <td>31-12-2023</td>
              <td>5 ngày</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Nghỉ tết</td>
              <td>31-12-2023</td>
              <td>5 ngày</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Nghỉ tết</td>
              <td>31-12-2023</td>
              <td>5 ngày</td>
            </tr>
          </tbody>
        </table>

        {/* modal tạo lịch nghỉ lễ */}
        <Modal
          className="modal"
          open={isModalOpenHoliday}
          onOk={handleOkHoliday}
          onCancel={handleCancelHoliday}
        >
          <div className="modal-add-holiday">
            <div className="body">
              <div className="head">
                <h3>Tạo lịch nghỉ lễ</h3>
              </div>
            </div>
            <div className="footer">
              <div className="item-body">
                <p>Tên ngày nghỉ lễ</p>
                <Input type="text"></Input>
              </div>
              <div className="item-body">
                <p>Số ngày nghỉ</p>
                <Input type="text" placeholder="Số ngày nghỉ"></Input>
              </div>
              <div className="item-body">
                <p>Ngày bắt đầu nghỉ</p>
                <Input type="date"></Input>
              </div>
              <div className="btn-footer">
                <div className="btn cancel">Hủy bỏ</div>
                <div className="btn save">Lưu</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default HolidayComponent;
