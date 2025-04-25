import React from "react";
import { type MessageType, showMessage } from "react-native-flash-message";

const useToast = () => {
    const showToast = React.useCallback((type: MessageType, message: string) => {
        showMessage({
            message: "Atenção!",
            description: message,
            type: type,
            duration: 2000,
            hideStatusBar: false,
            position: "top",
            statusBarHeight: 30,
            icon: "auto",
        });
    }, []);

    return showToast;
};

export default useToast;
