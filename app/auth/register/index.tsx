import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

const RegisterScreen = () => {
    const {height} = useWindowDimensions();
    const backgroundColor = useThemeColor({}, 'background')
    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{
                flex: 1,
            }}
        >
            <ScrollView 
                style={{
                        paddingHorizontal: 40,
                        backgroundColor: backgroundColor
                    }}
            >
                <View 
                    style={{
                    paddingTop: height * 0.35
                    }}
                >
                    <ThemedText type='title'>Crea una pa continuar</ThemedText>
                    <ThemedText style={{color: 'grey'}}>Llene para continuar</ThemedText>

                    <View style={{marginTop: 20}}>
                        <ThemedTextInput 
                            placeholder='Nombre completo'
                            autoCapitalize='words'
                            icon='person-outline'
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
                            Crear
                        </ThemedButton>

                        <View style={{marginTop: 40}}/>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ThemedText>¿ya cuenta?</ThemedText>
                            <ThemedLink
                                href="/auth/login"
                                style={{marginHorizontal: 5}}
                            >
                                ingresar
                            </ThemedLink>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export default RegisterScreen;
