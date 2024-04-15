import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const formStoreSlice = createSlice({
  name: "formStore",

  // возможно стоитсделать несколько сторов
  initialState: {
    // общий стейт для 3х сущностей
    filterRequestData: {
      characterName: "",
      characterStatus: "",
      characterSpecies: "",
      characterType: "",
      characterGender: "",
    },

    modalIsOpen: false,
    filterIsOpen: false,
    inputTest: "",
  },
  // тут мы не пишем state.characters.characters так как characters что в индексе при конфиг сторе он глобальный
  // а тут это слайс про глобальный ничего не знает тут только characters что тут есть
  reducers: {
    setFilterRequestData(state, action) {
      // console.log("action at setFilterRequestData:", action);

      // if (action.payload.value) {
      //   console.log("at store  action.payload.value IF");
      //   state.filterRequestData = {
      //     ...state.filterRequestData,
      //     [action.payload.fieldName]: action.payload.value,
      //   };
      // } else {
      //   // работает это условие и оно багает
      //   console.log("at store not action.payload.value ELSE");
      //   // console.log("else for store for local storage");
      //   // работает но почему то при он моунте даннфе в запрос не летят
      //   state.filterRequestData = {
      //     ...state.filterRequestData,
      //     // [action.payload]: action.payload,
      //     ...action.payload,
      //   };
      // }

      // new tests
      // state.filterRequestData = {
      //   ...state.filterRequestData,
      //   [action.payload.fieldName]: action.payload.value,
      // };

      if (Object.keys(action.payload).includes("value")) {
        // console.log("at store  action.payload.value IF");
        state.filterRequestData = {
          ...state.filterRequestData,
          [action.payload.fieldName]: action.payload.value,
        };
      } else {
        // работает это условие и оно багает
        // console.log("at store not action.payload.value ELSE");
        // console.log("else for store for local storage");
        // работает но почему то при он моунте даннфе в запрос не летят
        state.filterRequestData = {
          ...state.filterRequestData,
          // [action.payload]: action.payload,
          ...action.payload,
        };
      }

      // console.log(
      //   "state.filterRequestData at store at setFilterRequestData:",
      //   state.filterRequestData
      // );
    },

    clearFilterRequest(state, action) {
      state.filterRequestData = {
        characterName: "",
        characterStatus: "",
        characterSpecies: "",
        characterType: "",
        characterGender: "",
      };
    },

    setModalIsOpen(state, action) {
      // console.log("action at setModalIsOpen:", action);
      state.modalIsOpen = action.payload;

      // console.log("state.modalIsOpen at store:", state.modalIsOpen);
    },
    setFilterIsOpen(state, action) {
      // console.log("action at setModalIsOpen:", action);
      state.filterIsOpen = action.payload;

      // console.log("state.modalIsOpen at store:", state.modalIsOpen);
    },
    setInputTest(state, action) {
      console.log("action at ssetInputTest:", action);
      state.inputTest = action.payload;

      // console.log("state.modalIsOpen at store:", state.modalIsOpen);
    },
  },
});

// тут надо указывать название функции чтобы ее было видно в санке в этом же файле
export const {
  // setCharacter,
  // setLocation,
  // setEpisode,
  setModalIsOpen,
  // setFilterRequest,
  setFilterRequestData,
  clearFilterRequest,
  setFilterIsOpen,
  // setDefaultInput,
  setInputTest,
} = formStoreSlice.actions;

export default formStoreSlice.reducer;
