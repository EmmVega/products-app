import ProductImages from '@/presentation/products/components/ProductImages';
import ThemedButtonGroup from '@/presentation/products/components/ThemedButtonGroup';
import useProduct from '@/presentation/products/hooks/useProduct';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

const ProductScreen = () => {
    const {id} = useLocalSearchParams();
    const navigation = useNavigation();

    const { productQuery } = useProduct(`${id}`)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name='camera-outline' size={25}/>
            )
        })
    }, []);

    useEffect(() => {
        if(productQuery.data) {
            navigation.setOptions({
                title: productQuery.data.title
            })
        }
    }, [productQuery.data]);


    if(productQuery.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator 
                  size={30}  
                />
            </View>
        )
    }

    if(!productQuery.data) {
        return <Redirect href="/(products-app)/(home)"/>
    }

    const product = productQuery.data;

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : undefined}
        >
            <ProductImages
                images={product.images}
            />
            <ScrollView>
                <ThemedView style={{ marginHorizontal: 10, marginTop: 20}}>
                    <ThemedTextInput 
                     placeholder='Titulo'
                     style={{
                        marginVertical: 5
                     }}
                    />
                    <ThemedTextInput 
                     placeholder='Slug'
                     style={{
                        marginVertical: 5
                     }}
                    />
                    <ThemedTextInput 
                     placeholder='Descripcion'
                     style={{
                        marginVertical: 5
                     }}
                    />
                </ThemedView>

                <ThemedView style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    flexDirection: "row",
                    gap: 10,
                }}>
                    <View style={{ flex: 1}}>
                    <ThemedTextInput placeholder='Precio' style={{ flex: 1}}/>
                    </View>
                    <View style={{ flex: 1}}>
                    <ThemedTextInput placeholder='Precio' style={{ flex: 1}}/>
                    </View>
                </ThemedView>
                <ThemedView style={{
                    marginHorizontal: 10
                }}>
                    <ThemedButtonGroup 
                        options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                        selectedOptions={product.sizes}
                        onSelect={(options) => console.log({options})}
                    />
                    <ThemedButtonGroup 
                        options={['kid', 'men', 'woman', 'unisex']}
                        selectedOptions={[product.gender]}
                        onSelect={(options) => console.log({options})}
                    />
                </ThemedView>
                <View
                     style={{
                        marginHorizontal: 10,
                        marginBottom: 50,
                        marginTop: 20
                    }}
                >
                    <ThemedButton 
                        icon='save-outline'
                        onPress={() => console.log('guardar')}
                    >
                        Guardadito
                    </ThemedButton>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export default ProductScreen;

