import React from 'react';

const ListTableGroup = ({ roles, handleDetailGroup }) => {
  return (
    <table className="list-table">
      <thead>
        <tr>
          <td>STT</td>
          <td>Nhóm</td>
          <td>Số nhân viên</td>
          <td>Trưởng nhóm</td>
        </tr>
      </thead>
      <tbody className="scrollbar" id="style-15">
        {roles.length === 0 ? (
          <p>Thông tin nhóm chưa sẵn sàng hoặc không tồn tại.</p>
        ) : (
          roles.map((role, index) => (
            <tr key={role.teamId} onClick={() => handleDetailGroup(role.teamId, role.teamName)}>
              <td>{index + 1}</td>
              <td>{role.teamName}</td>
              <td>{role.numberOfTeamMember}</td>
              <td>{role.teamLeaderName}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ListTableGroup;
