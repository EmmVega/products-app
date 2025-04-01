import { API_URL, productsApi } from "@/core/api/productsApi"
import { Product } from "../interface/product.interface";

export const getProducts = async (limit = 20, offset = 0) => {
    try {
        const {data} = await productsApi.get<Product[]>("/products", {
            params: {
                limit, 
                offset,
            }
        })

         return data.map(product => {
                    return {
                        ...product,
                        images: product.images.map(
                            image => `${API_URL}/files/products/${image}`
                        )
                    }
                })

    } catch (e) {
        throw new Error('unable to load products')
    }
}