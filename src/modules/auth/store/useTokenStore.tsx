import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TokenData } from "../types/token";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Token = {
    tokenData: TokenData | undefined,
    setToken: (tokenData: TokenData) => void;
    resetToken: () => void;
}

export const useTokenStore = create(
    persist<Token>(
        (set) => ({
            tokenData: undefined,
            setToken: (tokenData) => set({ tokenData: tokenData }),
            resetToken: async () => {
                set({ tokenData: undefined });
                await AsyncStorage.removeItem("tokenstore");
            }
        }),
        {
            name: "tokenstore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);