import HomePageHeader from '@/components/headers/HomePageHeader'
import ThemedFormField from '@/components/inputs/CustomFormField'
import ThemedSelectField from '@/components/inputs/CustomSelect'
import ThemedTextArea from '@/components/inputs/CustomTextArea'
import CustomNativeSelect from '@/components/inputs/CustonNativeSelect'
import PrimaryButton from '@/components/pressable/PrimaryButton'
import FileUploader from '@/components/thirdParty/FileUploader'
import { Brand, CreateProductPayload } from '@/constants/interfaces/productInterface'
import { PERCENTUALI_IVA, UNITA_DI_MISURA } from '@/constants/options'
import { FieldController } from '@/controllers/FeldController'
import { ProductController } from '@/controllers/ProductController'
import { AxiosResponse } from 'axios'
import * as ImagePicker from "expo-image-picker"
import React, { useEffect, useState } from 'react'
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
    brandId: 0,
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
  const [brandList, setBrandList] = useState<Brand[]>([])

  // * Functions
  const getBrandList = async() => {
    await FieldController.getBrandList().then((res)=> {
      const response = res as AxiosResponse<Brand[]> 
      setBrandList(response.data);
    })
  }

  // * Effects
  useEffect(() => {
    getBrandList()
  }, [])



  // * Functions
  const handleSubmit = async () => {
    setLoadingPreview(true);

    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("description", productForm.description);
    formData.append("price", parseFloat(productForm.price).toFixed(2));
    formData.append("taxPercent", String(productForm.taxPercent));
    formData.append("brandId", String(productForm.brandId));
    formData.append("quantity", productForm.quantity.toString());
    formData.append("uma", UNITA_DI_MISURA[productForm.uma as number]);

    if (image) {
      const file = {
        uri: image.uri,
        type: image.mimeType || "image/jpeg",
        name: image.fileName || `image.${image.uri.split('.').pop()}`,
      };

      formData.append("image", file as any);
    }

    try {
      const product = await ProductController.createProduct(formData);
      setProductForm(initialState);
      setImage(null);
      console.log({ newproduct: product });
    } 
    catch (e: any) {
      console.log({ msg: e.message });
    } 
    finally {
      setLoadingPreview(false);
    }
  };

  // * Display
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      >
        {/* Tap anywhere outside inputs to dismiss keyboard */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled" 
          >
            <HomePageHeader title="Crea un prodotto" />
            <FileUploader image={image} setImage={setImage} />

            <View className="flex gap-4 px-4 pb-4">

              {/* Select Marca */}
              <CustomNativeSelect
                value={productForm.brandId}
                onValueChange={(val: number) =>
                  setProductForm({ ...productForm, brandId: val })
                }
                placeholder="Marca"
                options={brandList.map(b => { return {label: b.name, value: b.id}})}
              />

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
                setValue={(val: number | string) =>{
                  setProductForm({ 
                    ...productForm, 
                    uma: val
                  })
                }
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
