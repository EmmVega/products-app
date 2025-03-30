import { Link, LinkProps } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends LinkProps {}

const ThemedLink = ({style, ...rest}: Props) => {
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <Link 
            style={[
                {
                    color: primaryColor
                },
                style
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({})

export default ThemedLink;
