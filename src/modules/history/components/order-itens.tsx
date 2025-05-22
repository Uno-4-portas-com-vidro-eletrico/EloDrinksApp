import { BudgetItem } from '@/modules/schema/Order';
import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

type OrderItemsProps = {
  items: BudgetItem[];
};

export const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  const groupedItems = items.reduce<Record<string, BudgetItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <View className="px-4 py-2 bg-white">
      <Text className="text-xl font-bold mb-4">Items do Pedido</Text>
      {Object.entries(groupedItems).map(([category, products]) => (
        <View key={category} className="mt-2">
          <Text className="text-lg font-extrabold text-[#101820] mb-4 border-b border-gray-200 pb-1">
            {category}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
            {products.map((product) => (
              <View
                key={product.id}
                className="bg-white rounded-2xl p-4 mr-4 shadow-md w-40 h-48"
                style={{ elevation: 2 }}
              >
                <Image
                  source={{ uri: product.img_url }}
                  className="w-full h-24 rounded-lg mb-3"
                  resizeMode="cover"
                />
                <Text className="text-base font-semibold text-[#101820]" numberOfLines={2} ellipsizeMode="tail">
                  {product.name}
                </Text>
                <Text className="text-sm text-zinc-500 mt-1">Qtd: {product.quantity}</Text>
                <Text className="text-sm font-semibold text-[#101820] mt-1">
                  R$ {(product.unit_price * product.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};
