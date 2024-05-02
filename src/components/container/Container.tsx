// import { useEffect, useState } from "react";
import { useEffect, ReactNode } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { Card, Col, DatePicker, Flex, Pagination, Row } from "antd";

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <>
      <Row>
        <Col xs={1} sm={2}></Col>
        
        <Col xs={22} sm={20}>
          {children}
        </Col>
        <Col xs={1} sm={2}></Col>
      </Row>
     
    </>
  );
};

export default AppContainer;
