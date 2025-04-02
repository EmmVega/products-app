import { getProductById } from '@/core/products/actions/get-product-by-id.action';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const useProduct = (productId: string) => {
    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60,
    })

    //mutation

    // mantener id?

    return ({
        productQuery
    });
}

const styles = StyleSheet.create({})

export default useProduct;
