import * as ImagePicker from "expo-image-picker";


export function formatDate(date: Date) {
  const formattedDate = new Date(date).toLocaleDateString()
}

/**
 * Prepares a decoded base64 file into an encoded base64 format ready to be saved on server-side
 * @param image object to be loaded
 * @returns encoded base64 uri
 */
export const buildBase64Image = (image: ImagePicker.ImagePickerAsset) => {
  return `data:image/${image.mimeType?.split('/')[1] ?? 'jpeg'};base64,${image.base64}`;
};