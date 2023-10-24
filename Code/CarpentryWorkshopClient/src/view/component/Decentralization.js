import React, { useState, useEffect, useMemo } from "react";
import { Checkbox, Input } from "antd";
import "../scss/Decentralization.scss";
import "../scss/fonts.scss";
import "../scss/index.scss";
import { fetchAllRole } from "../../sevices/RoleService";
import { fetchAllPages } from "../../sevices/PageService";
import { fetchAllDecentralization, addRolePage, deleteRolePage } from "../../sevices/DecentralizationService";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";

const Decentralization = () => {
  const [roles, setRoles] = useState([]);
  const [pages, setPages] = useState([]);
  const [decentralizations, setDecentralizations] = useState([]);
  const permissions = useMemo(() => {
    const perms = {};
    decentralizations.forEach((d) => {
      perms[`${d.pageId}_${d.roleId}`] = true;
    });
    return perms;
  }, [decentralizations]);

  console.log("p", permissions);

  // Kiểm tra permission
  const hasPermission = (pageId, roleId) => {
    return permissions[`${pageId}_${roleId}`] ?? false;
  };

  const handleCheckboxChange = (e, pageId, roleId) => {
    const isChecked = e.target.checked;
    console.log(isChecked);

    if (isChecked) {
      // Gọi API để thêm quyền truy cập
      addRolePage(pageId, roleId)
        .then((response) => {
          // Xử lý thành công
          console.log("Thêm thành công");
          // Sau khi thêm thành công, gọi lại các hàm tải dữ liệu
          fetchData();
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error("Lỗi khi thêm quyền truy cập:", error);
        });
    } else {
      // Gọi API để xóa quyền truy cập
      deleteRolePage(pageId, roleId)
        .then((response) => {
          // Xử lý thành công
          console.log("Xóa thành công");
          // Sau khi xóa thành công, gọi lại các hàm tải dữ liệu
          fetchData();
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error("Lỗi khi xóa quyền truy cập:", error);
        });
    }
  };

  // Hàm tải lại dữ liệu
  const fetchData = () => {
    fetchAllRole()
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu phòng ban:", error);
      });

    fetchAllPages()
      .then((data) => {
        setPages(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu RolePage", error);
      });

    fetchAllDecentralization()
      .then((data) => {
        setDecentralizations(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu RolePage", error);
      });
  };

  useEffect(() => {
    // Ban đầu, gọi hàm tải dữ liệu
    fetchData();
  }, []);
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Phân quyền</h2>
            <span>Phân chia quyền truy cập theo chức vụ</span>
          </div>
          <MenuResponsive />
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
            <i className="icon-responsive">
              <svg
                width="12"
                height="12"
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

          <i className="icon-responsive icon-filter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M7.15979 9.53513C7.15979 9.84013 6.95977 10.2401 6.70477 10.3951L5.99979 10.8501C5.34479 11.2551 4.43478 10.8001 4.43478 9.99013V7.31512C4.43478 6.96012 4.23479 6.50513 4.02979 6.25513L2.10977 4.23512C1.85477 3.98012 1.65479 3.53013 1.65479 3.22513V2.06512C1.65479 1.46012 2.10979 1.00513 2.66479 1.00513H9.33478C9.88978 1.00513 10.3448 1.46012 10.3448 2.01512V3.12512C10.3448 3.53012 10.0898 4.03513 9.83978 4.28513"
                stroke="white"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.03506 8.26006C8.91872 8.26006 9.63507 7.54372 9.63507 6.66006C9.63507 5.77641 8.91872 5.06006 8.03506 5.06006C7.15141 5.06006 6.43506 5.77641 6.43506 6.66006C6.43506 7.54372 7.15141 8.26006 8.03506 8.26006Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.93506 8.56006L9.43506 8.06006"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </i>
          <i className="icon-responsive icon-filter icon-add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M8.48719 6.94879H7.56411V6.02571C7.56411 5.8575 7.42462 5.71802 7.25642 5.71802C7.08821 5.71802 6.94873 5.8575 6.94873 6.02571V6.94879H6.02565C5.85744 6.94879 5.71796 7.08827 5.71796 7.25648C5.71796 7.42468 5.85744 7.56417 6.02565 7.56417H6.94873V8.48725C6.94873 8.65545 7.08821 8.79494 7.25642 8.79494C7.42462 8.79494 7.56411 8.65545 7.56411 8.48725V7.56417H8.48719C8.65539 7.56417 8.79488 7.42468 8.79488 7.25648C8.79488 7.08827 8.65539 6.94879 8.48719 6.94879Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M9.10254 3.57233V1.70977C9.10254 1.13131 8.83997 0.897461 8.18766 0.897461H6.53023C5.87792 0.897461 5.61536 1.13131 5.61536 1.70977V3.56823C5.61536 4.15079 5.87792 4.38054 6.53023 4.38054H8.18766C8.83997 4.38464 9.10254 4.15079 9.10254 3.57233Z"
                fill="white"
              />
              <path
                d="M4.38458 3.57233V1.70977C4.38458 1.13131 4.12202 0.897461 3.46971 0.897461H1.81227C1.15996 0.897461 0.8974 1.13131 0.8974 1.70977V3.56823C0.8974 4.15079 1.15996 4.38054 1.81227 4.38054H3.46971C4.12202 4.38464 4.38458 4.15079 4.38458 3.57233Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M4.38458 8.18779V6.53035C4.38458 5.87804 4.12202 5.61548 3.46971 5.61548H1.81227C1.15996 5.61548 0.8974 5.87804 0.8974 6.53035V8.18779C0.8974 8.84009 1.15996 9.10266 1.81227 9.10266H3.46971C4.12202 9.10266 4.38458 8.84009 4.38458 8.18779Z"
                fill="white"
              />
            </svg>
          </i>
        </div>
        <div className="list-text-header-res">
          <h2>Phân quyền</h2>
          <span>Phân chia quyền truy cập theo chức vụ</span>
        </div>
        {decentralizations.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <table className="table-Decent">
            <thead>
              <tr>
                <td>Trang / Chức vụ </td>
                {roles.map((roles) => (
                  <td>
                    <p>{roles.roleName}</p>
                  </td>
                ))}
              </tr>
            </thead>
            <div className="tbody-decent">
              <tbody className="scrollbar" id="style-15">
                {pages.map((pages) => (
                  <tr key={pages.pageId}>
                    <td>
                      <span>{pages.pageName}</span>
                    </td>
                    {roles.map((roles) => (
                      <td key={roles.roleID}>
                        <span>
                          <Checkbox
                            checked={hasPermission(pages.pageId, roles.roleID)}
                            onChange={(e) => handleCheckboxChange(e, pages.pageId, roles.roleID)}
                          />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </div>
          </table>
        )}
      </div>
    </>
  );
};
export default Decentralization;
