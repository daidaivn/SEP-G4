import user from "../../assets/images/Ellipse 69.svg";
import notification from "../../assets/images/icons/notification.svg";
import "../../scss/index.scss"

function ListUserHeader() {
    return(
        <div className="list-user-header">
            <span>User</span>
            <img className="user-list" src={user} alt="" />
            <img className="notification-list" src={notification} alt="" />
          </div>
    )
}
export default ListUserHeader;