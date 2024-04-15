import React, { useEffect, useState } from "react";
// import ReactDOM, { createPortal } from "react-dom";
// import { Formik, Form, useField, Field, useFormikContext } from "formik";
import AppSelect from "./AppSelect";
import AppInputs from "./AppInputs";
import classnames from "classnames";
//  import * as Yup from 'yup';

import appFormStyles from "./AppForm.module.scss";
import customSelectInputsStyles from "../formikCurrent/AppInputs.module.scss";
import AppModal from "../appModal/AppModal";
import { Button, Modal, ConfigProvider } from "antd";

import modalStyles from "../appModal/AppModal.module.scss";

// import customSelectInputsStyles from "../formikCurrent/AppInputs.module.scss";
import {
  fetchCharacters,
  addCharacters,
  setCurrentPaginationPage,
} from "../../store/secondStore";

import { useSearchParams } from "react-router-dom";
import {
  clearFilterRequest,
  setFilterIsOpen,
  // setCharacter,
  // setDefaultInput,
  // setEpisode,
  // setFilterRequest,
  setFilterRequestData,
  setInputTest,
  setModalIsOpen,
  // setLocation,
} from "../../store/formStore";
import { useDispatch, useSelector } from "react-redux";
import { charactersRequest } from "../../api";
import Tips from "../tips/Tips";

// And now we can use these
const AppForm = () => {
  // const displayData = useSelector((state) => state.secondTest.characters2);
  // const formData = useSelector((state) => state.formStore);
  // const filterRequest = useSelector((state) => state.formStore.filterRequest);
  const defaultInput = useSelector((state) => state.formStore.defaultInput);
  // form input data
  // const characters = useSelector((state) => state.formStore.character);
  // const locations = useSelector((state) => state.formStore.location);
  // const episodes = useSelector((state) => state.formStore.episode);

  const filterRequestData = useSelector(
    (state) => state.formStore.filterRequestData
  );

  const modalIsOpen = useSelector((state) => state.formStore.modalIsOpen);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
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

  const locationPlaceholder = ["Add Name", "Add Type", "Add Dimension"];

  // const locationsName = ["name", "type", "dimension"];

  const locationsName = ["locationName", "locationType", "locationDimension"];

  const episodesPlaceholder = ["Add Name", "Add Episode code"];

  // const episodesName = ["name", "episodeCode"];

  const episodesName = ["episodeName", "episodeCode"];

  const defaultInputPlaceholder = ["Add key words to find"];

  // const defaultInputName = ["defaultInput"];

  const defaultInputName = ["defaultCharacterName"];

  const filterCategory = ["Character", "Location", "Episodes"];

  // const [selectIsOpen, setSelectIsOpen] = useState(false);

  // const [filterIsOpen, setFilterIsOpen] = useState(false);

  const filterIsOpen = useSelector((state) => state.formStore.filterIsOpen);

  // console.log()

  const handleCancel = (e) => {
    console.log("e.target at handleCancel:", e.target);

    dispatch(setModalIsOpen(false));
    // setSelectIsOpen(true);

    // dispatch(clearFilterRequest());
    // dispatch(setCharacter(false));
  };

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

  // Human: This type represents characters that are primarily human or humanoid.
  // Alien: Characters that are not human and originate from other planets or dimensions.
  // Robot: Characters that are mechanical beings or robots.
  // Cyborg: Characters that are part human and part machine.
  // Animal: Characters that are non-human animals, either sentient or non-sentient.
  // Mythological: Characters inspired by mythology or folklore.
  // Unknown: This type may be used for characters whose type is not specified or unknown.

  // тут все возможно с маленькой буквы
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
      flexDirection: "column",
      // gap: 16,
    },
    // footer: {
    //   borderTop: "none",
    //   padding: 0,
    // },
  };

  const getCardInfo = async (
    page,
    characterName,
    characterStatus,
    characterSpecies,
    characterType,
    characterGender
  ) => {
    // await тут нужен
    const cardData = await dispatch(
      fetchCharacters(
        charactersRequest(
          page,
          // 1
          // filterRequestData.characterName,
          // filterRequestData.characterStatus,
          // filterRequestData.characterSpecies,
          // filterRequestData.characterType,
          // filterRequestData.characterGender
          characterName,
          characterStatus,
          characterSpecies,
          characterType,
          characterGender
        )
      )
    );

    setSearchParams(`page=${page}`);
    // setSearchParams("page=1");
    // dispatch(addCharacters(cardData));
    dispatch(addCharacters(cardData.payload.data.characters));
  };

  function areObjectsEqual(obj1, obj2) {
    // Get the keys of the first object
    if (!obj1 || !obj2) {
      return;
    }
    const keys = Object.keys(obj1);

    // Check if the number of keys is the same in both objects
    if (keys.length !== Object.keys(obj2).length) {
      return false;
    }

    // Iterate over the keys and compare the values
    for (let key of keys) {
      // If the value in obj1[key] is different from obj2[key], return false
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    // If all values are the same, return true
    return true;
  }

  // долго думает секунд 2 и висят старые карточки надо лоудер или еще что то воткнуть
  // ! надо что то придумать с пустыми полями в локал стредже так как когда там все пусто то при перезагрузке не летит заапрос
  const submitForm = (e) => {
    e.preventDefault();
    console.log("gg submitForm");

    // console.log("filterRequestData:", filterRequestData);

    const localStorageData = JSON.parse(
      localStorage.getItem("userSearchQuery")
    );

    const allFilterRequestDataIsEmpty = Object.values(filterRequestData).every(
      (item) => Boolean(item) === false
    );

    if (
      areObjectsEqual(localStorageData, filterRequestData) ||
      (!localStorageData && allFilterRequestDataIsEmpty)
    ) {
      console.log("obj is equel so return");
      // если локал сторедж и стор с запросом одинаковый то удалять локал сторедж (НЕ ПЕРЕЗАПИСАТЬ А УДАЛИТЬ!)
      // но такая штука создает возможность клаацать на кнопку и кучу запросов делать из за того что на клик по кнопке создается по новой стор
      // localStorage.removeItem("userSearchQuery");
      return;
    }

    localStorage.setItem("userSearchQuery", JSON.stringify(filterRequestData));

    // console.log("gg");

    dispatch(setModalIsOpen(false));

    // console.log(
    //   "filterRequestData.characterName, gggggg:",
    //   filterRequestData.characterName
    // );

    getCardInfo(
      1,
      filterRequestData.characterName,
      filterRequestData.characterStatus,
      filterRequestData.characterSpecies,
      filterRequestData.characterType,
      filterRequestData.characterGender
    );
  };

  const getFilterRequestData = (event, searchCriterion) => {
    // console.log("event at getFilteredInputData:", event);

    const { name, value } = event.target;
    console.log(
      "event.target.value at  getFilterRequestData:",
      event.target.value
    );
    console.log("value at  getFilterRequestData:", value);

    console.log("name at  getFilterRequestData:", name);

    console.log("searchCriterion at  getFilterRequestData:", searchCriterion);

    // dispatch(setFilterRequestData({ value, fieldName: name }));
    dispatch(setFilterRequestData({ value, fieldName: searchCriterion }));
    // dispatch(
    //   setFilterRequestData({ value: event.target.value, fieldName: name })
    // );
  };

  // !тут тоже надо сделать только разовый вызов чтобы без изменений не вызывалось каждый раз
  const removeFilter = () => {
    console.log("filterIsOpen at use state local storage:", filterIsOpen);

    dispatch(setFilterIsOpen(!filterIsOpen));

    // просто отслеживай номер страницы 1 если сброс был то будет 1 и больше не надо запрос для карточек делать
    // && searchParams.get("page") !== "1"
    if (!JSON.parse(localStorage.getItem("userSearchQuery"))) {
      // console.log("put it here");
      return;
    }

    if (filterIsOpen) {
      getCardInfo(1);

      // setSearchParams(`page=${1}`);
      localStorage.removeItem("userSearchQuery");
    } else {
      // localStorage.removeItem("userSearchQuery");
    }

    dispatch(clearFilterRequest());
  };

  const openSelect = () => {
    dispatch(setModalIsOpen(!modalIsOpen));

    console.log("modalIsOpen from store:", modalIsOpen);
  };

  // const inputTestStore = useSelector((state) => state.formStore.inputTestStore);

  return (
    <form className={appFormStyles["appForm"]} onSubmit={submitForm}>
      <div className={appFormStyles["appForm__body"]}>
        {!modalIsOpen && (
          <button
            className={appFormStyles["appForm__filterBtn"]}
            type='button'
            onClick={removeFilter}
          >
            {filterIsOpen ? "remove filter" : "add filter"}
          </button>
        )}

        {filterIsOpen && (
          <div className={appFormStyles["appForm__wrap"]}>
            {/*  handleOptionClick={handleOptionClick} */}
            {/* filterRequest={filterRequest} */}
            {!modalIsOpen && (
              <AppSelect
                filterCategory={filterCategory}
                name='selected'
                openSelect={openSelect}
                isModalOpen={modalIsOpen}
              />
            )}

            <ConfigProvider
              modal={{
                classNames,
                styles: modalStylesAntd,
              }}
            >
              <Modal
                footer={null}
                centered={true}
                closeIcon={false}
                open={modalIsOpen}
                onCancel={handleCancel}
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
                <div className={modalStyles["appModal__wrap"]}>
                  {/* name='character' */}
                  {/*  filterRequestData={filterRequestData} */}
                  {/* <AppInputs
                    charactersInfo={charactersName}
                    characterPlaceholder={characterPlaceholder}
                    type='text'
                    getInputValue={getFilterRequestData}
                    charactersValues={charactersValues}
                  /> */}
                  <div className={customSelectInputsStyles["selectInputs"]}>
                    {charactersName.map((item, i) => {
                      return (
                        <input
                          name={item}
                          placeholder={characterPlaceholder[i]}
                          className={
                            customSelectInputsStyles["selectInputs__input"]
                          }
                          key={item}
                          value={charactersValues[i]}
                          onChange={(event) => {
                            const { name, value } = event.target;
                            // console.log(
                            //   "event.target.value at  getFilterRequestData:",
                            //   event.target.value
                            // );
                            console.log(
                              "value at  getFilterRequestData:",
                              value
                            );

                            console.log("name at  getFilterRequestData:", name);

                            // console.log(
                            //   "searchCriterion at  getFilterRequestData:",
                            //   searchCriterion
                            // );

                            dispatch(
                              setFilterRequestData({ value, fieldName: name })
                            );
                            // dispatch(setFilterRequestData(value));
                          }}
                        />
                      );
                    })}
                    {/* <button
                      type='submit'
                      className={appFormStyles["appForm__filterBtn"]}
                      onClick={submitForm}
                    >
                      find
                    </button> */}
                  </div>

                  <button
                    type='submit'
                    className={appFormStyles["appForm__filterBtn"]}
                    onClick={submitForm}
                  >
                    find
                  </button>
                </div>
              </Modal>
            </ConfigProvider>

            {!modalIsOpen && (
              <>
                <div className={customSelectInputsStyles["selectInputs"]}>
                  {/* characterName */}
                  {/*  value={filterRequestData.defaultCharacterName} */}
                  {/* defaultCharacterName */}
                  <input
                    name='characterName'
                    placeholder='Add character`s name'
                    className={customSelectInputsStyles["selectInputs__input"]}
                    value={filterRequestData.characterName}
                    onChange={(e) => getFilterRequestData(e, "characterName")}
                  />

                  {/*  value={inputTest} */}
                  {/* <input
                    name='characterName'
                    placeholder='test name'
                    className={customSelectInputsStyles["selectInputs__input"]}
                    value={inputTestStore}
                    onChange={(event) => {
                      const { name, value } = event.target;

                      // тут все работает
                      console.log("name at store inputTest:", name);
                      console.log("value at store inputTest:", value);
                      // dispatch(
                      //   setFilterRequestData({
                      //     value,
                      //     fieldName: name,
                      //   })
                      // );

                      dispatch(setInputTest(value));
                      // dispatch(setInputTest({ value }));
                    }}
                  /> */}
                </div>
                <button
                  type='submit'
                  className={appFormStyles["appForm__filterBtn"]}
                >
                  find
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default AppForm;
