export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    img_url: string;
}

export type ProductInCart = {
    id: number;
    name: string;
    price: number;
    category: string;
    img_url: string;
    quantity: number
}