
import { AppContainerProps } from '../../interfaces/componentsProps/Container';
import {  Col, Row } from "antd";

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <Row>
      <Col xs={1} sm={2}></Col>
        <Col xs={22} sm={20}>
          {children}
        </Col>
      <Col xs={1} sm={2}></Col>
    </Row>
  );
};

export default AppContainer;
