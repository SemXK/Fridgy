import React, { useState } from 'react';
import { View } from 'react-native';
import StoreForm from '../forms/StoreForm';
import PrimaryButton from '../pressable/PrimaryButton';

interface CNFCInterface {
  onClose: () => void
}

const CreateNewStoreComponent = (props: CNFCInterface) => {

  // * State
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  // * Functions
  const handleCreateFridge = async () => {
    // if(name){
    //   await ProductController.createFridge({ name })
    //   .then((res) => {
    //     if(res) {
    //       props.onClose()
    //     }
    //   })
    //   .catch(e => {console.log("Create Fridge Error: ", e)}) 
    // }
  }

  // * Display
  return (

      <View className="flex flex-col justify-between gap-4 p-4 ">

        {/* Text Inputs */}
        <StoreForm
          name={name} 
          setName={setName} 
          lat={lat} 
          setLat={setLat} 
          lng={lng} 
          setLng={setLng} 
        />

        {/* Actions */}
        <PrimaryButton onPress={handleCreateFridge} textStyle='text-white' buttonText="Crea Frigorifero"/>

      </View>
  )
}

export default CreateNewStoreComponent