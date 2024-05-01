// import { useEffect, useState } from "react";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { Card, Col, DatePicker, Flex, Pagination, Row } from "antd";

const AppContainer = ({ children }) => {
  return (
    <>
      {/* <Row>
        <Col xs={1} sm={2}></Col>
        <Col xs={22} sm={20}>
          <Outlet />
        </Col>
        <Col xs={1} sm={2}></Col>
      </Row> */}
      <Row>
        <Col xs={1} sm={2} md={2} lg={3}></Col>

        {/* sm: 16, md: 24, lg: 32  */}
        <Col xs={22} sm={20} md={20} lg={18}>
          {children}
        </Col>
        <Col xs={1} sm={2} md={2} lg={3}></Col>
      </Row>
      {/* это ниже старое рабочее */}
      {/* <Row>
        <Col xs={1}></Col>
       
        <Col xs={22}>{children}</Col>
        <Col xs={1}></Col>
      </Row> */}
    </>
  );
};

export default AppContainer;
