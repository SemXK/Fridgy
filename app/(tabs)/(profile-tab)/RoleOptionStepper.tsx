import { UserContext } from '@/app/_layout';
import CartPageHeader from '@/components/headers/CartPageHeader';
import RoleSwapCardComponent from '@/components/profileComponents/RoleSwapCardComponent';
import { User, UserAccessType } from '@/constants/interfaces/usersInterface';
import { primaryColor } from '@/constants/theme';
import { AuthController } from '@/controllers/AuthController';
import { FieldController } from '@/controllers/FeldController';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoleOptionStepper = () => {

  const { user, setUser } =  useContext(UserContext)
  

  // * States
  const [accessTypes, setAccessType] = useState<UserAccessType[]>([])
  const [roleLoading, setRoleLoading] = useState<boolean>(false)


  // $ Effects
  useEffect(() => {
    getAccessTypes()
  }, []);

  // $ FUnctions
  const getAccessTypes = async () => {
    await FieldController.getAccessTypes().then((res) => {
      setAccessType(res as  UserAccessType[]);
    })
  }
  const swapRoles = async (accessTypeId: number): Promise<void> => {
    setRoleLoading(true)
    await AuthController.changeAccessType(accessTypeId).then((res) => {
      console.log(res)
      setUser(res as User)
      router.back()
    })
    .finally(() => {
      setRoleLoading(false)
    })
  }

  return (
    <SafeAreaView className="flex-1">
      <CartPageHeader />
      {
        roleLoading ? 
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]} />
        </View>
        :
        null
      }


      <View className="flex-1">
        <FlatList
          data={accessTypes}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 12,
            marginBottom: 12,
            alignSelf: 'center',
            alignItems: 'center',
            
          }}
          renderItem={({ item }) => (
            <RoleSwapCardComponent
              accessType={item}
              onPress={swapRoles}
              disabled={roleLoading}
              currentActiveType={user!.accessTypeId}
            />
          )}
        />
      </View>



    </SafeAreaView>
  
  );
};

export default RoleOptionStepper