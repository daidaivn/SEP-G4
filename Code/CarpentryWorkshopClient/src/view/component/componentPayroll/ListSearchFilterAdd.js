import React from "react";
import { Input, Select } from "antd";

const ListSearchFilterAdd = ({
    showModalExcel,
    showModalRewardCompany,
    showModalTypeReward,
    date,
    setDate,
    yearOptions,
    monthOptions,
    setMonths,
    months
}) => {
    return (
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
            <div className="list-filter">
                <Select
                    className="select-input"
                    value={`Tháng ${months}`}
                    style={{ width: 120 }}
                    onChange={setMonths}
                    options={monthOptions.map(month => ({ value: month.value, label: `Tháng ${month.label}` }))}
                    placeholder="Chọn năm"
                />
            </div>
            <div className="list-filter">
                <Select
                    className="select-input"
                    value={date}
                    style={{ width: 120 }}
                    onChange={setDate}
                    options={yearOptions}
                    placeholder="Chọn năm"
                />
            </div>
            <div className="excel" onClick={showModalExcel}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                >
                    <path
                        d="M0 7.25C0 4.76797 1.79375 2.75 4 2.75H32C34.2062 2.75 36 4.76797 36 7.25V29.75C36 32.232 34.2062 34.25 32 34.25H4C1.79375 34.25 0 32.232 0 29.75V7.25ZM8 20.75C8.53043 20.75 9.03914 20.5129 9.41421 20.091C9.78929 19.669 10 19.0967 10 18.5C10 17.9033 9.78929 17.331 9.41421 16.909C9.03914 16.4871 8.53043 16.25 8 16.25C7.46957 16.25 6.96086 16.4871 6.58579 16.909C6.21071 17.331 6 17.9033 6 18.5C6 19.0967 6.21071 19.669 6.58579 20.091C6.96086 20.5129 7.46957 20.75 8 20.75ZM10 11.75C10 11.1533 9.78929 10.581 9.41421 10.159C9.03914 9.73705 8.53043 9.5 8 9.5C7.46957 9.5 6.96086 9.73705 6.58579 10.159C6.21071 10.581 6 11.1533 6 11.75C6 12.3467 6.21071 12.919 6.58579 13.341C6.96086 13.7629 7.46957 14 8 14C8.53043 14 9.03914 13.7629 9.41421 13.341C9.78929 12.919 10 12.3467 10 11.75ZM8 27.5C8.53043 27.5 9.03914 27.2629 9.41421 26.841C9.78929 26.419 10 25.8467 10 25.25C10 24.6533 9.78929 24.081 9.41421 23.659C9.03914 23.2371 8.53043 23 8 23C7.46957 23 6.96086 23.2371 6.58579 23.659C6.21071 24.081 6 24.6533 6 25.25C6 25.8467 6.21071 26.419 6.58579 26.841C6.96086 27.2629 7.46957 27.5 8 27.5ZM14 10.0625C13.1687 10.0625 12.5 10.8148 12.5 11.75C12.5 12.6852 13.1687 13.4375 14 13.4375H28C28.8312 13.4375 29.5 12.6852 29.5 11.75C29.5 10.8148 28.8312 10.0625 28 10.0625H14ZM14 16.8125C13.1687 16.8125 12.5 17.5648 12.5 18.5C12.5 19.4352 13.1687 20.1875 14 20.1875H28C28.8312 20.1875 29.5 19.4352 29.5 18.5C29.5 17.5648 28.8312 16.8125 28 16.8125H14ZM14 23.5625C13.1687 23.5625 12.5 24.3148 12.5 25.25C12.5 26.1852 13.1687 26.9375 14 26.9375H28C28.8312 26.9375 29.5 26.1852 29.5 25.25C29.5 24.3148 28.8312 23.5625 28 23.5625H14Z"
                        fill="white"
                    />
                </svg>
                Xuất Excel
            </div>
            <div className="ListWork">
                <svg
                    //show Modal Thưởng công ty
                    onClick={showModalRewardCompany}
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                >
                    <path
                        d="M0 7.25C0 4.76797 1.79375 2.75 4 2.75H32C34.2062 2.75 36 4.76797 36 7.25V29.75C36 32.232 34.2062 34.25 32 34.25H4C1.79375 34.25 0 32.232 0 29.75V7.25ZM8 20.75C8.53043 20.75 9.03914 20.5129 9.41421 20.091C9.78929 19.669 10 19.0967 10 18.5C10 17.9033 9.78929 17.331 9.41421 16.909C9.03914 16.4871 8.53043 16.25 8 16.25C7.46957 16.25 6.96086 16.4871 6.58579 16.909C6.21071 17.331 6 17.9033 6 18.5C6 19.0967 6.21071 19.669 6.58579 20.091C6.96086 20.5129 7.46957 20.75 8 20.75ZM10 11.75C10 11.1533 9.78929 10.581 9.41421 10.159C9.03914 9.73705 8.53043 9.5 8 9.5C7.46957 9.5 6.96086 9.73705 6.58579 10.159C6.21071 10.581 6 11.1533 6 11.75C6 12.3467 6.21071 12.919 6.58579 13.341C6.96086 13.7629 7.46957 14 8 14C8.53043 14 9.03914 13.7629 9.41421 13.341C9.78929 12.919 10 12.3467 10 11.75ZM8 27.5C8.53043 27.5 9.03914 27.2629 9.41421 26.841C9.78929 26.419 10 25.8467 10 25.25C10 24.6533 9.78929 24.081 9.41421 23.659C9.03914 23.2371 8.53043 23 8 23C7.46957 23 6.96086 23.2371 6.58579 23.659C6.21071 24.081 6 24.6533 6 25.25C6 25.8467 6.21071 26.419 6.58579 26.841C6.96086 27.2629 7.46957 27.5 8 27.5ZM14 10.0625C13.1687 10.0625 12.5 10.8148 12.5 11.75C12.5 12.6852 13.1687 13.4375 14 13.4375H28C28.8312 13.4375 29.5 12.6852 29.5 11.75C29.5 10.8148 28.8312 10.0625 28 10.0625H14ZM14 16.8125C13.1687 16.8125 12.5 17.5648 12.5 18.5C12.5 19.4352 13.1687 20.1875 14 20.1875H28C28.8312 20.1875 29.5 19.4352 29.5 18.5C29.5 17.5648 28.8312 16.8125 28 16.8125H14ZM14 23.5625C13.1687 23.5625 12.5 24.3148 12.5 25.25C12.5 26.1852 13.1687 26.9375 14 26.9375H28C28.8312 26.9375 29.5 26.1852 29.5 25.25C29.5 24.3148 28.8312 23.5625 28 23.5625H14Z"
                        fill="white"
                    />
                </svg>
            </div>
            {/* Show modal Các loại thưởng */}
            <div className="buttonAdd" onClick={showModalTypeReward}>
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
    );
};

export default ListSearchFilterAdd;