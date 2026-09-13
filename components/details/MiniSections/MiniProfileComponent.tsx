import ThemedText from '@/components/ui/ThemedText'
import UserProfileImage from '@/components/ui/UserProfileImage'
import { User } from '@/constants/interfaces/usersInterface'
import React from 'react'
import { View } from 'react-native'

interface MPCInterface {
  user: User
}

const MiniProfileComponent = ({user}:MPCInterface) => {
  return (
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
          label={user?.accessType?.type || 'Ospite'} 
          textStyle='text-white '
        />            
      </View>

    </View>
  )
}

export default MiniProfileComponent