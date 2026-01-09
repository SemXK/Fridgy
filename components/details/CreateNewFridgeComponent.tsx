import { ProductController } from '@/controllers/ProductController';
import React, { useState } from 'react';
import { View } from 'react-native';
import ThemedFormField from '../inputs/CustomFormField';
import ThemedTextArea from '../inputs/CustomTextArea';
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
    if(name && description){
      await ProductController.createFridge(name, description)
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
      <View className="flex flex-col gap-4">


        <ThemedFormField
          value={name}
          setValue={setName}
          label="Nome"
        />
        <ThemedTextArea
          value={description}
          setValue={setDescription}
          label="Descrizione"
        />      
      </View>


      {/* Actions */}
      <PrimaryButton onPress={handleCreateFridge} buttonText="Crea Frigorifero"/>

    </View>
  )
}

export default CreateNewFridgeComponent