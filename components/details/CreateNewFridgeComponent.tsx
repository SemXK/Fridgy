import { ProductController } from '@/controllers/ProductController';
import React, { useState } from 'react';
import { View } from 'react-native';
import FridgeForm from '../forms/FridgeForm';
import PrimaryButton from '../pressable/PrimaryButton';

interface CNFCInterface {
  onClose: () => void
}

const CreateNewFridgeComponent = (props: CNFCInterface) => {

  // * State
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // * Functions
  const handleCreateFridge = async () => {
    if(name){
      await ProductController.createFridge({ name, description})
      .then((res) => {
        if(res) {
          props.onClose()
        }
      })
      .catch(e => {console.log("Create Fridge Error: ", e)}) 
    }
  }

  // * Display
  return (

      <View className="flex flex-col justify-between gap-4 p-4 ">

        {/* Text Inputs */}
        <FridgeForm
          name={name} 
          description={description}  
          setName={setName} 
          setDescription={setDescription}  
        />

        {/* Actions */}
        <PrimaryButton onPress={handleCreateFridge} textStyle='text-white' buttonText="Crea Frigorifero"/>

      </View>
  )
}

export default CreateNewFridgeComponent