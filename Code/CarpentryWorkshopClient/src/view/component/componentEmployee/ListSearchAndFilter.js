import React from 'react';
import { Select, Input} from "antd";
import AddEmployeeModal from './AddEmployeeModal';
import NewContractModal from './NewContracModal';
import NewRoleDepartmentModal from './NewRoleDepartmentModule';
import EditContractModal from './EditContractModal';
import ViewContractModal from './ViewContractModal';

const ListSearchAndFilter = ({
  handleChangeInnputSearch,
  filterGender,
  handleChangeFilterGender,
  filterRole,
  handleSelectChange,
  selectOptions,
  filterStatus,
  handleChangeFilterStatus,
  showModalAdd,
  isModalOpenAdd,
  handleOkAdd,
  handleCancelAdd,
  avt,
  originalLastName,
  setOriginalLastName,
  originalFirstName,
  setOriginalFirstName,
  originalPhoneNumber,
  setOriginalPhoneNumber,
  originalGender,
  setOriginalGender,
  originalNationality,
  setOriginalNationality,
  countries,
  originalAddress,
  setOriginalAddress,
  originalCIC,
  setOriginalCIC,
  originalTaxId,
  setOriginalTaxId,
  convertDobToISO,
  originalDOB,
  setOriginalDOB,
  originalStatus,
  setOriginalStatus,
  originalEmail,
  setOriginalEmail,
  handleCancelAddContract,
  handleOkAddContract,
  isModalOpenAddContract,
  showModalAddRole,
  showModalAddContract,
  handleChange,
  handleCancelAddRole,
  handleOkAddRole,
  isModalOpenAddRole,
  roleDepartmentValues,
  roles,
  setRoleDepartmentValues,
  handleCancelEditContract,
  handleOkEditContract,
  isModalOpenEditContract,
  isEditingContract,
  handleEditContract,
  departments,
  handleCancelViewContract,
  handleSaveContract,
  AddEmployee,
  handlePhoneNumberChange,
  handleCICChange,
  contract,
  contractTypes,
  contractCode,
  setContractCode,
  contractStartDate,
  setContractStartDate,
  contractEndDate,
  setContractEndDate,
  contractType,
  setContractType,
  contractLink,
  setContractLink,
  contractStatus,
  setContractStatus,
  EditName,
  handleImageUpload,
  previewImage,
  setPreviewImage
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
        <Input
          placeholder="Tìm kiếm"
          onChange={handleChangeInnputSearch}
        ></Input>
      </div>
      <div className="list-filter">
        <i className="list-filter-icon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.07 16.5201C17.8373 16.5201 19.27 15.0874 19.27 13.3201C19.27 11.5528 17.8373 10.1201 16.07 10.1201C14.3027 10.1201 12.87 11.5528 12.87 13.3201C12.87 15.0874 14.3027 16.5201 16.07 16.5201Z"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.87 17.1201L18.87 16.1201"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
        <Select
          className="select-input"
          value={filterGender}
          style={{
            width: 120,
          }}
          onChange={handleChangeFilterGender}
          options={[
            {
              value: true,
              label: "Nam",
            },
            {
              value: false,
              label: "Nữ",
            },
            filterGender !== null
              ? {
                value: null,
                label: "Bỏ chọn",
              }
              : null,
          ].filter(Boolean)}
          placeholder="Chọn giới tính"
        />
      </div>
      <div className="list-filter">
        <i className="list-filter-icon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.07 16.5201C17.8373 16.5201 19.27 15.0874 19.27 13.3201C19.27 11.5528 17.8373 10.1201 16.07 10.1201C14.3027 10.1201 12.87 11.5528 12.87 13.3201C12.87 15.0874 14.3027 16.5201 16.07 16.5201Z"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.87 17.1201L18.87 16.1201"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
        <Select
          className="select-input"
          value={filterRole}
          style={{ width: 120 }}
          onChange={handleSelectChange}
          options={selectOptions}
          placeholder="Chọn chức vụ"
        />
      </div>
      <div className="list-filter">
        <i className="list-filter-icon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.07 16.5201C17.8373 16.5201 19.27 15.0874 19.27 13.3201C19.27 11.5528 17.8373 10.1201 16.07 10.1201C14.3027 10.1201 12.87 11.5528 12.87 13.3201C12.87 15.0874 14.3027 16.5201 16.07 16.5201Z"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.87 17.1201L18.87 16.1201"
              stroke="#3A5A40"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
        <Select
          className="select-input"
          value={filterStatus}
          style={{
            width: 120,
          }}
          onChange={handleChangeFilterStatus}
          options={[
            {
              value: true,
              label: "Bật",
            },
            {
              value: false,
              label: "Tắt",
            },
            filterStatus !== null
              ? {
                value: null,
                label: "Bỏ chọn",
              }
              : null,
          ].filter(Boolean)}
          placeholder="Chọn trạng thái"
        />
      </div>
      <div className="list-add" onClick={showModalAdd}>
        <i className="icon-web">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M20.8745 16.75H18.6245V14.5C18.6245 14.09 18.2845 13.75 17.8745 13.75C17.4645 13.75 17.1245 14.09 17.1245 14.5V16.75H14.8745C14.4645 16.75 14.1245 17.09 14.1245 17.5C14.1245 17.91 14.4645 18.25 14.8745 18.25H17.1245V20.5C17.1245 20.91 17.4645 21.25 17.8745 21.25C18.2845 21.25 18.6245 20.91 18.6245 20.5V18.25H20.8745C21.2845 18.25 21.6245 17.91 21.6245 17.5C21.6245 17.09 21.2845 16.75 20.8745 16.75Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M22.3745 8.52V3.98C22.3745 2.57 21.7345 2 20.1445 2H16.1045C14.5145 2 13.8745 2.57 13.8745 3.98V8.51C13.8745 9.93 14.5145 10.49 16.1045 10.49H20.1445C21.7345 10.5 22.3745 9.93 22.3745 8.52Z"
              fill="white"
            />
            <path
              d="M10.8745 8.52V3.98C10.8745 2.57 10.2345 2 8.64451 2H4.60451C3.01451 2 2.37451 2.57 2.37451 3.98V8.51C2.37451 9.93 3.01451 10.49 4.60451 10.49H8.64451C10.2345 10.5 10.8745 9.93 10.8745 8.52Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M10.8745 19.77V15.73C10.8745 14.14 10.2345 13.5 8.64451 13.5H4.60451C3.01451 13.5 2.37451 14.14 2.37451 15.73V19.77C2.37451 21.36 3.01451 22 4.60451 22H8.64451C10.2345 22 10.8745 21.36 10.8745 19.77Z"
              fill="white"
            />
          </svg>
        </i>
      </div>
      <AddEmployeeModal
        avt={avt}
        isModalOpenAdd={isModalOpenAdd}
        handleOkAdd={handleOkAdd}
        handleCancelAdd={handleCancelAdd}
        originalLastName={originalLastName}
        setOriginalLastName={setOriginalLastName}
        originalFirstName={originalFirstName}
        setOriginalFirstName={setOriginalFirstName}
        originalPhoneNumber={originalPhoneNumber}
        setOriginalPhoneNumber={setOriginalPhoneNumber}
        originalGender={originalGender}
        setOriginalGender={setOriginalGender}
        originalNationality={originalNationality}
        setOriginalNationality={setOriginalNationality}
        originalAddress={originalAddress}
        setOriginalAddress={setOriginalAddress}
        originalCIC={originalCIC}
        setOriginalCIC={setOriginalCIC}
        originalTaxId={originalTaxId}
        setOriginalTaxId={setOriginalTaxId}
        originalEmail={originalEmail}
        setOriginalEmail={setOriginalEmail}
        originalDOB={originalDOB}
        setOriginalDOB={setOriginalDOB}
        originalStatus={originalStatus}
        setOriginalStatus={setOriginalStatus}
        convertDobToISO={convertDobToISO}
        showModalAddContract={showModalAddContract}
        showModalAddRole={showModalAddRole}
        countries={countries}
        AddEmployee={AddEmployee}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleCICChange={handleCICChange}
        contractCode={contractCode}
        setContractCode={setContractCode}
        contractStartDate={contractStartDate}
        setContractStartDate={setContractStartDate}
        contractEndDate={contractEndDate}
        setContractEndDate={setContractEndDate}
        contractType={contractType}
        setContractType={setContractType}
        contractLink={contractLink}
        setContractLink={setContractLink}
        contractStatus={contractStatus}
        setContractStatus={setContractStatus}
        contractTypes={contractTypes}
        handleImageUpload={handleImageUpload}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />

      <NewContractModal
        isModalOpenAddContract={isModalOpenAddContract}
        handleOkAddContract={handleOkAddContract}
        handleCancelAddContract={handleCancelAddContract}
        handleChange={handleChange}
        contractCode={contractCode}
        setContractCode={setContractCode}
        contractStartDate={contractStartDate}
        setContractStartDate={setContractStartDate}
        contractEndDate={contractEndDate}
        setContractEndDate={setContractEndDate}
        contractType={contractType}
        setContractType={setContractType}
        contractLink={contractLink}
        setContractLink={setContractLink}
        contractStatus={contractStatus}
        setContractStatus={setContractStatus}
        convertDobToISO={convertDobToISO}
        contractTypes={contractTypes}
      />
      <NewRoleDepartmentModal
        isModalOpenAddRole={isModalOpenAddRole}
        handleOkAddRole={handleOkAddRole}
        handleCancelAddRole={handleCancelAddRole}
        roleDepartmentValues={roleDepartmentValues}
        setRoleDepartmentValues={setRoleDepartmentValues}
        roles={roles}
        departments={departments}
      />
      {isEditingContract ? (
        <EditContractModal
          isModalOpenEditContract={isModalOpenEditContract}
          handleOkEditContract={handleOkEditContract}
          handleCancelEditContract={handleCancelEditContract}
          handleChange={handleChange}
          handleCancelViewContract={handleCancelViewContract}
          handleSaveContract={handleSaveContract}
          contractCode={contractCode}
          setContractCode={setContractCode}
          contractStartDate={contractStartDate}
          setContractStartDate={setContractStartDate}
          contractEndDate={contractEndDate}
          setContractEndDate={setContractEndDate}
          contractType={contractType}
          setContractType={setContractType}
          contractLink={contractLink}
          setContractLink={setContractLink}
          contractStatus={contractStatus}
          setContractStatus={setContractStatus}
          convertDobToISO={convertDobToISO}
          contractTypes={contractTypes}
          EditName={EditName}
        />
      ) : (
        <ViewContractModal
          isModalOpenEditContract={isModalOpenEditContract}
          handleOkEditContract={handleOkEditContract}
          handleCancelEditContract={handleCancelEditContract}
          handleChange={handleChange}
          handleEditContract={handleEditContract}
          contract={contract}
          contractTypes={contractTypes}
          convertDobToISO={convertDobToISO}
        />
      )}
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
  );
};

export default ListSearchAndFilter;
