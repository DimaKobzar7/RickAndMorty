import {  FC } from "react";

import { CloseOutlined } from "@ant-design/icons";
import { Modal, ConfigProvider } from "antd";

import { AppModalProps } from '../../interfaces/componentsProps/AppModal';

import modalStyles from "../appModal/AppModal.module.scss";

const AppModal: FC<AppModalProps> = ( {handleInput, onSubmit, modalOpen, modalClose, characterNames, characterPlaceholders, characterValues, children}) => {
  const classNames = {
    body: modalStyles["appModal__body"],
    mask: modalStyles["appModal__mask"],
    header: modalStyles["appModal__header"],
    footer: modalStyles["appModal__footer"],
    content: modalStyles["appModal__content"],
  };

  const modalStylesAntd = {
    mask: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    content: {
      backgroundColor: "transparent",
      padding: 0,
      boxShadow: "none",
      
    },
  };

  return (
    <ConfigProvider
        modal={{
          classNames,
          styles: modalStylesAntd,
        }}
      >
    
        <Modal
          footer={null}
          centered={true}
          closeIcon={<CloseOutlined className={modalStyles["appModal__icon"]}/>}
          open={modalOpen}
          onCancel={modalClose}
          
         
          width={"auto"}
          className={modalStyles["appModal"]}
        >
         
          { children }

          <form className={modalStyles["appModal__form"]} onSubmit={onSubmit}>
            <div className={modalStyles["appModal__wrap"]}>
              <div className={modalStyles["appModal__input-wrap"]}>
                {/* это для фильтра по критериям */}
                {/*  autoComplete="off" это костыль что просто отключает авто дополнение */}
                {characterNames.map((item, i) => {
                  return (
                    <input
                      name={item}
                      placeholder={characterPlaceholders[i]}
                      className={modalStyles["appModal__input"]}
                      key={item}
                      value={characterValues[i]}
                      onChange={(event) => handleInput(event)}
                    />
                  );
                })}
                <button
                type='submit'
                className={modalStyles["appModal__filterBtn"]}
              >
                find
              </button>
              </div>
            </div>
          </form>
          
        </Modal>
      </ConfigProvider>
  );
};

export default AppModal;
