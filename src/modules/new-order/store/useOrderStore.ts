import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface EventDetails {
    eventName: string;
    date: string;
    location: string;
    guestCount: string;
    eventType: string;
}

interface OrderStore {
    eventDetails: EventDetails;
    setEventDetails: (details: EventDetails) => void;
}

export const useOrderStore = create(
    persist<OrderStore>(
        (set) => ({
            eventDetails: {
                eventName: "",
                date: "",
                location: "",
                guestCount: "",
                eventType: "",
            },
            setEventDetails: (details) => set({ eventDetails: details }),
        }),
        {
            name: "orderstore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
