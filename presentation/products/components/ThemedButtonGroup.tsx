import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    options: string[];
    selectedOptions: string[];
    onSelect: (option: string) => void;
}
const ThemedButtonGroup = ({ options, selectedOptions, onSelect}: Props) => {
    const primaryColor = useThemeColor({}, "primary")
    return (
        <View style={styles.container}>
            {
                options.map((option) => (
                    <TouchableOpacity 
                    onPress={() => onSelect(option)}
                        key={option}
                        style={[
                            styles.button,
                            selectedOptions.includes(option) && {
                                backgroundColor: primaryColor
                            }
                        ]}
                    >
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                          style={[
                            styles.buttonText,
                            selectedOptions.includes(option) && styles.selectedButtonText
                        ]}
                        >{option[0].toUpperCase() + option.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonText: {
        fontSize: 16
    },
    selectedButtonText: {
        color: '#fff'
    }
})

export default ThemedButtonGroup;
