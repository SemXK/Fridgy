import MacroBarGraphComponent from '@/components/graphs/MacroBarGraphComponent'
import ThemedText from '@/components/ui/ThemedText'
import { DietDetail } from '@/constants/interfaces/nutritionist'
import { primaryColor } from '@/constants/theme'
import moment from 'moment'
import React from 'react'
import { View } from 'react-native'

interface DPCInterface {
  dietDetail: DietDetail
}
const DietPlanComponent = ({dietDetail}: DPCInterface) => {
  return (
    <View style={{backgroundColor: dietDetail.isActive ? primaryColor[500] : ''}} className="bg-primary-500 pt-2 rounded-lg mb-4 ">

      <View className="dark:bg-darkColor-900 bg-stone-200 rounded-xl flex flex-row gap-4 p-4 flex-1 ">
        <View className="flex flex-col flex-1 gap-8 justify-between w-full h-full">
          <View className="">
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
            {/* <ThemedText 
              label={props.store.address}
            /> */}
            <ThemedText 
              textStyle='text-stone-800 text-sm'
              font='Nunito-Italic'
              label={"Aggiunto il " + moment(dietDetail.created_at).format('DD-MM-yyyy')}
            />
          </View>
          <MacroBarGraphComponent />
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