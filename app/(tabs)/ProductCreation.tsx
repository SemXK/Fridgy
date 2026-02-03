import HomePageHeader from '@/components/headers/HomePageHeader'
import ThemedFormField from '@/components/inputs/CustomFormField'
import ThemedSelectField from '@/components/inputs/CustomSelect'
import ThemedTextArea from '@/components/inputs/CustomTextArea'
import PrimaryButton from '@/components/pressable/PrimaryButton'
import FileUploader from '@/components/thirdParty/FileUploader'
import { buildBase64Image } from '@/constants/functions'
import { CreateProductPayload } from '@/constants/interfaces/productInterface'
import { PERCENTUALI_IVA, UNITA_DI_MISURA } from '@/constants/options'
import { ProductController } from '@/controllers/ProductController'
import { AxiosError } from 'axios'
import * as ImagePicker from "expo-image-picker"
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const initialState: CreateProductPayload = {
    name: '',
    description: '',
    brandId: '',
    quantity: '',
    uma: '',
    price: '',
    taxPercent: 0,
    image: ''
}

const ProductCreation = () => {
  // * Display states
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  // * States
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [productForm, setProductForm] = useState<CreateProductPayload>(initialState)

  // * Functions
  const handleSubmit = async () => {
    setLoadingPreview(true)
    const payload: CreateProductPayload = {
      ...productForm, 
      price: parseFloat(productForm.price).toFixed(2),
      uma: UNITA_DI_MISURA[productForm.uma as number],
      image: buildBase64Image(image as ImagePicker.ImagePickerAsset)
    };
    // const product: Product | AxiosError<unknown, any> = 
    const product: any =
    await ProductController.createProduct(payload)
    .then((p) => console.log(p))
    .catch(e => {console.log({msg: e.message})}) 

    console.log({product})
    // 1* Creazione con successo
    if(!(product instanceof AxiosError)) {
      console.log({newproduct: product})
      setProductForm(initialState)
    }

    // 1# Errore durante la creazione
    else {

    }
    setLoadingPreview(false)
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Push content up on iOS
      >
        {/* Tap anywhere outside inputs to dismiss keyboard */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled" // ensures taps work while keyboard is open
          >
            <HomePageHeader title="Crea un prodotto" />
            <FileUploader image={image} setImage={setImage} />

            <View className="flex gap-4 px-4 pb-4">
              {/* Input Nome */}
              <ThemedFormField
                value={productForm.name}
                setValue={(val: string) =>
                  setProductForm({ ...productForm, name: val })
                }
                label="Nome"
              />

              {/* Input Descrizione */}
              <ThemedTextArea
                value={productForm.description}
                setValue={(val: string) =>
                  setProductForm({ ...productForm, description: val })
                }
                label="Descrizione"
              />

              {/* unità di misura */}
              <ThemedSelectField
                label="Unità"
                options={UNITA_DI_MISURA}
                value={productForm.uma}
                setValue={(val: number | string) =>
                  setProductForm({ 
                    ...productForm, 
                    uma: val as number
                  })
                }
              />

              {/* Input quantità (prodotto) */}
              <ThemedFormField
                keyboardType='numeric'
                value={productForm.quantity}
                setValue={(val: string) =>
                  setProductForm({ ...productForm, quantity: val })
                }
                label="Quantità"
              />

              {/* Input prezzo*/}
              <ThemedFormField
                keyboardType='numeric'
                value={productForm.price}
                setValue={(val: string | number) =>
                  setProductForm({ ...productForm, price: val as string })
                }
                label="Prezzo"
              />

              {/* Input IVA */}
              <ThemedSelectField
                label="IVA"
                options={PERCENTUALI_IVA}
                value={productForm.taxPercent}
                setValue={(val) =>
                  setProductForm({ ...productForm, taxPercent: val as number })
                }
              />

            </View>
            
            <View className="w-1/2 self-end my-12">
              <PrimaryButton
                onPress={handleSubmit} 
                mode='text'
                isLoading={loadingPreview}
                textStyle='text-primary-500'
                buttonText="Anteprima prodotto" 
              />
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>


    </SafeAreaView>
  )
}

export default ProductCreation
