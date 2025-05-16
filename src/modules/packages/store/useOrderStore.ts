import { create } from "zustand";
import { Package } from "../../schema/Package";

interface EventData {
    eventName: string;
    date: string;
    location: string;
    details: string;
}

interface PackStore {
    pack: Package | null;
    eventData: EventData | null;
    setPack: (pack: Package) => void;
    clearPack: () => void;
    setEventData: (data: EventData) => void;
    clearEventData: () => void;
}

export const usePackStore = create<PackStore>((set) => ({
    pack: null,
    eventData: null,
    setPack: (pack) => set({ pack }),
    clearPack: () => set({ pack: null }),
    setEventData: (data) => set({ eventData: data }),
    clearEventData: () => set({ eventData: null }),
}));