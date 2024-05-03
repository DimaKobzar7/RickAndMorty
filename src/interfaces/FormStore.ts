export interface FilterRequestData {
  characterName: string;
  characterStatus: string;
  characterSpecies: string;
  characterType: string;
  characterGender: string;
}

export interface FormStoreState {
  filterRequestData: FilterRequestData;
  modalIsOpen: boolean;
  filterIsOpen: boolean;
}