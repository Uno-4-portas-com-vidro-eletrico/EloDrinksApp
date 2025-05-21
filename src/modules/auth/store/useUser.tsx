import { create } from "zustand";

interface User {
    id: number;
    email: string;
    name: string;
    telephone: string;
}

interface UserStore {
    user: User | null;
    setUser: (pack: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));