import React, { useState } from 'react';
import { Product } from '@/core/products/interface/product.interface';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ProductCard } from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    products: Product[];
    loadNextPage: () => void;
}

const ProductList = ({products, loadNextPage}: Props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const onPullToRefresh = async () => {
        setIsRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 200))

        queryClient.invalidateQueries({
            queryKey: ["products", "infinite"]
        });

        setIsRefreshing(false);
    }
    return (
        <FlatList 
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ProductCard product={item} />}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.8}

            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />}
        />
    );
}

const styles = StyleSheet.create({})

export default ProductList;
