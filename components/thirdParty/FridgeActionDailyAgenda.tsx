import { useFridge } from '@/app/(tabs)/(fridge-tab)/_layout';
import { AgendaFridgeAction } from '@/constants/interfaces/common';
import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { DefaultSectionT, SectionListProps, View } from 'react-native';
import { AgendaList } from 'react-native-calendars';
import ThemedText from '../ui/ThemedText';

const FridgeActionDailyAgenda = () => {

  // £ Context
  const { fridgeAgendaProps } = useFridge();

  // const agendaItems: SectionListProps<any, DefaultSectionT>['sections'] = [
  //   {
  //     title: '2024-03-01',
  //     data: [{name: 'Meeting', hour: '9am'}]
  //   },
  //   {
  //     title: '2024-03-02',
  //     data: [{name: 'Lunch', hour: '12pm'}, {name: 'Dinner', hour: '9pm', idType: 2}]
  //   }
  // ];

  // * States
  const [agendaActions, setAgendaActions] = useState<SectionListProps<AgendaFridgeAction, DefaultSectionT>['sections']>([])

  // * effect listener
  useEffect(() => {
    setAgendaActions([{data: fridgeAgendaProps || []}])
    // console.log(fridgeAgendaProps)
  }, [fridgeAgendaProps])

  return (
    <View>
      <AgendaList 
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d3436',
        }}
        sections={agendaActions}
        renderItem={({item}) => (
          <View className="flex flex-row justify-between my-2 dark:bg-darkColor-800 m-2 rounded-xl p-4">
            <View className="w-[15%] aspect-square rounded-xl bg-rose-500 flex items-center justify-center " >
              {/* Icon based on the fridge action Type */}
              {item.fridgeActionTypeId === 1 && <Entypo name='new' size={32} color='white' />}
              {item.fridgeActionTypeId === 3 && <Entypo name='shopping-basket' size={32} color='white' />}
            </View>
            <View className="w-[80%] h-12 ">
              <ThemedText darkModeDisabled font='Nunito-Bold' textStyle='text-2xl text-primary-500' label={item?.fridgeAction.name } />
              {/* <ThemedText textStyle='' label={} /> */}
            </View>
          </View>
          )}
        
      />
    </View>
  )
}

export default FridgeActionDailyAgenda