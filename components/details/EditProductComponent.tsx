import CustomNativeSelect from '@/components/inputs/CustonNativeSelect';
import { Brand, CreateProductPayload, Product } from '@/constants/interfaces/productInterface';
import { PERCENTUALI_IVA, UNITA_DI_MISURA } from '@/constants/options';
import { FieldController } from '@/controllers/FeldController';
import { AxiosResponse } from 'axios';
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import ThemedSelectField from '../inputs/CustomSelect';

import PrimaryButton from '@/components/pressable/PrimaryButton';
import FileUploader from '@/components/thirdParty/FileUploader';
import { ProductController } from '@/controllers/ProductController';
import ThemedFormField from '../inputs/CustomFormField';
import ThemedTextArea from '../inputs/CustomTextArea';

interface EditProuctInterface {
  onClose: () => void;
  product: Product;
}

const EditProductComponent = (props: EditProuctInterface) => {
  // * Display States
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

  // * States
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [productForm, setProductForm] = useState<CreateProductPayload | null>(null)
  const [brandList, setBrandList] = useState<Brand[]>([])

  // * Functions
  const getBrandList = async() => {
    await FieldController.getBrandList().then((res)=> {
      const response = res as AxiosResponse<Brand[]> 
      setBrandList(response.data);
    })
  }

  const handleSubmit = async () => {
    if(productForm) {
      setLoadingEdit(true);
      
      const formData = new FormData();
      formData.append("id", String(productForm.id));
      formData.append("name", productForm.name);
      formData.append("description", productForm.description);
      formData.append("price", String(parseFloat(productForm.price)));
      formData.append("taxPercent",PERCENTUALI_IVA[productForm.taxPercent].replace("%", ''));
      formData.append("brandId", String(productForm.brandId));
      formData.append("quantity", productForm.quantity);
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
        const newProduct = await ProductController.setProduct(formData);
        setImage(null);
        props.onClose()
      } 
      catch (e: any) {
        console.log({ msg: e.message });
      } 
      finally {
        setLoadingEdit(false);
      }
    }
  };

  // * Effects
  useEffect(() => {
    getBrandList()
    setProductForm({
      ...props.product,
      quantity: props.product.quantity.toString(),
      price: props.product.price.toString(),
      uma: UNITA_DI_MISURA.indexOf(props.product.uma as string),
      taxPercent: PERCENTUALI_IVA.indexOf(parseInt(String(props.product.taxPercent)) + "%"),
    })
  }, [])

  // * Wait for props from parent
  if(!productForm) {
    return 
  }

  // * Display
  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      >
        {/* Tap anywhere outside inputs to dismiss keyboard */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled" 
          >
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
                    uma: val as string
                  })
                }
                }
              />

              {/* Input quantità (prodotto) */}
              <ThemedFormField
                keyboardType='numeric'
                value={productForm.quantity}
                setValue={(val: string) =>
                  setProductForm({ ...productForm, quantity: val})
                }
                label="Quantità"
              />

              {/* Input prezzo*/}
              <ThemedFormField
                keyboardType='numeric'
                value={productForm.price}
                setValue={(val: string) =>
                  setProductForm({ ...productForm, price: val })
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
            
            <View className="w-1/2 self-center my-12">
              <PrimaryButton
                onPress={handleSubmit} 
                isLoading={loadingEdit}
                textStyle='text-primary-500'
                buttonText="Modifica" 
              />
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default EditProductComponent