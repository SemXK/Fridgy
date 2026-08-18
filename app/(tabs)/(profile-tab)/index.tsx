import ProfilePageHeader from '@/components/headers/ProfilePageHeader'
import DefaultBadge from '@/components/ui/badges/DefaultBadge'
import ThemedText from '@/components/ui/ThemedText'
import UserProfileImage from '@/components/ui/UserProfileImage'
import { User } from '@/constants/interfaces/usersInterface'
import { AuthController } from '@/controllers/AuthController'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useContext } from 'react'
import { Appearance, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'
import { UserContext } from '../../_layout'


const ProfilePage = () => {

  // $Context
  const { user } =  useContext(UserContext)
  
  // % States

  // * functions
  const logout = async () => {
    await AuthController.logout()
    // .then(() => {
      // router.navigate('/(auth)/sign-in')
    // })
    // .catch((e) => {
    //   console.log(e)
    // })
    .finally(() => {
      router.navigate('/(auth)/sign-in')
    })
  }
  const openEditRolesBottomSheet = () => {
    router.navigate('/(tabs)/(profile-tab)/RoleOptionStepper')
  }
  return (
    <View className="bg-primary-500">
      {/* Top Bar */}
      <SafeAreaView>
      <ProfilePageHeader headerClass='bg-primary-500'/>

      {/* Users Area */}
      <View className="h-1/5 w-full bg-primary-500 flex flex-column p-8">

        {/* Users Main Info */}
        <View className="flex flex-row gap-4 justify-between">

          {/* User Image */}
          <UserProfileImage user={user as User}/>
          <View className="w-5/6 h-full rounded-2xl p-2">
            <ThemedText 
              label={user ? user.username : 'Utente'} 
              textStyle='text-white text-2xl'
              font='Nunito-Bold'
            />
            <ThemedText 
              label={user?.accessType?.type || 'Ospite (Non Autenticato)'} 
              textStyle='text-white '
            />            
          </View>

        </View>

        {/* Users Address */}
        <View className="flex flex-row gap-4 justify-between">
          <View className="w-5/6 h-full rounded-2xl p-2 flex flex-row items-center">
            <IconButton
              icon="map-marker"
              size={20}
              iconColor="white"
            />
            <ThemedText 
              label={ user?.address?.via || 'Via Non Specificata'} 
              textStyle='text-white '
            />            
          </View>
        </View>

        {/* Users Preferences */}
        <View className="flex flex-row gap-4 justify-between  ">
          <DefaultBadge />
          <DefaultBadge />
          <DefaultBadge />
          <DefaultBadge />
        </View>

      </View>

      <View className="h-full w-full dark:bg-darkColor-900 bg-white rounded-t-2xl">

        {/*  Options */}
        <ScrollView 
          className="p-4"
          >

        {/* User Options */}
          <View className="w-full">
            <ThemedText 
              darkModeDisabled
              textStyle='text-primary-500 text-2xl mb-4'
              font='Nunito-Bold'
              label="Impostazioni Account"
            />
            <TouchableOpacity 
              activeOpacity={.7}
              disabled={!user}

              className="flex flex-row items-center justify-between gap-4 p-4 dark:bg-darkColor-800 bg-stone-100 rounded-t-2xl">
                <View className="flex flex-row gap-4">
                  <MaterialCommunityIcons
                    name='account-box-edit-outline'
                    color={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
                    size={16}
                  />
                  <ThemedText label='Modifica Informazioni' />
                </View>
                {
                  !user &&
                  <MaterialCommunityIcons
                    name='lock'
                    color={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
                    size={16}
                  />
                }
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={.7}
              disabled={!user}

              onPress={openEditRolesBottomSheet}
              className="flex flex-row items-center justify-between gap-4 p-4 dark:bg-darkColor-800 bg-stone-100 ">
                <View className="flex flex-row gap-4">
                    <MaterialCommunityIcons
                    name='account-switch'
                    color={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
                    size={16}
                    />
                  <ThemedText label='Cambia Ruolo' />
                </View>
                {
                  !user &&
                  <MaterialCommunityIcons
                    name='lock'
                    color={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
                    size={16}
                  />
                }
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={.7}
              onPress={logout}
              className="flex flex-row items-center justify-between gap-4 p-4 dark:bg-darkColor-800 bg-stone-100 ">
                <View className="flex flex-row gap-4">
                  <MaterialCommunityIcons
                    name='logout'
                    color={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
                    size={16}
                  />
                  <ThemedText label={user ? 'Log out' : 'Vai al Sign-in'} />
                </View>
            </TouchableOpacity>

            <View className="border-t-[1px] border-white dark:border-darkColor-900 w-[50%] self-center h-[1px]" />
            <TouchableOpacity 
              activeOpacity={.7}
              className="flex flex-row items-center gap-4 p-4 dark:bg-darkColor-800 bg-stone-100 rounded-b-2xl ">
              <MaterialCommunityIcons
                name='delete'
                color={colors.rose[500]}
                size={16}
              />
              <ThemedText label='Elimina Account' textStyle='text-rose-500' darkModeDisabled />
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>

      {/* * Bottom Sheet */}
      {/* {
        editingRoles && 
        <BottomSheetComponent 
          height={1.5}
          onClose={() => setEditingRoles(false)}
          ShownComponent={EditUserRoleSteper}
        />
      } */}
      </SafeAreaView>

    </View>
  )
}

export default ProfilePage