import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/modules/shared/components/ui/tabs";
import React from "react";
import { View, Text, FlatList, Image, TextInput, Switch } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type EventItem = {
    id: string;
    date: string;
    eventType: string;
    selected: boolean;
};

const mockData = Array.from({ length: 7 }, (_, index) => ({
    id: index.toString(),
    date: '',
    eventType: '',
    selected: false,
}));

const renderItem = ({ item }: { item: EventItem }) => (
    <View className="flex-row items-center space-x-2 mb-3 px-2">
        <Switch value={item.selected} />
        <TextInput
            placeholder="dd/mm/aaaa"
            className="bg-white rounded-full px-3 py-2 w-32 shadow"
            value={item.date}
            editable={false}
        />
        <TextInput
            placeholder="Tipo de evento"
            className="bg-white rounded-full px-3 py-2 w-40 shadow"
            value={item.eventType}
            editable={false}
        />
    </View>
);

const PageHistory = () => {
    return (
        <View className="bg-[#E0CEAA] h-screen">
            <View className="bg-[#F7F6F3] mx-6 my-6 rounded-3xl py-2 px-4 h-4/5">
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
                        <FlatList
                            data={mockData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </TabsContent>
                    <TabsContent
                        value="past"
                        className="flex flex-col items-center justify-start w-full"
                    >
                        <FlatList
                            data={mockData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </TabsContent>
                    <TabsContent
                        value="pending"
                        className="flex flex-col items-center justify-start w-full"
                    >
                        <FlatList
                            data={mockData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </TabsContent>
                </Tabs>
            </View>
        </View>
    );
}

export default PageHistory;