import { FC } from "react";
import classnames from "classnames";
import { AppSelectProps } from '../../interfaces/componentsProps/AppSelect';

import selectStyles from "./AppSelect.module.scss";


// вроде удалось игнорить лейбл но брать данные с инпута и нажимать на лейбл
// { ...props }
// ! в этом компоненте нет смысла так как это просто кнопка он уже не еть селектом
// !Можно переименовать в фильтр
const AppSelect: FC<AppSelectProps> = ({filterCategory, isModalOpen, openSelect}) => {
  return (
    <div className={selectStyles["select"]}>
      <div
        className={classnames(selectStyles["select__header"], {
          // props.selectIsOpen
          [selectStyles["select__header--open"]]: isModalOpen,
        })}
        onClick={openSelect}
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
          [selectStyles["select__active"]]: isModalOpen,
        })}
      >

        <div className={selectStyles["select__item"]}>
            <label className={selectStyles["select__label"]}>
             
            </label>
            <input
              className={selectStyles["select__input"]}
              type='checkbox'
             
            />
          </div>
        {/* {props.filterCategory.map((item, i) => (
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
        ))} */}
      </div>
    </div>
  );
};

export default AppSelect;
