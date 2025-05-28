
import { View, Text } from 'react-native';

export const Field = ({ label, value }: { label: string; value: string | number }) => (
    <View className="bg-[#FFF8F0] rounded-2xl px-5 py-4 mb-4 shadow-sm">
        <Text className="text-sm text-[#7B6A58] font-semibold mb-1">{label}</Text>
        <Text className="text-base text-[#3A2F25]">{value}</Text>
    </View>
);
