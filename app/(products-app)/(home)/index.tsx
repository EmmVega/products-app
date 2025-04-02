import ProductList from '@/presentation/products/components/ProductList';
import useProducts from '@/presentation/products/hooks/useProducts';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Index = () => {
    const { productsQuery, loadNextPage} = useProducts();

    if(productsQuery.isLoading) {
    return (<View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <ActivityIndicator 
            
            size={30}
        />
    </View>)
    }

    return (
        <View style={{
            paddingTop: 100,
            paddingHorizontal: 20
        }}>
         <ProductList 
            products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
            loadNextPage={loadNextPage}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Index;
