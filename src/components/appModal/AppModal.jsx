import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
// import Styles from "./index.module.css";

import appModalStyles from "./AppModal.module.scss";
// import { useField, useFormikContext } from "formik";
import { createPortal } from "react-dom";

const AppModal = ({ children, clickFunc }) => {
  return createPortal(
    <div
      className={appModalStyles["appModal"]}
      onClick={(e) => {
        console.log("e.currentTarget:", e.currentTarget);
        console.log("e.target:", e.target);
        // if (e.currentTarget) {
        //   setFieldValue("selectIsOpen", false);
        //   console.log("gg");
        // }
        // if (e.target.classList.contains(appFormStyles["appForm__modal"])) {
        //   setFieldValue("selectIsOpen", false);
        //   console.log("gg");
        // }
      }}
    >
      <div className={appModalStyles["appModal__body"]}>{children}</div>
    </div>,
    document.body
  );
};

export default AppModal;
