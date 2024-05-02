import React, { useEffect, useState, FC, ChangeEvent } from "react";

// import AppModal from "../appModal/AppModal";
import { Modal, ConfigProvider } from "antd";

import modalStyles from "../appModal/AppModal.module.scss";

import Tips from "../tips/Tips";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

interface Props {
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  modalOpen: boolean;
  modalClose: () => void;
}

// And now we can use these
const AppModal: FC<Props> = ({handleInput, onSubmit, modalOpen, modalClose}) => {
  
  const filterRequestData = useAppSelector(
    (state) => state.formStore.filterRequestData
  );


  const characterPlaceholder = [
    "Add Name",
    "Add Status",
    "Add Species",
    "Add Type",
    "Add Gender",
  ];

  // const charactersName = ["name", "status", "species", "type", "gender"];

  const charactersName = [
    "characterName",
    "characterStatus",
    "characterSpecies",
    "characterType",
    "characterGender",
  ];

  const charactersValues = [
    filterRequestData.characterName,
    filterRequestData.characterStatus,
    filterRequestData.characterSpecies,
    filterRequestData.characterType,
    filterRequestData.characterGender,
  ];

  //! надо перепроверить
  const species = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    // "Cyborg"
  ];

  //! надо перепроверить
  // ! это в .env можо поставить
  // !это все в енамы
  const types = [
    // типов human много и об этом надо пометку сделать
    "Human",
    // типов елиен много и об этом надо пометку сделать
    "Alien",

    // "Humanoid",
    // "Poopybutthole",
    // "Mythological",
    "Unknown",
    "Animal",
    // "Disease",
    //  типов робот много и об этом надо пометку сделать
    "Robot",
    "Cronenberg",
    "Cyborg",
  ];

  const status = ["Alive", "Dead", "Unknown"];

  const gender = ["Female", "Male", "Genderless", "Unknown"];

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

      // width: "auto",
    },
    header: {
      // borderBottom: "none",
      // padding: 0,
      // marginBottom: 16,
      width: "auto",
    },

    body: {
      padding: 0,
      display: "flex",
      // width: "auto",
      flexDirection: "column" ,
      // "@media (maxWidth: 1199px)": {
      //   // Стили для маленьких экранов
      //   padding: "210px", // Пример изменения отступа для маленьких экранов
      // },
      // gap: 16,
    },
    // footer: {
    //   borderTop: "none",
    //   padding: 0,
    // },
  };

 

 
  return (
    <ConfigProvider
        modal={{
          classNames,
          styles: modalStylesAntd,
        }}
      >
        {/* onOk={() => console.log("gg at modal ant design")} */}
        <Modal
          footer={null}
          centered={true}
          closeIcon={false}
          open={modalOpen}
          onCancel={modalClose}
          
          width={"auto"}
          className={modalStyles["appModal"]}
        >
          <Tips
            title='Available search queries'
            status={status}
            species={species}
            types={types}
            gender={gender}
          />
          <form className={modalStyles["appModal__form"]} onSubmit={onSubmit}>
            <div className={modalStyles["appModal__wrap"]}>
              <div className={modalStyles["appModal__input-wrap"]}>
                {/* это для фильтра по критериям */}
                {charactersName.map((item, i) => {
                  return (
                    <input
                      name={item}
                      placeholder={characterPlaceholder[i]}
                      className={
                        modalStyles["appModal__input"]
                      }
                      key={item}
                      value={charactersValues[i]}
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
