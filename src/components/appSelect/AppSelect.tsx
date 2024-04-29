// import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
// import Styles from "./index.module.css";
// import { useDispatch, useSelector } from "react-redux";

import selectStyles from "./AppSelect.module.scss";
// import { setFilterRequest, setCharacter } from "../../store/formStore";
// import { useField, useFormikContext } from "formik";
interface Props {
  filterCategory: string[];
  isModalOpen: boolean;
  openSelect: () => void;
}


// вроде удалось игнорить лейбл но брать данные с инпута и нажимать на лейбл
// { ...props }
// ! в этом компоненте нет смысла так как это просто кнопка он уже не еть селектом
// !Можно переименовать в фильтр
const AppSelect: React.FC<Props> = (props) => {
  return (
    <div className={selectStyles["select"]}>
      <div
        className={classnames(selectStyles["select__header"], {
          // props.selectIsOpen
          [selectStyles["select__header--open"]]: props.isModalOpen,
        })}
        onClick={props.openSelect}
      >
        <span className={selectStyles["select__current"]}>
          Select search criteria
        </span>

        <svg
          className={selectStyles["select__icon"]}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.98438 9.98438H17.0156L12 15L6.98438 9.98438Z'
            fill='#272B33'
          />
        </svg>
      </div>

      <div
        className={classnames(selectStyles["select__body"], {
          [selectStyles["select__active"]]: props.isModalOpen,
        })}
      >
        {props.filterCategory.map((item, i) => (
          <div className={selectStyles["select__item"]} key={item}>
            <label className={selectStyles["select__label"]} htmlFor={item}>
              {item}
            </label>
            <input
              className={selectStyles["select__input"]}
              type='checkbox'
              name={item}
              value={item}
              id={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSelect;
