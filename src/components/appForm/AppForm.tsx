import React, { FC } from "react";
import appFormStyles from "./AppForm.module.scss";


import {
  fetchCharacters,
  addCharacters,
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

  setModalIsOpen,
  // setLocation,
} from "../../store/formStore";

import { charactersRequest } from "../../api";

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// import selectStyles from "./AppSelect.module.scss";
import selectStyles from "../appSelect/AppSelect.module.scss";
import AppModal from '../appModal/AppModal';
import { RickAndMortyResponse } from '../../interfaces/CharactersRequest';
import { FilterRequestData } from '../../interfaces/FormStore';
import { CharacterNames, CharacterPlaceholders } from '../../Enums/AppModal';
import { TipsText, CharacterSpecies, CharacterTypes, CharacterStatus, CharacterGender } from '../../Enums/Tips';

import Tips from '../tips/Tips';


// And now we can use these
const AppForm: FC = () => {
  
  const filterRequestData = useAppSelector(
    (state) => state.formStore.filterRequestData
  );

  const modalIsOpen = useAppSelector((state) => state.formStore.modalIsOpen);

  const filterIsOpen = useAppSelector((state) => state.formStore.filterIsOpen);

  const characterNames: CharacterNames[] = [CharacterNames.Name, CharacterNames.Status,CharacterNames.Species, CharacterNames.Type, CharacterNames.Gender];

  const characterPlaceholders: CharacterPlaceholders[] = [CharacterPlaceholders.Name, CharacterPlaceholders.Status,CharacterPlaceholders.Species, CharacterPlaceholders.Type, CharacterPlaceholders.Gender]

  const characterValues = [
    filterRequestData.characterName,
    filterRequestData.characterStatus,
    filterRequestData.characterSpecies,
    filterRequestData.characterType,
    filterRequestData.characterGender,
  ] as (keyof FilterRequestData)[];


  // console.log("characterNamesArray:", characterNames)

  // console.log("characterPlaceholders:", characterPlaceholders)

  // есть ли смысл сюда писать типы если они определены в пропсах?
  const tipsStatus: string[] = Object.values(CharacterStatus);

  const tipsSpecies: string[] = Object.values(CharacterSpecies);

  const tipsTypes: string[] = Object.values(CharacterTypes);

  const tipsGender: string[] = Object.values(CharacterGender);


  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const handleCancel = () => {
   console.log("handleCancel  is working")

    dispatch(setModalIsOpen(false));
  };


  const getCardInfo = async (
    page: number = 1,
    characterName?: string,
    characterStatus?: string,
    characterSpecies?: string,
    characterType?: string,
    characterGender?: string
  ) => {
    // await тут нужен
    const cardData = await dispatch(
      fetchCharacters(
        charactersRequest(
          page,
          characterName,
          characterStatus,
          characterSpecies,
          characterType,
          characterGender
        )
      )
    );

    setSearchParams(`page=${page}`);
 
    const payloadData = cardData.payload as { data: { characters: RickAndMortyResponse } };

    if (payloadData) {
      dispatch(addCharacters(payloadData.data.characters));
    }
  };

    function areObjectsEqual(obj1: FilterRequestData, obj2: FilterRequestData): boolean {
    // console.log("obj1 at areObjectsEqual:", obj1)
    // console.log("obj2 at areObjectsEqual:", obj2)
    // Get the keys of the first object
    if (!obj1 || !obj2) {
      return false;
    }
    // const keys1 = Object.keys(obj1);
    // const keys2 = Object.keys(obj2);
    const keys1 = Object.keys(obj1) as (keyof FilterRequestData)[];
    const keys2 = Object.keys(obj2) as (keyof FilterRequestData)[];

    // console.log("keys1 at areObjectsEqual:",keys1)
    // console.log("keys2 at areObjectsEqual:",keys2)
  
    // Check if the number of keys is the same in both objects
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    // Iterate over the keys and compare the values
    for (let key of keys1) {
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
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("gg submitForm");

    console.log("filterRequestData at submitForm:", filterRequestData);

    const localStorageItem = localStorage.getItem("userSearchQuery");
    const localStorageData = localStorageItem ? JSON.parse(localStorageItem) : null;

    // ! это было раньше
    // const localStorageData = JSON.parse(
    //   localStorage.getItem("userSearchQuery")
    // );

    const allFilterRequestDataIsEmpty = Object.values(filterRequestData).every(
      (item) => Boolean(item) === false
    );

    console.log("obj is equel so return");

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

    dispatch(setModalIsOpen(false));

    getCardInfo(
      1,
      filterRequestData.characterName,
      filterRequestData.characterStatus,
      filterRequestData.characterSpecies,
      filterRequestData.characterType,
      filterRequestData.characterGender
    );
  };

  const getFilterRequestData = (event: React.ChangeEvent<HTMLInputElement>, searchCriterion: string) => {
    // console.log("event at getFilteredInputData:", event);

    const { name, value } = event.target;
    console.log(
      "event.target.value at  getFilterRequestData:",
      event.target.value
    );
    console.log("value at  getFilterRequestData:", value);

    console.log("name at  getFilterRequestData:", name);

    console.log("searchCriterion at  getFilterRequestData:", searchCriterion);

    dispatch(setFilterRequestData({ value, fieldName: searchCriterion }));
 
  };

  // !тут тоже надо сделать только разовый вызов чтобы без изменений не вызывалось каждый раз
  const removeFilter = () => {
    console.log("filterIsOpen at use state local storage:", filterIsOpen);

    dispatch(setFilterIsOpen(!filterIsOpen));
    dispatch(clearFilterRequest());

    // просто отслеживай номер страницы 1 если сброс был то будет 1 и больше не надо запрос для карточек делать
    // && searchParams.get("page") !== "1"

    const userSearchQuery = localStorage.getItem("userSearchQuery");
    //! неясно нужно ли это условие
  if (!userSearchQuery || !JSON.parse(userSearchQuery)) {
      // console.log("put it here");
      return;
  }
      //! это было
      // if (!JSON.parse(localStorage.getItem("userSearchQuery"))) {
      //   // console.log("put it here");
      //   return;
      // }

      if (filterIsOpen) {
        //! было это
        // getCardInfo(1);
        getCardInfo();

        // setSearchParams(`page=${1}`);
        localStorage.removeItem("userSearchQuery");
      } else {
        // localStorage.removeItem("userSearchQuery");
      }

    // dispatch(clearFilterRequest());
  };

  const openSelect = () => {
    dispatch(setModalIsOpen(!modalIsOpen));

    console.log("modalIsOpen from store:", modalIsOpen);
  };


  const getOnlyChracterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
   
    console.log(
      "value at  getFilterRequestData:",
      value
    );

    console.log("name at  getFilterRequestData:", name);

    dispatch(
      setFilterRequestData({ value, fieldName: name })
    ); 
  }

  return (
    <>
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
            {!modalIsOpen && (
              <>
                <div className={selectStyles["select"]} onClick={openSelect}>
                  <div
                    className={selectStyles["select__header"]}
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
                </div>

                <div className={appFormStyles["appForm__input-wrap"]}>
                  <input
                    name='characterName'
                    placeholder='Add character`s name'
                    className={appFormStyles["appForm__input"]}
                    value={filterRequestData.characterName}
                    onChange={(e) => getFilterRequestData(e, "characterName")}
                  />
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

    <AppModal  
      handleInput={getOnlyChracterName} 
      onSubmit={submitForm} 
      modalOpen={modalIsOpen} 
      modalClose={handleCancel} 
      characterNames={characterNames} 
      characterPlaceholders={characterPlaceholders}
      characterValues={characterValues}
    >
      <Tips
        text={TipsText}
        status={tipsStatus}
        species={tipsSpecies}
        types={tipsTypes}
        gender={tipsGender}
      />
      </AppModal>
    </>
    
  );
};

export default AppForm;
