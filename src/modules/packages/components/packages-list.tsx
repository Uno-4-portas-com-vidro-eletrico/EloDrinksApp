import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { PackageItem } from './package-item';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import { routersStrings } from '@/modules/shared/utils/routers';

const packages = [
	{
		id: '1',
		name: 'Prime Package',
		type: 'Corporate Event',
		guests: 50,
		price: 1500,
		description: 'Ideal for corporate events.',
		structure: 'Complete bar, bartender, personalized glasses',
		products: ['Caipirinha', 'Gin Tonic', 'Soda', 'Water'],
	},
	{
		id: '2',
		name: 'Executive Package',
		type: 'Wedding Party',
		guests: 100,
		price: 3000,
		description: 'High sophistication for large events.',
		structure: 'Double bar, 2 bartenders, decorated lounge',
		products: ['Whisky', 'Imported Vodka', 'Energy Drink', 'Water'],
	},
	{
		id: '3',
		name: 'Executive Package',
		type: 'Wedding Party',
		guests: 100,
		price: 3000,
		description: 'High sophistication for large events.',
		structure: 'Double bar, 2 bartenders, decorated lounge',
		products: ['Whisky', 'Imported Vodka', 'Energy Drink', 'Water'],
	},
];

export default function PackageList() {
	const [open, setOpen] = useState(false);
	const [searchField, setSearchField] = useState('nome');
	const [items, setItems] = useState([
		{ label: 'Nome', value: 'nome' },
		{ label: 'Tipo', value: 'tipo' }
	]);
	const [searchQuery, setSearchQuery] = useState('');

	const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

	const handleSelect = (id: string) => {
		setSelectedPackageId(id === selectedPackageId ? null : id);
	};


	return (
		<>
			<View className="mb-4 px-4 flex flex-row items-center">
				<View style={{ flex: 7, marginRight: 8 }}>
					<TextInput
						placeholder={`Buscar por ${searchField}...`}
						value={searchQuery}
						onChangeText={setSearchQuery}
						className="bg-white px-4 py-2 rounded-xl border border-zinc-300 text-[#101820]"
					/>
				</View>
				<View style={{ flex: 3 }}>
					<DropDownPicker
						open={open}
						value={searchField}
						items={items}
						setOpen={setOpen}
						setValue={setSearchField}
						setItems={setItems}
						placeholder="Filtrar por..."
						style={{
							borderColor: '#D4D4D8',
							height: 40,
							marginBottom: 4
						}}
						dropDownContainerStyle={{
							borderColor: '#D4D4D8',
							maxHeight: 120
						}}
						arrowIconStyle={{
							width: 16,
							height: 16
						}}
						textStyle={{
							fontSize: 12
						}}
					/>
				</View>
			</View>

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
					// onEndReached={() => {
					// 	if (hasNextPage && !isFetchingNextPage) {
					// 		fetchNextPage();
					// 	}
					// }}
					onEndReachedThreshold={0.1} />
			</View >

			{selectedPackageId && (
				<View className="absolute bottom-4 left-4 right-4">
					<TouchableOpacity
						className="bg-[#9D4815] py-4 rounded-xl items-center"
						onPress={() => { router.push(routersStrings.newOrder2_packages) }}
					>
						<Text className="text-white font-bold text-lg">Avançar com pedido</Text>
					</TouchableOpacity>
				</View>
			)}
		</>
	);
}
