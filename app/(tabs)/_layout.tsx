import AnimatedTabBar from '@/components/ui/AnimatedTabBar';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(fridge-tab)"
        options={{
          title: 'Il tuo frigo',
          tabBarHideOnKeyboard: true,
          headerShown: false,

        }}

      />
    </Tabs>
  );
}


// <MaterialCommunityIcons
//   className=" text-primary-600"
//   name="fridge-outline"
//   size={64}
//   color={primaryColor[500]}
//   />