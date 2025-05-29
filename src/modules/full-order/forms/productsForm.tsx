import { useProductsInfinite, useSearchProducts } from "@/hooks/useProducts"
import { SearchBar } from "@/modules/shared/components/commons/search-bar";
import { useCallback, useState } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import CartIcon from "../components/CartIcon";
import { Dialog, DialogContent, DialogTrigger } from "@/modules/shared/components/ui/dialog";
import CartDialogContent from "../components/CartDialog";
import ProductListItem from "../components/ProductListItem";
import ProductListHeader from "../components/ProductListHeader";
import { router, useFocusEffect } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";
import { useFullOrderStore } from "../store/useFullorderStore";
import { Ionicons } from "@expo/vector-icons";

const ProductsForm = () => {
    const [open, setOpen] = useState(false);
    const [searchField, setSearchField] = useState('nome');
    const [items, setItems] = useState([
        { label: 'Nome', value: 'nome' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const { cart } = useFullOrderStore();

    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingInfinite,
        refetch
    } = useProductsInfinite(10);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const {
        data: searchData,
        isLoading: isSearchLoading,
    } = useSearchProducts(searchQuery);

    const isSearching = searchQuery.trim().length > 0;

    const products = isSearching
        ? searchData ?? []
        : infiniteData?.pages.flat() ?? [];
    const distinctCategories = [...new Set(products.map(p => p.category))];

    const sections = distinctCategories.map(category => ({
        title: category,
        data: products.filter(p => p.category === category),
    }));


    const handleProceed = () => {
        router.push(routersStrings.newOrder_fullorder2);
    };

    const isLoading = isSearching ? isSearchLoading : isLoadingInfinite;

    return (
        <Dialog>
            <SearchBar
                open={open}
                setOpen={setOpen}
                searchField={searchField}
                setSearchField={setSearchField}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                items={items}
                setItems={setItems}
            />
            <View className='flex-1'>
                <SectionList
                    sections={sections}
                    data={distinctCategories}
                    renderSectionHeader={({ section: { title } }) => (
                        <ProductListHeader title={title} />
                    )}
                    renderItem={({ item }) => (
                        <ProductListItem product={item} />
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
                            <View className="mb-12" />
                        )
                    }
                />

            </View>
            {cart.products.length > 0 && (
                <View className="absolute bottom-6 left-6 right-6 flex-row justify-between">
                    <DialogTrigger>
                        <CartIcon />
                    </DialogTrigger>
                    <TouchableOpacity
                        className="bg-[#9D4815] p-3 px-6 rounded-full flex-row items-center justify-center"
                        onPress={() => handleProceed()}
                    >
                        <Text className="text-white font-semibold mr-2">Avançar</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
            <DialogContent classNameProp="bg-white w-full max-w-[90%]">
                <CartDialogContent />
            </DialogContent>
        </Dialog>
    )
}

export default ProductsForm;