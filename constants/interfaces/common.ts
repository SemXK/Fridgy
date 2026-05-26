import { Dispatch, SetStateAction } from "react";
import { FridgeAction } from "./productInterface";

export interface SelectItem {
  value: string | number;
  label: string;
}

export interface AgendaFridgeAction extends FridgeAction {
  key: number;
  color: number;
}

export type WithStateSetters<T, EditableKeys extends keyof T> = Partial<T> & {
  [K in EditableKeys as `set${Capitalize<string & K>}`]: Dispatch<SetStateAction<T[K]>>;
};
