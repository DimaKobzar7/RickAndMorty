import {  ReactNode } from "react";
import { CharacterNames, CharacterPlaceholders } from '../../Enums/AppModal';
import { FilterRequestData } from '../FormStore';

// export interface AppModalProps {
//   handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
//   onSubmit: () => void;
//   modalOpen: boolean;
//   modalClose: () => void;
// }

// export interface AppModalProps {
//   handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
//   modalOpen: boolean;
//   modalClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
// }

// export interface AppModalProps {
//   handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
//   onSubmit: (event: FormEvent<HTMLFormElement>) => void;
//   modalOpen: boolean;
//   modalClose: () => void;
// }

export interface AppModalProps {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  modalOpen: boolean;
  modalClose: () => void;
  characterNames: CharacterNames[];
  characterPlaceholders: CharacterPlaceholders[];
  characterValues: (FilterRequestData[keyof FilterRequestData])[];
  children?: ReactNode; // Добавляем children в интерфейс
}