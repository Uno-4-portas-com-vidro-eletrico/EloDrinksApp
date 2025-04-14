import { ErrorBoundaryComponent } from "@/modules/shared/components/commons/error-boundary";
import { type ErrorBoundaryProps, Tabs } from "expo-router";
import React from "react";
import { Host } from "react-native-portalize";

export function ErrorBoundary(props: ErrorBoundaryProps) {
    return <ErrorBoundaryComponent {...props} />;
}

export default function Layout() {
    return (
        <>
            <Host>
                <Tabs
                    screenOptions={{
                        lazy: true,
                        headerShown: true,
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontFamily: "Poppins_400Regular",
                            fontSize: 16,
                        },
                        tabBarActiveTintColor: "#872A80",
                        tabBarLabelStyle: {
                            fontFamily: "Poppins_400Regular",
                            fontSize: 11,
                            position: "absolute",
                            top: 32,
                        },
                        tabBarIconStyle: {
                            position: "absolute",
                            top: 18,
                        },
                        tabBarHideOnKeyboard: true,
                        tabBarStyle: {
                            elevation: 5,
                            height: 72,
                            paddingVertical: 8,
                            backgroundColor: "#fff",
                        },
                        // headerLeft: () => <DrawerToggleButton tintColor="#000" />,
                        // headerRight: () => <IconHeaderDefault />,
                    }}
                    initialRouteName="home/index"
                    backBehavior="history"
                >
                    <Tabs.Screen
                        name="feed/index"
                        options={{
                            title: "Feed",
                            // headerLeft: () => <BtnBackHeader />,
                            // headerRight: () => <IconHeaderDefault />,
                            tabBarButton: () => null,
                            // tabBarIcon: ({ focused }) =>
                            //     IconTab({
                            //         icon: IconFeed,
                            //         iconActive: IconFeedActive,
                            //         focused,
                            //     }),
                        }}
                    />
                </Tabs>
            </Host>
        </>
    );
}
