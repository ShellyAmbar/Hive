import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to AsyncStorage
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value); // If value is an object, stringify it
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Data saved successfully');
  } catch (e) {
    // saving error
    console.error('Failed to save the data to the storage', e);
  }
};

// Load data from AsyncStorage
const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null; // Parse if the data exists
  } catch (e) {
    // error reading value
    console.error('Failed to load the data from the storage', e);
  }
};

export {storeData, getData};
