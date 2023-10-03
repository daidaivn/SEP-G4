import "../scss/index.scss"
import user from "../assets/images/Ellipse 69.svg";
import notification from "../assets/images/icons/notification.svg";
import { Input, Switch, Form, Select } from "antd";

function ListDepartmentComponent() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách phòng - ban</h2>
            <span>Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc</span>
          </div>
          <div className="list-user-header">
            <span>User</span>
            <img className="user-list" src={user} alt="" />
            <img className="notification-list" src={notification} alt="" />
          </div>
        </div>
        <div className="list-search-filter-add">
          <div className="list-input-search">
            <i ></i>
            <Input placeholder="Tìm kiếm" ></Input>
          </div>
          <div className="list-filter">
            <i className="list-filter-icon1"></i>
            <span>Bộ lọc</span>
            <i className="list-filter-icon2"></i>
          </div>
          <div className="list-add"></div>
        </div>
      </div>
    </>
  )
}

export default ListDepartmentComponent;  