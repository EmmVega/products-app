import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';

const LoginScreen = () => {
    const { login } = useAuthStore();
    const {height} = useWindowDimensions();
    const background = useThemeColor({}, "background")

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isPosting, setIsPosting] = useState(false);

    const onLogin = async() => {
        const {email, password} = form;
        console.log(email, password);
        if(email.length === 0 || password.length === 0) {
            return;
        }

        setIsPosting(true);
        const wasSuccesful = await login(email, password)
        setIsPosting(false);

        if(wasSuccesful) {
            router.replace("/")
            return;
        }

        Alert.alert("Error", "Usuario o pass malos")
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{
                flex: 1
            }}
        >
            <ScrollView 
                style={{
                        paddingHorizontal: 40,
                        backgroundColor: background
                    }}
            >
                <View 
                    style={{
                    paddingTop: height * 0.35
                    }}
                >
                    <ThemedText type='title'>Ingresar</ThemedText>
                    <ThemedText style={{color: 'grey'}}>Llene para continuar</ThemedText>

                    <View style={{marginTop: 20}}>
                        <ThemedTextInput 
                            placeholder='Correo'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            icon='mail-outline'
                            value={form.email}
                            onChangeText={(value) => setForm({...form, email: value})}
                        />

                        <ThemedTextInput
                            placeholder='pass'
                            secureTextEntry
                            autoCapitalize='none'
                            icon='lock-closed-outline'
                            value={form.password}
                            onChangeText={(value) => setForm({...form, password: value})}
                        />
                        <ThemedButton
                            icon='arrow-forward-outline'
                            onPress={onLogin}
                            disabled={isPosting}
                        >
                            Ingresar
                        </ThemedButton>

                        <View style={{marginTop: 40}}/>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ThemedText>¿No cuenta?</ThemedText>
                            <ThemedLink
                                href="/auth/register"
                                style={{marginHorizontal: 5}}
                            >
                                Crear Cuenta
                            </ThemedLink>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export default LoginScreen;
