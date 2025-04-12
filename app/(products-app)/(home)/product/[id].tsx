import { Size } from '@/core/products/interface/product.interface';
import ProductImages from '@/presentation/products/components/ProductImages';
import ThemedButtonGroup from '@/presentation/products/components/ThemedButtonGroup';
import useProduct from '@/presentation/products/hooks/useProduct';
import { useCameraStore } from '@/presentation/store/useCameraStore';
import MenuIconButton from '@/presentation/theme/components/MenuIconButton';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

const ProductScreen = () => {
    const {id} = useLocalSearchParams();
    const navigation = useNavigation();

    const { selectedImages, clearImages} = useCameraStore()
    const { productQuery, productMutation } = useProduct(`${id}`)

    useEffect(() => {
        return () => {
            clearImages();
        };
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
            <MenuIconButton 
                onPress={() => router.push('/camera')}
                icon='camera-outline'
                />
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
        <Formik
        initialValues={product}
        onSubmit={productMutation.mutate}
        >
            {
                ({values, handleSubmit, handleChange, setFieldValue}) => (
                    <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? "padding" : undefined}
                    >
                        <ProductImages
                            images={[...product.images, ...selectedImages]}
                        />
                        <ScrollView>
                            <ThemedView style={{ marginHorizontal: 10, marginTop: 20}}>
                                <ThemedTextInput 
                                placeholder='Titulo'
                                style={{
                                    marginVertical: 5
                                }}
                                value={values.title}
                                onChangeText={handleChange('title')}
                                />
                                <ThemedTextInput 
                                placeholder='Slug'
                                style={{
                                    marginVertical: 5
                                }}
                                value={values.slug}
                                onChangeText={handleChange('slug')}
                                />
                                <ThemedTextInput 
                                placeholder='Descripcion'
                                // multiline
                                // numberOfLines={5}
                                style={{
                                    marginVertical: 5
                                }}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                />
                            </ThemedView>

                            <ThemedView style={{
                                marginHorizontal: 10,
                                marginVertical: 5,
                                flexDirection: "row",
                                gap: 10,
                            }}>
                                <View style={{ flex: 1}}>
                                <ThemedTextInput placeholder='Precio' style={{ flex: 1}}
                                  value={values.price.toString()}
                                  onChangeText={handleChange('price')}
                                />
                                </View>
                                <View style={{ flex: 1}}>
                                <ThemedTextInput placeholder='Precio' style={{ flex: 1}}
                                  value={values.stock.toString()}
                                  onChangeText={handleChange('stock')}
                                />
                                </View>
                            </ThemedView>
                            <ThemedView style={{
                                marginHorizontal: 10
                            }}>
                                <ThemedButtonGroup 
                                    options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                                    selectedOptions={values.sizes}
                                    onSelect={(selectedSize) => setFieldValue('sizes', 
                                        values.sizes.includes(selectedSize as Size) 
                                        ? values.sizes.filter(size => size !== selectedSize)
                                        : [
                                            ...values.sizes,
                                            selectedSize
                                        ]
                                    )}
                                />
                                <ThemedButtonGroup 
                                    options={['kid', 'men', 'woman', 'unisex']}
                                    selectedOptions={[values.gender]}
                                    onSelect={(selectedOption) => setFieldValue('gender', selectedOption)}
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
                                    onPress={() => handleSubmit()}
                                >
                                    Guardadito
                                </ThemedButton>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                )
            }
        </Formik>
    );
}

const styles = StyleSheet.create({})

export default ProductScreen;

