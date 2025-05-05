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

interface PackStore {
    pack: Pack | null;
    setPack: (pack: Pack) => void;
    clearPack: () => void;
}

export const usePackStore = create<PackStore>((set) => ({
    pack: null,
    setPack: (pack) => set({ pack }),
    clearPack: () => set({ pack: null }),
}));
