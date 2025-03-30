import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen = () => {
    const {height} = useWindowDimensions();
    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{
                flex: 1
            }}
        >
            <ScrollView 
                style={{
                        paddingHorizontal: 40
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
                        />

                        <ThemedTextInput
                            placeholder='pass'
                            secureTextEntry
                            autoCapitalize='none'
                            icon='lock-closed-outline'
                        />
                        <ThemedButton
                            icon='arrow-forward-outline'
                            onPress={() => console.log('HOLAAA')}
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
