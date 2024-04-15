import AppContainer from "../container/Container";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
  DownloadOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  EllipsisOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import {
  Card,
  Col,
  DatePicker,
  Flex,
  Pagination,
  Row,
  FloatButton,
  ConfigProvider,
} from "antd";

import floatActionBtnStyles from "./FloatActionBtn.module.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FloatActionBtn = ({ showDrawer, downloadFunc, disableDownloadBtn }) => {
  // useEffect(() => {
  //   console.log("disableDownloadBtn :", disableDownloadBtn);
  // }, [disableDownloadBtn]);

  return (
    <FloatButton.Group
      trigger='click'
      onClick={() => {
        console.log("click");
      }}
      className={floatActionBtnStyles["floatActionBtn"]}
      icon={
        <div className={floatActionBtnStyles["floatActionBtn__mainBtn"]}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
              stroke='#3C3E44'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z'
              stroke='#3C3E44'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z'
              stroke='#3C3E44'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      }
    >
      {/* closeIcon={<p>gg</p>} */}
      <FloatButton
        className={floatActionBtnStyles["floatActionBtn__history"]}
        onClick={showDrawer}
        icon={<InfoCircleOutlined />}
      />
      {/*   onClick={downloadCharacters} */}
      {/* disabled block */}
      <FloatButton
        disabled={disableDownloadBtn}
        className={floatActionBtnStyles["floatActionBtn__download"]}
        onClick={downloadFunc}
        icon={<DownloadOutlined />}
      />
    </FloatButton.Group>
  );
};

export default FloatActionBtn;
