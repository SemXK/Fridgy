// UrlImage.tsx
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

const UrlImage = ({ source, width, height, resizeMode = 'contain', style, className }: UrlImageProps) => {
  const [imageUri, setImageUri] = useState<string>("")
  useEffect(() => {
    setImageUri(`${process.env.EXPO_PUBLIC_ASSETS_URL}/${source}`)
  }, [])

  if(!imageUri){
    return null;
  }

  return (
    <Image
      className={className}
      style={{ width, height }}
      source={{ uri: imageUri }}
      resizeMode={resizeMode}
    />
  );
};

export default UrlImage;
