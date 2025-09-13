import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  // * General
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string,
  projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME as string,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_MAIN_DB as string,
  
  // * Collections
  usersTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_USER as string,
  housesTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_HOUSES as string,
  productTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_USER as string,
  producttypeTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_PRODUCT_TYPE as string,

}

// * Client setup
const client = new Client()
client
  .setEndpoint(appwriteConfig.endpoint as string)
  .setProject(appwriteConfig.projectId as string)
  .setPlatform(appwriteConfig.platform as string)
export const account = new Account(client);
export const databases = new Databases(client)
export const avatars = new Avatars(client)


// * Apis
export async function login(email: string, password: string) {
  await account.createEmailPasswordSession({
      email,
      password
  });

  // 1! application context update
}

export async function register( username: string, email: string, password: string) {

  // * Create account
  const newAccount = await account.create({
    userId: ID.unique(),
    email,
    password,
    name: username
  }).catch(e => e);
  console.log("newAccount", newAccount)
  if(!newAccount.$id) throw new Error(newAccount) 

  // * Create user record from the new account
  const userRecord = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersTableId,
    newAccount.$id,
    {
      username,
      email, 
    }
  )
  .catch(e => {
    console.log("Er", e)
    return e
  });
  // if (!userRecord) throw new Error
  console.log(userRecord, newAccount)
  return userRecord
  // await login(email, password);
}
