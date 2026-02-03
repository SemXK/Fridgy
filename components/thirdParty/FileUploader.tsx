import { primaryColor } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import PrimaryButton from "../pressable/PrimaryButton";

interface ImageUploader {
  image: ImagePicker.ImagePickerAsset | null;
  setImage: (val: ImagePicker.ImagePickerAsset) => void
}

export default function FileUploader(props: ImageUploader) {
  const {image, setImage} = props;
  const mediaOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    allowsEditing: true,
    exif: false,
    base64: true
  }

  // * Functions
  const requestPermissions = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPerm.status !== "granted" ||
      mediaPerm.status !== "granted"
    ) {
      Alert.alert("Permission required", "Camera & gallery access is needed.");
      return false;
    }
    return true;
  };
  const pickFromGallery = async () => {
    if (!(await requestPermissions())) return;

    const result = await ImagePicker.launchImageLibraryAsync(mediaOptions);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const takePhoto = async () => {
    if (!(await requestPermissions())) return;

    const result = await ImagePicker.launchCameraAsync(mediaOptions);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>

      {image ? 
        <View className="flex flex-row justify-center ">
          <Image 
            style={styles.preview}
            source={{ uri: image.uri }} 
          />
        </View>
        :
        <View className="" />
      }

      <View className="flex flex-row justify-center gap-8">
        <PrimaryButton 
          onPress={pickFromGallery} 
          mode="text" 
          buttonText="Galleria" 
          leftIcon={<Ionicons name="image" size={24} color={primaryColor[500]} />}
        />
        <PrimaryButton 
          onPress={takePhoto} 
          mode="text" 
          buttonText="Camera" 
          leftIcon={<Ionicons name="camera" size={24} color={primaryColor[500]} />}
        />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  preview: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
