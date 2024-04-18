import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface FilterRequestData {
  characterName: string;
  characterStatus: string;
  characterSpecies: string;
  characterType: string;
  characterGender: string;
}

interface FormStoreState {
  filterRequestData: FilterRequestData;
  modalIsOpen: boolean;
  filterIsOpen: boolean;
  inputTest: string;
}

const initialState: FormStoreState = {
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
};

const formStoreSlice = createSlice({
  name: "formStore",

  // возможно стоитсделать несколько сторов
  // initialState: {
  //   // общий стейт для 3х сущностей
  //   filterRequestData: {
  //     characterName: "",
  //     characterStatus: "",
  //     characterSpecies: "",
  //     characterType: "",
  //     characterGender: "",
  //   },

  //   modalIsOpen: false,
  //   filterIsOpen: false,
  //   inputTest: "",
  // },
  initialState,
  // тут мы не пишем state.characters.characters так как characters что в индексе при конфиг сторе он глобальный
  // а тут это слайс про глобальный ничего не знает тут только characters что тут есть
  reducers: {
    setFilterRequestData(state, action: PayloadAction<{ fieldName: string; value: string }>) {
    

      //! это было раньше
      // if (Object.keys(action.payload).includes("value")) {
      //   // console.log("at store  action.payload.value IF");
      //   state.filterRequestData = {
      //     ...state.filterRequestData,
      //     [action.payload.fieldName]: action.payload.value,
      //   };
      // } else {

      //   state.filterRequestData = {
      //     ...state.filterRequestData,
      //     // [action.payload]: action.payload,
      //     ...action.payload,
      //   };
      // }

      // console.log(
      //   "state.filterRequestData at store at setFilterRequestData:",
      //   state.filterRequestData
      // );
      // !новое
      if ("value" in action.payload) {
        state.filterRequestData = {
          ...state.filterRequestData,
          [action.payload.fieldName]: action.payload.value,
        };
      } else {
        state.filterRequestData = {
          ...state.filterRequestData,
          ...action.payload,
        };
      }
    },

    clearFilterRequest(state) {
      // !это старое
      // state.filterRequestData = {
      //   characterName: "",
      //   characterStatus: "",
      //   characterSpecies: "",
      //   characterType: "",
      //   characterGender: "",
      // };
      state.filterRequestData = initialState.filterRequestData;
    },

    setModalIsOpen(state, action: PayloadAction<boolean>) {
      // console.log("action at setModalIsOpen:", action);
      state.modalIsOpen = action.payload;

      // console.log("state.modalIsOpen at store:", state.modalIsOpen);
    },
    setFilterIsOpen(state, action: PayloadAction<boolean>) {
      // console.log("action at setModalIsOpen:", action);
      state.filterIsOpen = action.payload;

      // console.log("state.modalIsOpen at store:", state.modalIsOpen);
    },
    setInputTest(state, action: PayloadAction<string>) {
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
