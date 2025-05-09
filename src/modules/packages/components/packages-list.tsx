import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { PackageItem } from './package-item';
import { router } from 'expo-router';
import { routersStrings } from '@/modules/shared/utils/routers';
import { SearchBar } from './search-bar';
import { usePackStore } from '../store/useOrderStore';
import { usePackagesInfinite, useSearchPackages } from '../hooks/usePackages';
import { LoadingIndicator } from '@/modules/shared/components/commons/loading';

export default function PackageList() {
	const { setPack } = usePackStore();
	const [open, setOpen] = useState(false);
	const [searchField, setSearchField] = useState('nome');
	const [items, setItems] = useState([
		{ label: 'Nome', value: 'nome' },
		// { label: 'Tipo', value: 'tipo' }
	]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

	const {
		data: infiniteData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingInfinite,
	} = usePackagesInfinite(10);

	const {
		data: searchData,
		isLoading: isSearchLoading,
	} = useSearchPackages(searchQuery);

	const isSearching = searchQuery.trim().length > 0;

	const packages = isSearching
		? searchData ?? []
		: infiniteData?.pages.flat() ?? [];

	const handleSelect = (id: string) => {
		setSelectedPackageId(id === selectedPackageId ? null : id);
	};

	const handleProceed = (packageId: string) => {
		const selectedPackage = packages.find((pkg) => pkg.id === packageId);
		if (selectedPackage) {
			setPack(selectedPackage);
			router.push(routersStrings.newOrder_packages2);
		}
	};

	const isLoading = isSearching ? isSearchLoading : isLoadingInfinite;

	return (
		<>
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
				<FlatList
					data={packages}
					renderItem={({ item }) => (
						<PackageItem
							pack={item}
							isSelected={selectedPackageId === item.id}
							disabled={selectedPackageId !== null && selectedPackageId !== item.id}
							onSelect={() => handleSelect(item.id)}
						/>
					)}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={() => null}
					keyboardDismissMode="interactive"
					keyboardShouldPersistTaps="always"
					onEndReached={() => {
						if (hasNextPage && !isFetchingNextPage) {
							fetchNextPage();
						}
					}}
					onEndReachedThreshold={0.1}
					ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
				/>
			</View >

			{selectedPackageId && (
				<View className="absolute bottom-4 left-4 right-4">
					<TouchableOpacity
						className="bg-[#9D4815] py-4 rounded-xl items-center"
						onPress={() => handleProceed(selectedPackageId)}
					>
						<Text className="text-white font-bold text-lg">Avançar com pedido</Text>
					</TouchableOpacity>
				</View>
			)}
		</>
	);
}
