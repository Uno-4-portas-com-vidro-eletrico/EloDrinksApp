import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Package } from "../../schema/Package";

interface EventData {
    eventName: string;
    startDate: string;
    endDate: string;
    location: string;
    details: string;
    duration: string;
}

interface PackStore {
    pack: Package | null;
    eventData: EventData | null;
    setPack: (pack: Package) => void;
    clearPack: () => void;
    setEventData: (data: EventData) => void;
    clearEventData: () => void;
}

export const usePackStore = create<PackStore>()(
    persist(
        (set) => ({
            pack: null,
            eventData: null,
            setPack: (pack) => set({ pack }),
            clearPack: () => set({ pack: null }),
            setEventData: (data) => set({ eventData: data }),
            clearEventData: () => set({ eventData: null }),
        }),
        {
            name: "pack-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                pack: state.pack,
                eventData: state.eventData,
            }),
        }
    )
);