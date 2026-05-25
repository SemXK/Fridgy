import { FridgeAction } from "./productInterface";

export interface SelectItem {
  value: string | number;
  label: string;
}

export interface AgendaFridgeAction extends FridgeAction {
  key: number;
  color: number;
}
