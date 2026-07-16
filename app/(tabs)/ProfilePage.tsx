import ProfilePageHeader from '@/components/headers/ProfilePageHeader'
import ThemedText from '@/components/ui/ThemedText'
import UserProfileImage from '@/components/ui/UserProfileImage'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContext } from '../_layout'

const ProfilePage = () => {

  // $Context
  const { user } =  useContext(UserContext)


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
          <UserProfileImage user={user}/>
          <View className="w-5/6 h-full rounded-2xl p-2">
            <ThemedText 
              label={user ? user.name : 'Utente'} 
              textStyle='text-white text-2xl'
              font='Nunito-ExtraBold'
            />
            <ThemedText 
              label={user ? user.accessType.type : 'Ospite (Non Autenticato)'} 
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
              label={user ? user.address?.via : 'Via Non Specificata'} 
              textStyle='text-white '
            />            
          </View>
        </View>

        {/* Users Preferences */}
        <View className="flex flex-row gap-4 justify-between  ">
          <UserProfileImage user={user}/>
          <UserProfileImage user={user}/>
          <UserProfileImage user={user}/>
          <UserProfileImage user={user}/>
        </View>

      </View>

      <View className="h-full w-full bg-darkColor-900 rounded-t-[30px]">
      </View>

      </SafeAreaView>
    </View>
  )
}

export default ProfilePage