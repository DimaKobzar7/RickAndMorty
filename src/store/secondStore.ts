import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Query, RickAndMortyResponse, Character } from '../interfaces/CharactersRequest';

// это в можно .env
const url = "https://rickandmortyapi.com/graphql";

// это работает!!!
export const fetchCharacters = createAsyncThunk(
  "characters2/fetchCharacters",

  async function (query: Query) {
    const { req, filter } = query;

    console.log("req in fetch Characters:", req);

    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: req,
        variables: { filter },
      }),
    });

    const result: RickAndMortyResponse = await response.json();

    console.log("result in fetchCharacters at store with graphql:", result);

    return result;
  }
);



const secondStoreSlice = createSlice({
  name: "characters2",

  initialState: {
    characters2: {} as RickAndMortyResponse,
    singleCharacter: {} as Character,
    singleCharacterID: "" as string,
    // currentPaginationPage: 1 as number,
    currentPaginationPage: '' as string,
    disableDownloadBtn: false,
    allCharactersId: {} as Record<number, Character>,
    RequestCharactersId: [] as number[],
  },
 
  reducers: {
    addSingleCharacter(state, action: PayloadAction<Character>) {
      state.singleCharacter = action.payload;
    },
   
    addCharacters(state, action: PayloadAction<RickAndMortyResponse>) {
      state.characters2 = action.payload;
    },
    setSingleCharacterID(state, action: PayloadAction<string>) {
      state.singleCharacterID = action.payload;
    },

    setCurrentPaginationPage(state, action: PayloadAction<string>) {
      state.currentPaginationPage = action.payload;
    },

    setDisableDownloadBtn(state, action: PayloadAction<boolean>) {
      state.disableDownloadBtn = action.payload;
    },
  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      // мжно диспачить как в самой функции так и тут но без диспатча передавать в стор
      // console.log("action.payload at add case:", action.payload);
      // if (action.payload) {
      //   state.characters.push(action.payload);
      // }
      // console.log("action:", action);
      // console.log("action.payload:", action.payload);
      // state.characters2.push(action.payload);
      // походу от постоянных запросв не уйти так как нельзя написать услови чтобы вызвало функцию когда выбран фильтр та как оно будет уже заполнено
      // или сделать еще юз ефект от смены стейта что будет в фильтре
      // state.characters2 = action.payload;
      // state.DOMloaded = true;
    });
  },
});

// тут надо указывать название функции чтобы ее было видно в санке в этом же файле
export const {
  addSingleCharacter,
  addCharacters,
  setSingleCharacterID,
  setCurrentPaginationPage,
  setDisableDownloadBtn,
} = secondStoreSlice.actions;

export default secondStoreSlice.reducer;

// 12 min https://www.youtube.com/watch?v=6RTbC8Acj1M
