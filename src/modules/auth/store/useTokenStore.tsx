import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TokenData } from "../types/token";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Token = {
    tokenData: TokenData,
    setToken: (tokenData: TokenData) => void;
    resetToken: () => void;
}

export const tokenDataInitialValues = {
    access_token: "",
    token_type: ""
}

export const useTokenStore = create(
    persist<Token>(
        (set) => ({
            tokenData: tokenDataInitialValues,
            setToken: (tokenData) => set({tokenData: tokenData}),
            resetToken: () => set({tokenData: tokenDataInitialValues}),
        }),
        {
            name: "tokenstore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);