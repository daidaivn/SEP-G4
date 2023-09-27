import "../scss/reset.scss";
import "../scss/responsive.scss";
import "../scss/ListEmployeeComponent.scss";
import MenuComponent from "./MenuComponent";
import { Col, Row } from "antd";
import { Input, Space } from "antd";
const ListEmployeeComponent = () => {
  const { Search } = Input;

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="list-employee">
      <Row>
        <Col span={4}>
          <MenuComponent />
        </Col>
        <Col span={20}>
          <div className="body-list-employee">
            <div className="head-list">
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ListEmployeeComponent;
