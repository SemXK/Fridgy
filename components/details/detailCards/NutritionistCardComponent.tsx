import ThemedText from '@/components/ui/ThemedText';
import UrlImage from '@/components/ui/UrlImage';
import { NutritionistPivot } from '@/constants/interfaces/pivots';
import { User } from '@/constants/interfaces/usersInterface';
import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface CCCInterface {
  nutritionist: NutritionistPivot<User>;
}

const NutritionistCardComponent = ({nutritionist}: CCCInterface) => {
  return (
    <View className="dark:bg-darkColor-900 bg-stone-200 rounded-xl w-full h-32 flex flex-row gap-4 p-4 flex-1">
      
      <View className="dark:bg-darkColor-800 bg-white rounded-full h-full aspect-square">
        <UrlImage source={nutritionist?.profilePic|| ''} resizeMode='cover' className="flex-1 rounded-xl aspect-square" />
      </View>

      <View className="flex flex-col flex-1 justify-between">
        <View className="flex-1">
          <ThemedText
            darkModeDisabled
            textStyle='text-primary-500 text-2xl'
            font='Nunito-Bold'
            label={`${nutritionist.name} ${nutritionist.surname}`}
          />
          {/* <ThemedText
            darkModeDisabled
            textStyle='text-primary-500 bg-primary-500/10 rounded-lg '
            label={props.store.pivot.accessType.type}
          /> */}
          {/* <ThemedText 
            label={props.store.address}
          /> */}
          <ThemedText 
            textStyle='text-stone-800 text-sm'
            font='Nunito-Italic'
            label={"Aggiunto il " + moment(nutritionist.nutritionistPivot?.created_at).format('DD-MM-yyyy')}
          />
        </View>

        <View className="flex flex-row justify-end self-end h-auto ">
          <MaterialCommunityIcons
            onPress={() => { router.navigate(`/(tabs)/(nutritionist-users-tab)/${nutritionist.id}`); } } 
            name='chevron-right'
            color={primaryColor[500]}
            size={32}
          />
        </View>
      </View>

    </View>
  )
}

export default NutritionistCardComponent