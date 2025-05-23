import { ProductInCart } from "@/modules/schema/Product";
import { create } from "zustand";

type Cart = {
    products: ProductInCart[],
    total: number
}

type ProductsStore = {
    cart: Cart
    updateCart: (product: ProductInCart) => void
    clearCart: () => void
}

const cartInitialValues: Cart = {
    products: [],
    total: 0
}

export const useCartStore = create<ProductsStore>((set, get) => ({
    cart: cartInitialValues,
    updateCart: (product: ProductInCart) => {
        const foundProduct = get().cart.products.find(p => p.id === product.id)
        const cart = get().cart;

        if (!foundProduct && product.quantity <= 0) {
            return;
        }

        else if (!foundProduct && product.quantity > 0) {
            set({
                cart: {
                    products: [...cart.products, product],
                    total: cart.total + product.price * product.quantity,
                }
            });
        }

        else if (foundProduct && product.quantity <= 0) {
            const updatedProducts = cart.products.filter(p => p.id !== product.id);
            set({
                cart: {
                    products: updatedProducts,
                    total: cart.total - foundProduct.price * foundProduct.quantity,
                }
            });
        }

        else if (foundProduct && product.quantity > 0) {
            const updatedProducts = cart.products.map(p =>
                p.id === product.id ? { ...p, quantity: product.quantity } : p
            );

            const oldTotal = foundProduct.price * foundProduct.quantity;
            const newTotal = product.price * product.quantity;

            set({
                cart: {
                    products: updatedProducts,
                    total: cart.total - oldTotal + newTotal,
                }
            });
        }
    },
    clearCart: () => set({ cart: cartInitialValues }),
}));