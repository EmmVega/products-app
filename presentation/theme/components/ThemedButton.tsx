import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './ThemedText';

interface Props extends PressableProps{
    children:  string;
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({children, icon, ...rest}: Props) => {
    const primaryColor = useThemeColor({}, "primary");
    return (
        <Pressable 
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? primaryColor + '90' : primaryColor
                },
                styles.button,
            ]}
            {...rest}
        >
            <ThemedText style={{color: 'white'}}>
                {children}
            </ThemedText>
            {icon && (
                <Ionicons 
                    name={icon}
                    size={24}
                    color="white"
                    style={{
                        marginRight: 10
                    }}
                />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 5
    }
})

export default ThemedButton;
