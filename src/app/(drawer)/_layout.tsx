import { ErrorBoundaryComponent } from "@/modules/shared/components/commons/error-boundary";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { type ErrorBoundaryProps, router, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import _ from "lodash";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View } from "react-native";
import { useTokenStore } from "@/modules/auth/store/useTokenStore";
import FlashMessage from "react-native-flash-message";


const CustomDrawerContent = ({ ...props }) => {
    const pathname = usePathname();
    const resetToken = useTokenStore(state => state.resetToken)

    // const itemsMenu = [
    // ];

    const itemsMenuCompany = [
        {
            label: "Sair",
            icon: <MaterialIcons name="logout" size={16} color={pathname === "/signout" ? "#AC4EA3" : "#000"} />,
            path: "/signout",
            router: "/",
            show: true,
        },
    ];

    const logout = () => {
        resetToken();
    }

    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={true}>
            <View className="p-2">

                {itemsMenuCompany
                    ?.filter((item) => item.show)
                    ?.map((item, index) => (
                        <DrawerItem
                            key={item.path}
                            icon={() => (
                                <View style={{ marginRight: 5 }}>
                                    {item.icon}
                                </View>
                            )}
                            label={item.label}
                            labelStyle={[
                                { fontWeight: "400", color: "#000", marginLeft: 0 },
                            ]}
                            style={{
                                backgroundColor: pathname === item.path ? "#AC4EA320" : "white",
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor: pathname === item.path ? "#AC4EA390" : "#101820",
                                paddingVertical: 0,
                                marginVertical: 3,
                            }}
                            onPress={() => {
                                item.label === "Sair" ? logout() : null;
                                router.push(item.router);
                            }}
                        />
                    ))}
            </View>
        </DrawerContentScrollView>
    );
};

export function ErrorBoundary(props: ErrorBoundaryProps) {
    return <ErrorBoundaryComponent {...props} />;
}

export default function Layout() {
    return (
        <>
            <FlashMessage />
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    lazy: true,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontFamily: "Poppins_400Regular",
                        fontSize: 18,
                    },
                }}
            >
                {/* <Drawer.Screen name="notification" options={{ title: "Notificacao" }} />
                <Drawer.Screen name="settings" options={{ title: "Configurações" }} /> */}
            </Drawer>
        </>
    );
}
