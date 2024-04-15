import { ConfigProvider, Pagination } from "antd";

import appPaginationStyles from "./AppPagination.module.scss";
import { useEffect, useState } from "react";

const AppPagination = ({
  showNextPage,
  showPrevPage,
  currentPage,
  pagination,
  total,
  nextPage,
  prevPage,
  showSizeChanger,
  defaultPageSize,
}) => {
  // useEffect(() => {
  //   console.log("total:", total);
  // }, [total]);

  // useEffect(() => {
  //   console.log("currentPage:", currentPage);
  // }, [currentPage]);

  return (
    <div className={appPaginationStyles["appPagination"]}>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              /* изменило цвет фона активной кнопки */
              itemActiveBg: "#F5F5F5",
              // itemActiveBgDisabled: "rgba(254, 1, 196, 1)",
              // itemBg: "#ff0000",
              // itemInputBg: "#ff0000",
              // itemLinkBg: "#ff0000",
            },
          },
          token: {
            // colorBgContainer: "#fe01c4",
            // colorBgContainerDisabled: "#ff0000",
            // colorBgTextActive: "#d63d2e",

            // colorBgTextHover меняет ховер
            colorBgTextHover: "none",
            // colorBorder: "#d63d2e",
            // colorFillAlter: "#ff0000",
            // это поменяло цвет границы и цифру
            colorPrimary: "#202329",
            // colorPrimaryBorder: "#fe01c4",
            // colorPrimaryHover: "#fe01c4",
            // это меняет цвет не выбраных страниц
            colorText: "rgba(245, 245, 245, 1)",
            // это меняет цвет 3х точек
            // colorTextDisabled: "#fe01c4",
            // colorTextPlaceholder: "rgba(254, 1, 196, 1)",
            // меняет цвет кнопки впеед и назад но при условии что уже 1я или последняя страница
            // controlItemBgActiveDisabled: "#fe01c4",
            // controlOutline: "rgba(27, 255, 46, 1)",
            borderRadius: 4,
            fontFamily: '"Roboto", sans-serif',
            fontSize: 16,
            fontWeightStrong: 400,
            // что то странное делает
            lineHeight: 1.5,
            lineWidth: 0,
            // padding: 50,
            // paddingSM: 50,
            // paddingXXS: 50,
            // margin: 100,
          },
        }}
      >
        {/* className='wp' ставит на обертку класс и rootClassName='test' тоже*/}
        {/* selectComponentClass='gg' */}
        {/* style={{ width: 100 }} */}
        {/* itemRender={(page) => <div className='superTest'></div>} */}
        <Pagination
          responsive={true}
          rootClassName={appPaginationStyles["appPagination__body"]}
          showSizeChanger={showSizeChanger}
          current={currentPage}
          onChange={pagination}
          total={total}
          defaultPageSize={defaultPageSize}
        />
      </ConfigProvider>
      {/* <Pagination
        itemActiveBg='#FF0000'
        itemActiveBgDisabled='rgb(159, 77, 196)'
        itemBg='#4ce2c4'
        itemInputBg='#4ce2c4'
        itemLinkBg='#4ce2c4'
        showSizeChanger={showSizeChanger}
        current={currentPage}
        onChange={pagination}
        total={total}
        defaultPageSize={defaultPageSize}
      /> */}
    </div>
  );
};

export default AppPagination;
