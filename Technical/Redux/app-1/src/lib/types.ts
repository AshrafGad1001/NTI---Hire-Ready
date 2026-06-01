
export interface Product {
    _id: string
    title: string
    price: number
    imageCover: string
    ratingsAverage: number
    ratingsQuantity: number  
    category?: {
        name: string
    }
}