import { cloneElement, createContext, useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";

import { cn } from "../../utils/cn";
import { Text } from "./text";
import { Button } from "./button";

interface AlertDialogContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

function AlertDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <AlertDialogContext.Provider value={{ open, setOpen }}>
            {children}
        </AlertDialogContext.Provider>
    );
}

function AlertDialogTrigger({ children }: { children: React.ReactElement }) {
    const { setOpen } = useAlertDialog();

    return cloneElement(children, { onPress: () => setOpen(true) });
}

import { isValidElement, Children } from "react";

function AlertDialogTitle({ children }: { children: string }) {
    return (
        <View>
            <Text className="font-bold">{children}</Text>
        </View>
    );
}

function AlertDialogText({ children }: { children: string }) {
    return (
        <View className="my-4">
            <Text>{children}</Text>
        </View>
    );
}

function AlertDialogContent({
    className,
    onConfirm,
    children,
}: {
    className?: string;
    onConfirm?: () => any;
    children: React.ReactNode;
}) {
    const { open, setOpen } = useAlertDialog();

    let hasTitle = false;
    let hasText = false;

    Children.forEach(children, (child) => {
        if (isValidElement(child)) {
            if (child.type === AlertDialogTitle) hasTitle = true;
            if (child.type === AlertDialogText) hasText = true;
        }
    });

    if (!hasTitle || !hasText) {
        throw new Error(
            "AlertDialogContent precisa conter <AlertDialogTitle> e <AlertDialogText> como filhos."
        );
    }

    const handleCancel = () => {
        if (onConfirm) onConfirm();
        setOpen(false);
    };

    return (
        <Modal
            transparent
            animationType="fade"
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <View className="w-full h-full flex flex-1 justify-center items-center bg-black/75">
                <View
                    className={cn(
                        "border border-border bg-background rounded-lg p-6 shadow-lg bg-white w-11/12",
                        className,
                    )}
                >
                    {children}

                    <View className="flex flex-row justify-between mt-4">
                        <Button
                            label={onConfirm ? "cancelar" : "ok"}
                            variant={onConfirm ? "outline" : "default"}
                            className={`${onConfirm ? "w-[49%]" : "w-full"}`}
                            onPress={() => setOpen(false)}
                        />
                        {onConfirm && (
                            <Button
                                label="confirmar"
                                className="w-[49%]"
                                onPress={handleCancel}
                            />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}



const useAlertDialog = () => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error("useAlertDialog must be used within a AlertDialogProvider");
    }
    return context;
};

export { AlertDialog, AlertDialogContent, AlertDialogTrigger, useAlertDialog, AlertDialogTitle, AlertDialogText };
