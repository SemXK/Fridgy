// components/ui/AnimatedTabBar.tsx
import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function AnimatedTabBar({ state, descriptors, navigation }: any) {

  return (
    <View
      style={{
        position: 'fixed',
        bottom: 40,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: primaryColor[600],
        borderRadius: 20,
        elevation: 10,
        marginHorizontal: 40
      }}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        console.log({
          state
        })
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center' }}
          >

            <MotiView
              animate={{
                scale: isFocused ? 1.2 : 1,
                translateY: isFocused ? -5 : 0,
              }}
              transition={{ type: 'timing', duration: 250 }}
            >
              <MaterialCommunityIcons
                className=" text-primary-600"
                name="fridge-outline"
                size={24}
                color='white'
              />
            </MotiView>

            {/* <Text
              style={{
                color: isFocused ? 'red' : 'black',
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </Text> */}

          </TouchableOpacity>
        );
      })}
    </View>
  );
}
