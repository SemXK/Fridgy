import { User } from '@/constants/interfaces/usersInterface';
import { primaryColor } from '@/constants/theme';
import { ProductController } from '@/controllers/ProductController';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MiniProfileComponent from '../MiniSections/MiniProfileComponent';

interface FULInterface {
  fridgeId: string
}

const FridgeUserList = ({fridgeId}: FULInterface) => {
  // * States
  const [userList, setUserList] = useState<User[]>([]); // BottomSheet for product usage
  const [loading, setLoading] = useState<boolean>(false);

  // £ Functions
  const getUserList = async() => {
    setLoading(true)
    await ProductController.getFridgeUserList(fridgeId).then((res) => {
      const userList = res as User[]
      setUserList(userList);
    })
    .finally(() => {
      setLoading(false)
    })
  }

  // $ Effects
  useEffect(() => {
    getUserList()
  }, [])
  return (
    <View>
      {
        loading ?
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <FlatList
          data={userList}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 24,
            height: "100%"
          }}
          renderItem={({ item }) => {
            return (
              <View className="bg-stone-200 dark:bg-darkColor-800 p-2 rounded-lg">
                <MiniProfileComponent user={item} />
              </View>
            )
          }}
        />
      }
    </View>
  )
}

export default FridgeUserList