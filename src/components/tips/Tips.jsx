// import { useState, useEffect, useRef } from "react";
import classnames from "classnames";

import tipsStyles from "./Tips.module.scss";

// Перепроверь стили на мобилке особенно на сайари там точно места не будет при вводе в инпут оно перекроет кнопку файнд
// ! стили мобилы поломаны
// //! миксины не работают
//  ! надо делать 1 айтем и туда по массиву загонять и общие стили кинуть в форму а не тут 4 цикла
const Tips = ({ title, status, species, types, gender }) => {
  return (
    <div className={tipsStyles["tips"]}>
      <h2 className={tipsStyles["tips__title"]}>{title}</h2>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>Status</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {status.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>Species</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {species.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>Types</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {types.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>Gender</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {gender.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;
