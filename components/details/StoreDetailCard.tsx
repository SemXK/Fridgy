import { Store } from '@/constants/interfaces/store';
import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import ThemedText from '../ui/ThemedText';
import UrlImage from '../ui/UrlImage';

interface StoreDetailCardInterface {
  store: Store;
}

const StoreDetailCard = (props: StoreDetailCardInterface) => {
  return (
    <View className="bg-darkColor-900 rounded-xl w-full h-32 flex flex-row gap-4 p-4 flex-1">
      
      <View className="bg-darkColor-800 rounded-xl h-full aspect-square">
        <UrlImage source={props.store.profileImage || ''} resizeMode='cover' className="flex-1 rounded-xl aspect-square" />
      </View>

      <View className="flex flex-col flex-1 justify-between">
        <View>
          <ThemedText 
            darkModeDisabled
            textStyle='text-primary-500 text-2xl'
            font='Nunito-Bold'
            label={props.store.name}
          />
          <ThemedText 
            label={"Aggiornato il " + moment(props.store.updated_at).format('DD-MM-yyyy')}
          />
        </View>

        <View className="flex flex-row justify-end self-end h-auto ">
          <MaterialCommunityIcons
            onPress={() => { router.navigate(`/(tabs)/(store-tab)/${props.store.id}`); } } 
            name='chevron-right'
            color={primaryColor[500]}
            size={32}
          />
        </View>
      </View>

    </View>
  )
}

export default StoreDetailCard