import { ChangeEvent } from "react";

export interface AppModalProps {
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  modalOpen: boolean;
  modalClose: () => void;
}