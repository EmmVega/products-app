import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export class SecureStorageAdapter {
    static async setItem(key: string, value: string) {
        try {
            await SecureStore.setItemAsync(key, value)
        } catch (e) {
            Alert.alert('Error', 'failed to save data')
        }
    }

    static async getItem(key: string) {
        try {
            return await SecureStore.getItemAsync(key)
        } catch (e) {
            Alert.alert('Error', 'failed to get data')
        }

    }

    static async deleteItem (key: string) {
        try {
            await SecureStore.deleteItemAsync(key)
        } catch (e) {
            Alert.alert('Error', 'failed to delete data')
        }
    }
}