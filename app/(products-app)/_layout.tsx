import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const CheckAuthLayout = () => {
    const { status, checkStatus } = useAuthStore();
    const backgroundColor = useThemeColor({}, "background")
    useEffect(() => {
        checkStatus();
    }, [])

    if(status === 'checking') {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    else if (status === 'unauthenticated') {
        return <Redirect href={'/auth/login'}/>
    }

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: backgroundColor
                },
                contentStyle: {
                    backgroundColor: backgroundColor
                }
            }}
        >
            <Stack.Screen 
                name='(home)/index'
                options={{
                    title: 'Productos'
                }}
            />
        </Stack>
    )
}

const styles = StyleSheet.create({})

export default CheckAuthLayout;
