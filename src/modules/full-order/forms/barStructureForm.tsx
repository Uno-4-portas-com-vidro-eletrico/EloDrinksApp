import { useStructureInfinite } from "@/hooks/useStructure";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import StructureLsitItem from "../components/StructureLitsItem";
import { router, useFocusEffect } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";
import { useFullOrderStore } from "../store/useFullorderStore";
import { Ionicons } from "@expo/vector-icons";

export default function BarStructureForm() {
    const { structure, setStrucure } = useFullOrderStore();
    const [selectedStructureId, setSelectedStructureId] = useState<number | null>(null);

    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch
    } = useStructureInfinite(10);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const structures = infiniteData?.pages.flat() ?? [];

    const handleSelect = (id: number) => {
        setSelectedStructureId(id === selectedStructureId ? null : id);
    };

    const handleProceed = (structureId: number) => {
        const selectedPackage = structures.find((struc) => struc.id === structureId);

        if (!selectedPackage) return

        setStrucure(selectedPackage);
        setSelectedStructureId(null);
        router.push(routersStrings.newOrder_fullorder3);
    };

    useFocusEffect(
        useCallback(() => {
            if (structure) {
                setSelectedStructureId(structure.id);
            } else {
                setSelectedStructureId(null);
            }
        }, [structure])
    );

    return (
        <>
            <View className='flex-1'>
                <FlatList
                    data={structures}
                    renderItem={({ item }) => (
                        <StructureLsitItem
                            key={item.id}
                            structure={item}
                            isSelected={selectedStructureId === item.id}
                            disabled={selectedStructureId !== null && selectedStructureId !== item.id}
                            onSelect={() => handleSelect(item.id)}
                        />
                    )}
                    keyExtractor={(item) => `${item.id}`}
                    ListHeaderComponent={() => null}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        isLoading ? (
                            <LoadingIndicator />
                        ) : (
                            <View className="mb-14" />
                        )
                    }
                />
                {selectedStructureId && (
                    <View className="absolute bottom-0 left-0 right-0">
                        <TouchableOpacity
                            className="mt-4 bg-[#9D4815] py-3 rounded-full flex-row items-center justify-center"
                            onPress={() => handleProceed(selectedStructureId)}
                        >
                            <Text className="text-white font-semibold mr-2">Avançar</Text>
                            <Ionicons name="arrow-forward" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            </View >

        </>
    )
}