import ThemedText from '@/components/ui/ThemedText';
import { DietDetail } from '@/constants/interfaces/nutritionist';
import { User } from '@/constants/interfaces/usersInterface';
import { primaryColor } from '@/constants/theme';
import { NutritionistController } from '@/controllers/NutritionistController';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import GenericEmptyCardComponent from '../EmptyCards/GenericEmptyCard';
import DietPlanComponent from '../detailCards/DietPlanComponent';

interface DLCInterface {
  customer: User;
}

const DietListComponent = ({customer}: DLCInterface) => {
  const [dietList, setDietList] = useState<DietDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // $ Functions
  const getDietList = async () => {
    setLoading(true)
    await NutritionistController.getDietList(customer.id)
      .then((res) => {
        setDietList(res as DietDetail[])
      })
      .finally(() => {
        setLoading(false)
      })
  }

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

          <View className="flex flex-row justify-between items-center">
            <ThemedText
              label="Lista Piani Alimentari"
              darkModeDisabled
              textStyle='text-primary-500 text-2xl mb-4'
              font="Nunito-Bold"
            />
            <MaterialCommunityIcons
              onPress={() => null } 
              name='chevron-right'
              color={primaryColor[500]}
              size={24}
            />
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
                  message={`Crea il primo piano alimentare per ${customer.name}`}
                  image={require('@/assets/images/illustrations/emptyFridge.png')}
                  buttonText='Crea Il Piano'
                  onPress={() => null} 
                />
                )
              }}
              keyExtractor={item => String(item.id)}
              renderItem={({item}) =><DietPlanComponent dietDetail={item} /> }
            />
          </View>
        </View>
    }
    </View>
  )
}

export default DietListComponent