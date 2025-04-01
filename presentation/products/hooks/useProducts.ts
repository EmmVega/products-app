import { getProducts } from '@/core/products/actions/get-product.action';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const useProducts = () => {
    const productsQuery = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        queryFn: ({pageParam}) => getProducts(20, pageParam * 20),

        staleTime: 1000 * 60 * 60,

        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })
    
    return {
        productsQuery,

        loadNextPage: productsQuery.fetchNextPage,
    }
}

const styles = StyleSheet.create({})

export default useProducts;
