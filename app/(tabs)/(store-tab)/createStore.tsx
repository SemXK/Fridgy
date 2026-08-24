import NewStoreHeader from '@/components/headers/NewStoreHeader';
import ThemedFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import FileUploader from '@/components/thirdParty/FileUploader';
import TopSnackbar from '@/components/ui/SnackbarComponent';
import { SnackbarStatus } from '@/constants/enums/common';
import { primaryColor } from '@/constants/theme';
import { StoreController } from '@/controllers/StoreController';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  type Region
} from 'react-native-maps';

const INITIAL_REGION: Region = {
  latitude: 41.890211,
  longitude: 12.492211,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const CreateStore = () => {
  // * States
  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<number>(INITIAL_REGION.latitude);
  const [lng, setLng] = useState<number>(INITIAL_REGION.longitude);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)


  // % Fucntions
  const handleCreateStore = async () => {
    if(name && lat && lng && address) {
      setLoading(true);      
      const formData = new FormData();  
      formData.append("name", name);
      formData.append("address", address);
      formData.append("lat", String(lat));
      formData.append("lng", String(lng));
      if (image) {
        const file = {
          uri: image.uri,
          type: image.mimeType || "image/jpeg",
          name: image.fileName || `image.${image.uri.split('.').pop()}`,
        };
        formData.append("profileImage", file as any);
      }
      await StoreController.setStore(formData).then(() => {
        setName('')
        setAddress('')
        setLat(0)
        setLng(0)
        setImage(null)
        router.navigate(`/(tabs)/(store-tab)`)
      })
      .finally(() => {
        setLoading(false);      
      })
    }
    else{
      setBarStatus(SnackbarStatus.Warning)
      setShowSnackbar("Compila tutti i campi")
    } 
  }
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <View className="flex-1 w-screen">
        {/* Snackbar */}
        <TopSnackbar
          status={barStatus}
          message={showSnackbar} 
          onHide={() => setShowSnackbar('')} 
        />

        {/* Gmaps Section */}
        <View className="h-1/2 w-full">
          <Image
            source={require('@/assets/images/placeholder/maps.png')}
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>

        {/* { Forms Section} */}
        <View className="h-1/2 w-full">
          <NewStoreHeader  />
          <ScrollView className="flex-1">
            <FileUploader image={image} setImage={setImage} />

            <View className="p-4 flex flex-col justify-between gap-4">
              <View className="gap-4">
                <ThemedFormField
                  label={"Nome"}
                  value={name}
                  setValue={setName}
                />
                <ThemedFormField
                  label={"Indirizzo"}
                  value={address}
                  setValue={setAddress}
                />

              </View>

              <View className="align-bottom">
                {
                  !loading ? 

                  <PrimaryButton
                    buttonText='Crea'
                    onPress={handleCreateStore}
                  />
                :
                  <View className="w-full flex flex-row justify-center">
                    <ActivityIndicator animating size={24} color={primaryColor[500]} />
                  </View>
                }
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
  </KeyboardAvoidingView>

    // <MapView
    //   provider={PROVIDER_GOOGLE}
    //   style={{ flex: 1 }}
    //   initialRegion={INITIAL_REGION}
    //   showsCompass={false}
    //   showsTraffic={false}
    //   showsBuildings
    //   zoomEnabled
    //   scrollEnabled
    //   rotateEnabled
    //   pitchEnabled={false}
    // />
  );
};

export default CreateStore;
