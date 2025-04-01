import { Product } from '@/core/products/interface/product.interface';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ProductCard } from './ProductCard';

interface Props {
    products: Product[];
    loadNextPage: () => void;
}

const ProductList = ({products, loadNextPage}: Props) => {
    return (
        <FlatList 
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ProductCard product={item} />}
        />
    );
}

const styles = StyleSheet.create({})

export default ProductList;
