import { UserContext } from '@/app/_layout';
import { ProhibitedRoutes } from '@/constants/arrays/prohibitedRoutes';
import { GetAllowedRoutes } from '@/constants/functions/AllowedRoutes';
import { TabBarIcons } from '@/constants/iconConstants';
import { StateRoute } from '@/constants/interfaces/common';
import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import { MotiView } from 'moti';
import React, { useContext, useEffect, useState } from 'react';
import { Appearance, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const ActiveTabbarVertical = 4
const InactiveTabbarVertical = -100

function getFocusedRouteName(route: any): string {
  let r = route;
  while (r?.state && r.state.index != null) {
    r = r.state.routes[r.state.index];
  }
  return r?.name;
}

export default function AnimatedTabBar({ state, descriptors, navigation }: any) {
  // £ Current User
  const { user } =  useContext(UserContext)
  const segments = useSegments()
  // * list the routes with tab bar displayed
  const route = state.routes[state.index];

  // * States
  const [allowsRoutes, setAllowedRoutes] = useState<StateRoute[]>([])
  
  // % Animated Variables
  const tabBarBottom = useSharedValue(ActiveTabbarVertical)
  const tabBarBottomPosition = useAnimatedStyle(() => ({
    bottom: tabBarBottom.value
  }))

  useEffect(() => {
    if(ProhibitedRoutes.includes(segments.join('/'))) {
      tabBarBottom.value = withTiming(InactiveTabbarVertical, {duration: 400})
    }
    else {
      tabBarBottom.value = withTiming(ActiveTabbarVertical, {duration: 400})
    }
    console.log(segments.join('/'),tabBarBottom.value )
  }, [segments])

  useEffect(() => {
    const allRoutes = state.routes;
    const filteredRoutes = GetAllowedRoutes(allRoutes, user?.accessType)
    setAllowedRoutes(filteredRoutes)
  }, [user])

  return (
    <Animated.View
      style={
        [
          tabBarBottomPosition,
          {
            width: "80%",
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: 'transparent',
            gap: 4,
          }
        ]
      }
    >
      {allowsRoutes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        if (options.tabBarItemStyle?.display === 'none') {
          return null
        }
        const label = options.title ?? route.name;
        const isFocused = state.routes[state.index]?.key === route.key;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = TabBarIcons[route.name] || 'circle-outline';
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
          >
            <MotiView
              className="bg-white dark:bg-darkColor-800 p-2 rounded-2xl aspect-square w-16 flex flex-col items-center justify-center"
              animate={{
                translateY: isFocused ? -4 : 0,
              }}
              transition={{ type: 'timing', duration: 250 }}
            >
              <MaterialCommunityIcons
                name={iconName as any}
                size={24}
                color={isFocused ? primaryColor[500] : Appearance.getColorScheme() === 'dark' ? 'white' : 'black' }
              />
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
