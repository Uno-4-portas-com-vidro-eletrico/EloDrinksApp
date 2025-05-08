import { create } from "zustand";

interface Pack {
    id: string;
    name: string;
    type: string;
    guests: number;
    price: number;
    description: string;
    structure: string;
    products: string[];
}

interface EventData {
    eventName: string;
    date: string;
    location: string;
    details: string;
}

interface PackStore {
    pack: Pack | null;
    eventData: EventData | null;
    setPack: (pack: Pack) => void;
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