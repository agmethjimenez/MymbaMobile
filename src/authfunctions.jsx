import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const checkAuth = async () => {
  const navigation = useNavigation();
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('token');

  if (!id || !token) {
    navigation.replace('Home'); 
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('id');
  await AsyncStorage.removeItem('token');
  const navigation = useNavigation();
  navigation.replace('Home'); 
};
