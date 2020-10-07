
import AsyncStorage from '@react-native-community/async-storage';

export async function readKey(key){
  try {
    return await AsyncStorage.getItem(key);
  } catch(e) {
    console.log(`[!] Error reading AsyncStorage key: '{$key}'`); 
    return null;
  }
}

export async function setStringKey(key, value){
  try {
    return await AsyncStorage.setItem(key, value);
  } catch(e) {
    console.log(`[!] Error writing AsyncStorage key: '{$key}' value: '{$value}'`); 
    return null;
  }
}

export async function setJSONKey(key, object){
  const jsonValue = JSON.stringify(object);
  return setStringKey(key, jsonValue);
}

