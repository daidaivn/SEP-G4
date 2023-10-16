import "../scss/NotFoundComponent.scss";
import "../scss/reset.scss";
import "../scss/responsive/responsive.scss";
import { Link } from "react-router-dom";
import notFound from "../assets/images/404NotFound.jpg";
const NotFoundComponent = () => {
  return (
    <>
      <div className="container container-not-found">
        <div className="body-not-found">
          <img src={notFound} alt="" />
        </div>
        <Link className="title-not-found" to="/">
          Back to home
        </Link>
      </div>
    </>
  );
};
export default NotFoundComponent;
