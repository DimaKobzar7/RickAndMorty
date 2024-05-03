import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { FormStoreState } from '../interfaces/FormStore';


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
};

const formStoreSlice = createSlice({
  name: "formStore",

  initialState,
  // тут мы не пишем state.characters.characters так как characters что в индексе при конфиг сторе он глобальный
  // а тут это слайс про глобальный ничего не знает тут только characters что тут есть
  // тут надо Partial<FormStoreState["filterRequestData"] поправить
  // Partial<FormStoreState["filterRequestData"]>> означает, что параметр action.payload может быть частичным объектом типа FormStoreState["filterRequestData"], то есть он может содержать некоторые, но не все поля, определенные в типе FormStoreState["filterRequestData"]
  // вот переделака 
  //Partial<{
//   characterName: string;
//   characterStatus: string;
//   characterSpecies: string;
//   characterType: string;
//   characterGender: string;
// }>
  reducers: {
    setFilterRequestData(state, action: PayloadAction<{ fieldName: string; value: string } | Partial<FormStoreState["filterRequestData"]>>) {
    
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
      state.modalIsOpen = action.payload;
    },
    setFilterIsOpen(state, action: PayloadAction<boolean>) {
      state.filterIsOpen = action.payload;
    },
   
  },
});

// тут надо указывать название функции чтобы ее было видно в санке в этом же файле
export const {
  setModalIsOpen,
  setFilterRequestData,
  clearFilterRequest,
  setFilterIsOpen,
} = formStoreSlice.actions;

export default formStoreSlice.reducer;
