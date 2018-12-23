import {AsyncStorage} from 'react-native'

const AUTH_TOKEN = 'authToken'
const storage = () => {
  const storeItem = async (item) => {
    try {
      console.log('added to async storage')
      await AsyncStorage.setItem(AUTH_TOKEN, item)
    } catch (error) {
      console.log(error)
    }
  }

  const retrieveItem = async (itemKey) => {
    try {
      const value = await AsyncStorage.getItem(itemKey)
      if (value !== null) {
        return value
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  // TEST PURPOSE ONLY
  const clear = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
    await AsyncStorage.clear();
  }

  return {
    storeItem,
    retrieveItem,
    clear
  }
}

export default storage();
