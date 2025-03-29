import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Index = () => {

    const primary = useThemeColor({}, "primary");
    return (
        <View style={{
            paddingTop: 100,
            paddingHorizontal: 20
        }}>
            <ThemedText style={{
                fontFamily: 'KanitBold',
                color: primary
            }}>HomeScreen</ThemedText>
            <ThemedText style={{
                fontFamily: 'KanitBlack'
            }}>HomeScreen</ThemedText>
            <ThemedText style={{
                fontFamily: 'KanitItalic'
            }}>HomeScreen</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Index;
