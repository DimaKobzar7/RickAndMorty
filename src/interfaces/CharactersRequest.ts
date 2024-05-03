import { CharacterStatus, CharacterGender } from '../types/CharactersRequest';



export interface CharacterEpisode {
  name: string;
  air_date: string;
  episode: string;
}

export interface CharacterOrigin {
  name: string;
  dimension: string | null;
}

export interface CharacterLocation {
  name: string;
  dimension: string | null;
}

export interface Character {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  type?: string;
  gender: CharacterGender;
  origin:  CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: CharacterEpisode[];
  created?: string;
}


// Определение типов для информации о страницах
export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

// Определение типов для ответа от сервера
export interface RickAndMortyResponse {
  results: Character[];
  info: PageInfo;
}

// Определение типов для запроса
export interface Query {
  req: string;
  filter: string;
}

export interface CharactersRequest {
  req: string;
}