import { tokenDataInitialValues, useTokenStore } from "@/modules/auth/store/useTokenStore";
import HomeInital from "@/modules/initial";
import React from "react";

export default function HomeIndex() {
    const tokenData = useTokenStore(state => state.tokenData)

    React.useEffect(() => {
        console.log("Root | tokenData:", tokenData);
        console.log("Root | tokenData != tokenDataInitialValues:", tokenData != tokenDataInitialValues);
    }, [tokenData]);

    return (
        <HomeInital />
    );
}
