import { API_URL, productsApi } from "@/core/api/productsApi"
import { type Product, Gender } from "../interface/product.interface";

const emptyProduct: Product = {
    id: '',
    title: 'nuevo prod',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: 'kid',
    sizes: [],
    stock: 0,
    tags: [],
}

export const getProductById = async (id: string):Promise<Product> => {
    if (id === 'new') return emptyProduct;

    
    try {
        const {data} = await productsApi.get<Product>(`/products/${id}`, {
        })
        return {
            ...data,
            images: data.images.map(image => `${API_URL}/files/product/${image}`)
        }
    } catch (e) {
        throw new Error('unable to load product /id')
    }
}