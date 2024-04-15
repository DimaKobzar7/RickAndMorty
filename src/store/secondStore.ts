import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// это в можно .env
const url = "https://rickandmortyapi.com/graphql";

interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type?: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  created: string;
}

// Определение типов для информации о страницах
interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

// Определение типов для ответа от сервера
interface RickAndMortyResponse {

    results: Character[];
    info: PageInfo;

}

// Определение типов для запроса
interface Query {
  req: string;
  filter: string;
}

// это работает!!!
export const fetchCharacters = createAsyncThunk(
  "characters2/fetchCharacters",

  // : object
  async function (query: Query) {
    // console.log("query at fetch Characters:", query);
    // console.log("variables at fetch Characters:", variables);

    const { req, filter } = query;
    console.log("req in fetch Characters:", req);
    // console.log("filter in fetch Characters:", filter);

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

  // возможно стоитсделать несколько сторов
  // initialState: {
  //   characters2: {},
  //   DOMloaded: false,
  //   singleCharacter: {},
  //   singleCharacterID: "",
  //   currentPaginationPage: 1,
  //   disableDownloadBtn: false,
  //   allCharactersId: {},
  //   RequestCharactersId: [],
  // },
  initialState: {
    characters2: {} as RickAndMortyResponse,
    DOMloaded: false as Boolean,
    singleCharacter: {} as Character,
    singleCharacterID: "" as string,
    currentPaginationPage: 1 as number,
    disableDownloadBtn: false,
    allCharactersId: {} as Record<number, Character>,
    RequestCharactersId: [] as number[],
  },
  // тут мы не пишем state.characters.characters так как characters что в индексе при конфиг сторе он глобальный
  // а тут это слайс про глобальный ничего не знает тут только characters что тут есть
  reducers: {

    setDOMLoaded(state, action) {
      state.DOMloaded = false;
    },
    addSingleCharacter(state, action: PayloadAction<Character>) {
      // state.singleCharacter = action.payload;
      // const { data, payload } = action.payload;
      const { payload } = action.payload;
      state.singleCharacter = payload;
      // state.singleCharacter = action.payload;
      // console.log("data at store destruct at addSingleCharacter:", data) 
      console.log(" payload at store destruct at addSingleCharacter:",  payload)
      console.log("action at store destruct at addSingleCharacter:",  action)
      // console.log("action.payload at store for singleCharacter:", action.payload)
      // console.log("state.singleCharacter at store for singleCharacter:", state.singleCharacter)
    },
   
    addCharacters(state, action: PayloadAction<RickAndMortyResponse>) {
      // console.log("it is  addCharacters")
      // state.singleCharacter = action.payload;
      // const { data, payload } = action.payload;
      const { payload } = action.payload;
      // console.log("payload at add character:", payload);
      // console.log("action at add character:", action);
      // state.characters2 = payload;
      // state.characters2 = payload.data.characters.results;
      // state.characters2 = payload.data.characters;
      // state.characters2 = payload.results;
      // state.characters2 = action.payload.results;
      state.characters2 = action.payload;

      // state.characters2 = action.payload.data.characters;
      // state.characters2 = action.payload;

      // if( typeof action.payload === 'object') {
      //   // console.log("object")
      //   state.characters2= action.payload
      // // }

      // console.log("payload at add character:", payload);
    },
    setSingleCharacterID(state, action: PayloadAction<string>) {
      const { data, payload } = action.payload;
      // state.singleCharacterID = payload;
      state.singleCharacterID = action.payload;
      // console.log("action.payload:", action.payload)
      // console.log(" payload at store destruct:",  payload)
      // console.log("action.payload at store for singleCharacter:", action.payload)
      // console.log("state.singleCharacterID at store for singleCharacter:", state.singleCharacterID)
    },
    setCurrentPaginationPage(state, action: PayloadAction<number>) {
      // const { data, payload } = action.payload;

      // state.singleCharacterID = payload;
      state.currentPaginationPage = action.payload;
      // console.log(
      //   "action.payload at setCurrentPaginationPage:",
      //   action.payload
      // );
      // console.log(" payload at store destruct:",  payload)
    },
    setDisableDownloadBtn(state, action: PayloadAction<boolean>) {
      const { data, payload } = action.payload;
      // state.singleCharacterID = payload;
      state.disableDownloadBtn = action.payload;
      // console.log("action.payload:", action.payload)
      // console.log(" payload at store destruct:",  payload)
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
      state.DOMloaded = true;
    });
  },
});

// тут надо указывать название функции чтобы ее было видно в санке в этом же файле
export const {

  setDOMLoaded,
  addSingleCharacter,
  addCharacters,
  setSingleCharacterID,
  setCurrentPaginationPage,
  setDisableDownloadBtn,
  // characters2,
} = secondStoreSlice.actions;

export default secondStoreSlice.reducer;

// 12 min https://www.youtube.com/watch?v=6RTbC8Acj1M
