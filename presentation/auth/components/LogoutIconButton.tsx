import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

const LogoutIconButton = () => {
    const primaryColor = useThemeColor({}, "primary")
    const { logout } = useAuthStore()
    return (
        <TouchableOpacity 
            style={{marginRight: 8}}
            onPress={logout}
        >
            <Ionicons name='log-out-outline' size={24} color={primaryColor}/>
        </TouchableOpacity>    );
}

const styles = StyleSheet.create({})

export default LogoutIconButton;
