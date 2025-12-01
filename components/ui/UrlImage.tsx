// UrlImage.tsx
import Constants from "expo-constants";
import React, { useEffect, useState } from 'react';
import { Image, ImageResizeMode, ImageStyle, StyleProp } from 'react-native';

interface UrlImageProps {
  source: string; 
  width: number;
  height: number;
  resizeMode?: ImageResizeMode;
  style?: StyleProp<ImageStyle>;
  className?: string;
}
  const baseUrl: string = `${
    Constants.deviceName !== 'sdk_gphone64_x86_64' ? 
    process.env.EXPO_PUBLIC_ASSETS_URL
    :
    process.env.EXPO_PUBLIC_EMULATOR_ASSETS_URL
  }`;

const UrlImage = ({ source, width, height, resizeMode = 'contain', style, className }: UrlImageProps) => {
  const [imageUri, setImageUri] = useState<string>("")
  useEffect(() => {
    setImageUri(`${baseUrl}/${source}`)
  }, [])

  if(!imageUri){
    return null;
  }

  return (
    <Image
      className={className}
      style={[{ width, height }, style]}
      source={{ uri: imageUri }}
      resizeMode={resizeMode}
    />
  );
};

export default UrlImage;
