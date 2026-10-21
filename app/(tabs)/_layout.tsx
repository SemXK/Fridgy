import AnimatedTabBar from '@/components/ui/AnimatedTabBar';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        animation: 'shift',
      }}
      tabBar={(props) => <AnimatedTabBar {...props} /> }
    >

      <Tabs.Screen
        name="index"
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(product-tab)"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(fridge-tab)"
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(user-diet-tab)"
        options={{
          headerShown: false,
        }}
      />   

      <Tabs.Screen
        name="(store-tab)"
        options={{
          headerShown: false,
        }}
      />  

      <Tabs.Screen
        name="(nutritionist-diet-tab)"
        options={{
          headerShown: false,
        }}
      />    

      <Tabs.Screen
        name="(nutritionist-users-tab)"
        options={{
          headerShown: false,
        }}
      />     

      <Tabs.Screen
        name="(profile-tab)"
        options={{
          headerShown: false,
        }}
      />      

      <Tabs.Screen
        name="Cart"
        options={{
          title: 'Il tuo carrello',
          tabBarHideOnKeyboard: true,
          headerShown: false,
          href:null
        }}
      />

      <Tabs.Screen
        name="ProductCreation"
        options={{
          title: 'Crea un prodotto',
          headerShown: false,
        }}
      />


    </Tabs>
  );
}
