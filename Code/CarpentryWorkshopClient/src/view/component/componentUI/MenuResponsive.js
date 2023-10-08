import "../../scss/index.scss";
import { Link } from "react-router-dom";
function MenuResponsive() {
  return (
    <>
      <div>
        <label for="nav-mobile-input" class="nav__bars-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 			32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </label>
        <input
          hidden
          type="checkbox"
          name=""
          class="nav__input"
          id="nav-mobile-input"
        />
        <nav class="nav-mobile-input">
          <ul class="menu-list-mobile">
            <li class="menu-item-link">
              <Link to="/">Trang chủ</Link>
            </li>
            <li class="menu-item-link">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li class="menu-item-link">
              <Link to="/list-employee">Danh sách người lao động</Link>
            </li>
            <li class="menu-item-link">
              <Link to="/list-department">Danh sách Phòng - Ban</Link>
            </li>
            <li class="menu-item-link">
              <Link to="/dependent-person">Danh sách Người phụ thuộc</Link>
            </li>
            <li class="menu-item-link">
              <Link to="/role">Danh sách Chức vụ</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="logo-responsive">PHUCAU</div>
    </>
  );
}
export default MenuResponsive;
