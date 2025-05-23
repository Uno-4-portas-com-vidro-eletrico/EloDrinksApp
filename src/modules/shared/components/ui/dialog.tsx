import React, { cloneElement, createContext, useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";

import { cn } from "../../utils/cn";

interface DialogContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DialogContext = createContext<DialogContextType | undefined>(undefined);

function Dialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
}

function DialogTrigger({ children }: { children: React.ReactElement }) {
    const { setOpen } = useDialog();

    return cloneElement(children, { onPress: () => setOpen((prev: boolean) => !prev) });
}

function DialogContent({
    classNameProp,
    children,
}: {
    children: React.ReactNode;
    classNameProp?: string;
}) {
    const { open, setOpen } = useDialog();

    return (
        <Modal
            transparent
            animationType="fade"
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <Pressable className="w-full h-full" onPress={() => setOpen(false)}>
                <View className="flex flex-1 justify-center items-center bg-black/75">
                    <View
                        className={`rounded-lg p-6 shadow-lg ${classNameProp ?? ""}`}
                    >
                        {children}
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

export { Dialog, DialogContent, DialogTrigger, useDialog };
