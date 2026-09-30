import ThemedText from '@/components/ui/ThemedText';
import { DietDetail } from '@/constants/interfaces/nutritionist';
import { User } from '@/constants/interfaces/usersInterface';
import { primaryColor } from '@/constants/theme';
import { NutritionistController } from '@/controllers/NutritionistController';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import GenericEmptyCardComponent from '../EmptyCards/GenericEmptyCard';
import DietPlanComponent from '../detailCards/DietPlanComponent';

interface DLCInterface {
  user: User; // This is the user the customer / nutritionist is wathcing (respectivelly their own nutritionist / customer)
  newDietPress?: () => void;
}

const DietListComponent = ({user, newDietPress}: DLCInterface) => {
  const [dietList, setDietList] = useState<DietDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // $ Functions
  const getDietList = async () => {
    setLoading(true)
    await NutritionistController.getDietList(user.id)
      .then((res) => {
        setDietList(res as DietDetail[])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  /**
   * Changes the public availability of the diet
   * @param dietId 
   * @param isPublic whether the diet will become public or not
   */
  const activateDiet = async (dietId: number, isPublic: boolean) => {
    setLoading(true)
    await NutritionistController.publishDiet(dietId, isPublic)
      .then(() => {
        getDietList()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // % Effects
  useEffect(() => {
    getDietList()
  }, [])

  return (
    <View className="flex-1">
      {loading ?
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <View className="flex-1">

          <View className="flex flex-row justify-between items-center mb-4 ">
            <ThemedText
              label="Lista Piani Alimentari"
              darkModeDisabled
              textStyle='text-primary-500 text-2xl'
              font="Nunito-Bold"
            />
            {
              newDietPress ?
                <MaterialCommunityIcons
                  onPress={newDietPress} 
                  name='file-document-plus-outline'
                  color={primaryColor[500]}
                  size={24}
                />
              :
              null
            }
          </View>

          <View className="flex flex-row flex-wrap gap-4 w-full flex-1">
            <FlatList
              data={dietList}
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingBottom: 160,
                gap:20,
                marginBottom: 32,
              }}
              ListEmptyComponent={() => { return (
                <GenericEmptyCardComponent 
                  title="Nessun Piano Alimentare"
                  message={`Non sono presenti piani alimentari attivi`}
                  image={require('@/assets/images/illustrations/emptyFridge.png')}
                  buttonText='Crea Il Piano'
                  onPress={newDietPress} 
                />
                )
              }}
              keyExtractor={item => String(item.id)}
              renderItem={
                ({item}) => {
                  return (

                    <ReanimatedSwipeable
                      renderLeftActions={() => (
                        <View className="mr-4 h-24 pt-2">
                          {
                            item.isPublic ?
                              <TouchableOpacity onPress={() => activateDiet(item.id, false)}  className="rounded-xl h-full w-20 bg-rose-500  items-center justify-center">
                                <ThemedText
                                  label="Disattiva"
                                  darkModeDisabled
                                  textStyle="text-white font-semibold"
                                />
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => activateDiet(item.id, true)}  className="rounded-xl h-full w-20 bg-emerald-500  items-center justify-center">
                                <ThemedText
                                  label="Attiva"
                                  darkModeDisabled
                                  textStyle="text-white font-semibold"
                                />
                              </TouchableOpacity>
                          }
                        </View>
                      )}
                      onSwipeableOpen={(direction) => {
                        if (direction === 'left') {
                          null
                        }
                      }}
                      overshootLeft={false}
                    >
                      <DietPlanComponent dietDetail={item} /> 
                    </ReanimatedSwipeable>

                  )
                }
              }
            />
          </View>
        </View>
    }


    </View>
  )
}

export default DietListComponent