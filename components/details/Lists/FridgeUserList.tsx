import { useFridge } from '@/app/(tabs)/(fridge-tab)/_layout';
import { UserContext } from '@/app/_layout';
import ThemedText from '@/components/ui/ThemedText';
import { UserFridgeList } from '@/constants/interfaces/pivots';
import { RemoveUserFromFridgePayload } from '@/constants/interfaces/requestPayloads/productPayloads';
import { primaryColor } from '@/constants/theme';
import { ProductController } from '@/controllers/ProductController';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { ActivityIndicator } from 'react-native-paper';
import MiniProfileComponent from '../MiniSections/MiniProfileComponent';

interface FULInterface {
  fridgeId: string
}

const FridgeUserList = ({fridgeId}: FULInterface) => {
  // * Context
  const { user } =  useContext(UserContext)
  const { fridgeDetail } = useFridge()

  // * States
  const [userList, setUserList] = useState<UserFridgeList[]>([]); // BottomSheet for product usage
  const [loading, setLoading] = useState<boolean>(false);

  // £ Functions
  const getUserList = async() => {
    setLoading(true)
    await ProductController.getFridgeUserList(fridgeId).then((res) => {
      const userList = res as UserFridgeList[]
      setUserList(userList);
    })
    .finally(() => {
      setLoading(false)
    })
  }
  const removeUser = async (user: UserFridgeList) => {
    const payload: RemoveUserFromFridgePayload = {
      userId: user.pivot.userable_id,
      userType: user.pivot.userable_type,
      fridgeId: fridgeDetail!.id
    }
    await ProductController.removeUserFromFridge(payload)
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
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => {
            return (
              <ReanimatedSwipeable 
                onSwipeableOpen={(direction) => {
                  if (direction === 'left') return null
                }}
                renderLeftActions={() => (
                  <>
                    {
                      user?.id !== item.id && fridgeDetail?.propertyPivot.canEdit ?
                      <TouchableOpacity onPress={() => removeUser(item)}  className="mr-4 rounded-xl h-full w-20 bg-rose-500  items-center justify-center">
                        <ThemedText
                          label="Rimuovi"
                          darkModeDisabled
                          textStyle="text-white font-semibold"
                        />
                      </TouchableOpacity>
                      :
                      null

                    }
                  </>
                )}
                overshootLeft={false}

              >
                <View className="p-2 bg-stone-200 dark:bg-darkColor-800 rounded-xl">
                  <MiniProfileComponent user={item} />
                </View>
              </ReanimatedSwipeable>
            )
          }}
        />
      }
    </View>
  )
}

export default FridgeUserList


