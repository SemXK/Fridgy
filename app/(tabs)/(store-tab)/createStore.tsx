import NewStoreHeader from '@/components/headers/NewStoreHeader';
import ThemedFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import FileUploader from '@/components/thirdParty/FileUploader';
import TopSnackbar from '@/components/ui/SnackbarComponent';
import { SnackbarStatus } from '@/constants/enums/common';
import { CreateStorePayload, Store } from '@/constants/interfaces/store';
import { primaryColor } from '@/constants/theme';
import { StoreController } from '@/controllers/StoreController';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  type Region
} from 'react-native-maps';

const INITIAL_REGION: Region = {
  latitude: 41.8902,
  longitude: 12.4922,
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
  const [lat, setLat] = useState<number>(41.96405671);
  const [lng, setLng] = useState<number>(12.058631111);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)


  // % Fucntions
  const handleCreateStore = async () => {
    if(name && lat && lng) {
      setLoading(true);      
      const payload: CreateStorePayload = {
        name,
        address,
        lat,
        lng,
        profileImage: image,
      }
      await StoreController.setStore(payload).then((res) => {
        const newStore = res as Store
        router.navigate(`/(tabs)/(store-tab)/${newStore.id}`)
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
    <View className="h-screen w-screen">
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
        <ScrollView className="h-1/2 w-full">
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
