import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface useOrderStore {
    eventDetails: {
        eventName: string;
        date: string;
        location: string;
        guestCount: string;
        eventType: string;
    };
    setEventDetails: (eventDetails: {
        eventName: string;
        date: string;
        location: string;
        guestCount: string;
        eventType: string;
    }) => void;
}

export const useOrderStore = create(
    persist<useOrderStore>(
        (set) => ({
            eventDetails: {
                eventName: "",
                date: "",
                location: "",
                guestCount: "",
                eventType: "",
            },
            setEventDetails: (eventDetails) => set({ eventDetails }),
        }),
        {
            name: "orderstore",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
