import CustomNativeSelect from '@/components/inputs/CustonNativeSelect';
import { MealPeriodArray } from '@/constants/arrays/common';
import { Product, ProductListHomePageResponse } from '@/constants/interfaces/productInterface';
import { CreateMealPayload } from '@/constants/interfaces/requestPayloads/nutritionistPayloads';
import { primaryColor } from '@/constants/theme';
import { ProductController } from '@/controllers/ProductController';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ThemedFormField from '../inputs/CustomFormField';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';
import UrlImage from '../ui/UrlImage';

interface MFInterface {
  onSubmit: (payload: Partial<CreateMealPayload>) => void
}

const MealForm = ({onSubmit}: MFInterface) => {
  // * States
  const [prodName, setProdName] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>([])
  const [description, setDescription] = useState<string>('');
  const [productId, setProductId] = useState<number>(0);
  const [mealTypeId, setMealTypeId] = useState<number>(-1);
  const [quantity, setQuantity] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false)

  // $Functions
  const getProducts = async () => {
    setLoading(true)
    await ProductController
      .getShopProducts(prodName)
      .then((res) => {
        const response = res as ProductListHomePageResponse
        setProductList(response.popularProducts.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const productPress = (product: Product) => {
    if(productId === product.id) {
      setProductId(-1)
    }
    else {
      setProductId(product.id)
    } 
  }

  // £ Effects
  useEffect(() => {
    const handler = setTimeout(() => {
      getProducts();
    }, 1000);
    return () => clearTimeout(handler);
  }, [prodName]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex flex-col gap-8 h-full ">
          {/* Submit Button */}
          <View>
            <PrimaryButton
              buttonText="Crea Pasto"
              onPress={() => onSubmit({
                description,
                productId,
                quantity,
                mealTypeId,
              })}
            />
          </View>

          {/* Form */}
          <View className="flex flex-col gap-4">
            <ThemedFormField 
              label="Prodotto"
              value={prodName}
              setValue={setProdName}
            />
            <View >
              {
                loading ?
                <View className="w-full flex flex-row justify-center">
                  <ActivityIndicator animating size={24} color={primaryColor[500]}  />
                </View>
                :
                <View style={{ height: 120 }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={productList}
                    style={{ flexGrow: 0 }} 
                    contentContainerStyle={{
                      gap: 20,
                      paddingHorizontal: 16,
                    }}
                    ListEmptyComponent={() => (
                      <ThemedText
                        label="Nessun Prodotto Trovato"
                        font="Nunito-Italic"
                        textStyle="text-md"
                      />
                    )}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => productPress(item)}
                        className={`${item.id === productId ? 'bg-primary-500' : 'bg-stone-100 dark:bg-darkColor-800'} relative aspect-square  rounded-xl p-4 justify-start`}
                      >
                        <UrlImage
                          source={item.image}
                          className="self-center"
                          style={{ width: "70%", height: "70%" }}
                          resizeMode="contain"
                        />
                        <ThemedText 
                          label={item.name}
                          numberOfLines={1}
                          darkModeDisabled={item.id !== productId}
                          font='Nunito-Bold'
                          textStyle="text-xl text-primary-500 line-clamp-2"
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              }
            </View>
            <ThemedFormField 
              label="Descrizione"
              value={description}
              setValue={setDescription}
            />
            <ThemedFormField 
              label="Quantità (g)"
              value={quantity}
              setValue={setQuantity}
              keyboardType="decimal-pad"
            />
            <CustomNativeSelect
              value={mealTypeId}
              onValueChange={(val: number) =>
                setMealTypeId(val)
              }
              placeholder="Pasto"
              options={MealPeriodArray.map(b => { return {label: b.label, value: b.id}})}
            />
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
export default MealForm