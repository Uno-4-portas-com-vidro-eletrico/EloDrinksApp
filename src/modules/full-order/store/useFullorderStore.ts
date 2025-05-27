import { ProductInCart } from "@/modules/schema/Product"
import { Structure } from "@/modules/schema/Structure";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Cart = {
    products: ProductInCart[],
    total: number
}

type EventData = {
    eventName: string;
    startDate: string;
    endDate: string;
    duration: string;
    guestCount: string;
    location: string;
    event_type: string;
}

type FullOrderStore = {
    cart: Cart
    updateCart: (product: ProductInCart) => void
    clearCart: () => void
    eventData: EventData | undefined
    setEventData: (data: EventData) => void;
    clearEventData: () => void;
    structure: Structure | undefined
    setStrucure: (data: Structure) => void;
    clearStructure: () => void;
}

const cartInitialValues: Cart = {
    products: [],
    total: 0
}

export const useFullOrderStore = create<FullOrderStore>()(
    persist(
        (set, get) => ({
            eventData: undefined,
            setEventData: (data) => set({ eventData: data }),
            clearEventData: () => set({ eventData: undefined }),
            structure: undefined,
            setStrucure: (data) => set({ structure: data }),
            clearStructure: () => set({ structure: undefined }),
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
        }),
        {
            name: "fullorder-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                cart: state.cart,
                eventData: state.eventData,
                structure: state.structure,
            }),
        }
    )
);

