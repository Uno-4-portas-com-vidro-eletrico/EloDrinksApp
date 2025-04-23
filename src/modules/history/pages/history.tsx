import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/modules/shared/components/ui/tabs";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const PageHistory = () => {
    return (
        <View className="bg-[#101820] h-screen">
            <ScrollView className="bg-white mx-6 my-8 rounded-3xl py-2 px-4">
                <Tabs defaultValue="soon">
                    <TabsList>
                        <TabsTrigger
                            title={"Próximos"}
                            value="soon"
                        />
                        <TabsTrigger
                            title={"Passados"}
                            value="past"
                        />
                        <TabsTrigger
                            title={"Pendentes"}
                            value="pending"
                        />
                    </TabsList>
                    <TabsContent
                        value="soon"
                        className="flex flex-col items-center justify-start w-full"
                    >
                        <Text>soon</Text>
                    </TabsContent>
                    <TabsContent
                        value="past"
                        className="flex flex-col items-center justify-start w-full"
                    >
                        <Text>past</Text>
                    </TabsContent>
                    <TabsContent
                        value="pending"
                        className="flex flex-col items-center justify-start w-full"
                    >
                        <Text>pending</Text>
                    </TabsContent>
                </Tabs>
            </ScrollView>
        </View>
    );
}

export default PageHistory;