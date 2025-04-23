import { ErrorBoundaryComponent } from "@/modules/shared/components/commons/error-boundary";
import { IconHeaderDefault } from "@/modules/shared/components/commons/icon-header-default";
import { type ErrorBoundaryProps, Tabs } from "expo-router";
import React from "react";
import { Host } from "react-native-portalize";
import { Image } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from "@expo/vector-icons/Ionicons";

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
                        headerStyle: {
                            backgroundColor: "#101820",
                        },
                        tabBarActiveTintColor: "#872A80",
                        tabBarLabelStyle: {
                            fontFamily: "Poppins_400Regular",
                            fontSize: 11,
                            marginTop: 8,
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
                            backgroundColor: "#101820",
                        },
                        headerTitle: () => (
                            <Image
                                source={require("@/assets/images/logo.png")}
                                resizeMode="contain"
                                style={{ marginRight: 16, width: 192, height: 48 }}
                            />
                        ),
                        headerLeft: () => <DrawerToggleButton tintColor="white" />,
                        headerRight: () => <IconHeaderDefault />,
                    }}
                    initialRouteName="home/index"
                    backBehavior="history"
                >
                    <Tabs.Screen
                        name="history/index"
                        options={{
                            title: "Histórico",
                            tabBarIcon: ({ focused }: { focused: boolean }) => (
                                <FontAwesome5
                                    name="history"
                                    size={20}
                                    color={focused ? "#872A80" : "#fff"}
                                />
                            ),
                            headerRight: () => null
                        }}
                    />
                    <Tabs.Screen
                        name="home/index"
                        options={{
                            title: "Home",
                            tabBarIcon: ({ focused }: { focused: boolean }) => (
                                <FontAwesome5
                                    name="home"
                                    size={20}
                                    color={focused ? "#872A80" : "#fff"}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="profile/index"
                        options={{
                            title: "Perfil",
                            tabBarIcon: ({ focused }: { focused: boolean }) => (
                                <Ionicons
                                    name="person"
                                    size={20}
                                    color={focused ? "#872A80" : "#fff"}
                                />
                            ),
                            headerRight: () => null
                        }}
                    />
                </Tabs>
            </Host>
        </>
    );
}
