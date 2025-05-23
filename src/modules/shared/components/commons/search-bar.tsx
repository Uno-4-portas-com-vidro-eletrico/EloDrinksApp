import { Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type SearchBarProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    searchField: string;
    setSearchField: Dispatch<SetStateAction<string>>;
    items: { label: string; value: string }[];
    setItems: Dispatch<SetStateAction<{ label: string; value: string }[]>>;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
};

export function SearchBar({
    open,
    setOpen,
    searchField,
    setSearchField,
    items,
    setItems,
    searchQuery,
    setSearchQuery,
}: SearchBarProps) {
    return (
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
                    style={{ borderColor: '#D4D4D8', height: 40, marginBottom: 4 }}
                    dropDownContainerStyle={{ borderColor: '#D4D4D8', maxHeight: 120 }}
                    arrowIconStyle={{ width: 16, height: 16 }}
                    textStyle={{ fontSize: 12 }}
                />
            </View>
        </View>
    );
}
