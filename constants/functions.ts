import * as ImagePicker from "expo-image-picker";
import { FridgeActionColor } from "./enums/fridgeActionColors";

export function formatDate(date: Date) {
  const formattedDate = new Date(date).toLocaleDateString();
}

/**
 * Prepares a decoded base64 file into an encoded base64 format ready to be saved on server-side
 * @param image object to be loaded
 * @returns encoded base64 uri
 */
export const buildBase64Image = (image: ImagePicker.ImagePickerAsset) => {
  return `data:image/${image.mimeType?.split("/")[1] ?? "jpeg"};base64,${image.base64}`;
};
/**
 * Given an action id, returns a color for that action to show in the calendar / agenda
 * @param actionId the id of the fridge action
 * @returns string the color to display
 */
export const getFridgeActionsColor = (actionId: number) => {
  switch (actionId) {
    case 1:
      return FridgeActionColor.FRIDGE_CREATION;
    case 2:
      return FridgeActionColor.FRIDGE_EDIT;
    case 3:
      return FridgeActionColor.ADD_PRODUCT;
    case 4:
      return FridgeActionColor.CONSUME_PRODUCT;
    case 5:
      return FridgeActionColor.DISCARD_PRODUCT;
    default:
      return "";
  }
};
