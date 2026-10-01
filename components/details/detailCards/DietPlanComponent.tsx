import { UserContext } from '@/app/_layout'
import ThemedText from '@/components/ui/ThemedText'
import { AccessTypeEnum } from '@/constants/enums/accessType'
import { DietDetail } from '@/constants/interfaces/nutritionist'
import { primaryColor } from '@/constants/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import React, { useContext } from 'react'
import { View } from 'react-native'

interface DPCInterface {
  dietDetail: DietDetail
}
const DietPlanComponent = ({dietDetail}: DPCInterface) => {
  const { customerId } = useLocalSearchParams<{ customerId: string }>()
    const { user } =  useContext(UserContext)
  
  const routeToDietDetail = () => {
    let pathname:any;

    // 1* Select the correct path to route the user to
    switch(user?.accessTypeId) {
      case AccessTypeEnum.Utente: 
        pathname ='/(tabs)/(user-diet-tab)/[nutritionistId]/[dietPlanId]';
        break;
      case AccessTypeEnum.Nutrizionista:
        pathname ='/(tabs)/(nutritionist-users-tab)/[customerId]/[dietPlanId]';
        break;
    }

    router.push({
      pathname,
      params: {
        customerId: customerId,
        dietPlanId: dietDetail.id,
      },
    });

  }
  return (
    <View style={{backgroundColor: dietDetail.isActive ? primaryColor[500] : ''}} className="bg-primary-500 pt-2 rounded-xl mb-4 ">
      
      { 
        dietDetail.isActive ?
          <View className="flex flex-row justify-center">
            <ThemedText label="Dieta Attiva" font='Nunito-Bold' darkModeDisabled textStyle='text-white' />
          </View>
          : 
          null
      }
      <View className="dark:bg-darkColor-800 bg-stone-200 rounded-xl flex flex-row gap-4 p-4 flex-1 ">
        <View className="flex flex-col flex-1 gap-8 justify-between w-full h-full">
          <View className="flex flex-row justify-between">
            <View>
              <ThemedText
                darkModeDisabled
                textStyle='text-primary-500 text-2xl'
                font='Nunito-Bold'
                label={`${dietDetail.name}`}
              />
              <ThemedText
                font="Nunito-Italic"
                label={dietDetail.description}
              />
              <ThemedText 
                textStyle='text-stone-800 text-sm'
                font='Nunito-Italic'
                label={"Aggiunto il " + moment(dietDetail.created_at).format('DD-MM-yyyy')}
              />
            </View>
              <MaterialCommunityIcons
                onPress={routeToDietDetail} 
                name='chevron-right'
                color={primaryColor[500]}
                size={32}
              />
          </View>
          {/* <MacroBarGraphComponent /> */}
          {/* <View className="flex flex-row justify-end self-end h-auto ">
            <MaterialCommunityIcons
              onPress={() => { router.navigate(`/(tabs)/(nutritionist-users-tab)/${dietDetail.id}`); } } 
              name='chevron-right'
              color={primaryColor[500]}
              size={32}
            />
          </View> */}
        </View>
      </View>
    </View>

  )
}

export default DietPlanComponent