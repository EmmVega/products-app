import { API_URL, productsApi } from "@/core/api/productsApi"
import { Product } from "../interface/product.interface";

export const getProductById = async (id: string):Promise<Product> => {
    try {
        const {data} = await productsApi.get<Product>(`/products${id}`, {
        })
        return {
            ...data,
            images: data.images.map(image => `${API_URL}/files/product/${image}`)
        }
    } catch (e) {
        throw new Error('unable to load product /id')
    }
}