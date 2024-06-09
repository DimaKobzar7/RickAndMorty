import  { FC } from "react";
// import "./App.css";
// import { RouterProvider } from "react-router";

import { ConfigProvider, Drawer } from "antd";

import appDrawerStyles from "./AppDrawer.module.scss";
import { AppDrawerProps } from '../../interfaces/componentsProps/AppDrawer';

const AppDrawer: FC<AppDrawerProps> = ({ openDrawer, closeDrawer }) => {
  const classNames = {
    body: appDrawerStyles["appDrawer__body"],
    mask: appDrawerStyles["appDrawer__mask"],
    header: appDrawerStyles["appDrawer__header"],
    footer: appDrawerStyles["appDrawer__footer"],
    content: appDrawerStyles["appDrawer__content"],
  };

  const drawerStyles = {
    mask: {
      backgroundColor: "rgba(39, 43, 51, 0.8)",
    },
    content: {
      borderRadius: "9px 0px 0px 9px",
      padding: 16,
    },
    header: {
      borderBottom: "none",
      padding: 0,
      marginBottom: 16,
    },

    body: {
      padding: 0,
      display: "flex",
      flexDirection: "column" as const,
      gap: 16,
    },
    footer: {
      borderTop: "none",
      padding: 0,
    },
  };

  // useEffect(() => {
  //   console.log("openDrawer:", openDrawer);
  // }, [openDrawer]);

  return (
    <ConfigProvider drawer={{ classNames, styles: drawerStyles }}>
      {/* styles.wrapper */}
      {/*  contentWrapperStyle был вместо  styles.wrapper*/}
      {/* styles={{
          boxShadow: "none" ,
          width: 419,
          height: 571,
          top: "50%",
          translate: "0 -55%",
          fontFamily: "Roboto, sans-serif",
        }} */}
      <Drawer
        title={
          <h2 className={appDrawerStyles["appDrawer__header"]}>History</h2>
        }
        placement='right'
        closable={false}
        footer={
          <button
            className={appDrawerStyles["appDrawer__button"]}
            onClick={closeDrawer}
          >
            close
          </button>
        }
        onClose={closeDrawer}
        open={openDrawer}
       
      >
        <p className={appDrawerStyles["appDrawer__subTitle"]}>Character:</p>
        <p className={appDrawerStyles["appDrawer__text"]}>Some contents...</p>
        <p className={appDrawerStyles["appDrawer__subTitle"]}>Location:</p>
        <p className={appDrawerStyles["appDrawer__text"]}>Some contents...</p>
        <p className={appDrawerStyles["appDrawer__subTitle"]}>Episode:</p>
        <p className={appDrawerStyles["appDrawer__text"]}>Some contents...</p>
      </Drawer>
    </ConfigProvider>
  );
};

export default AppDrawer;
