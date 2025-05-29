import React, { useCallback } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import { NotificationCard } from '../components/notification-card';
import { useNotificationsInfinite } from '@/hooks/useNotifications';
import { useUserStore } from '@/modules/auth/store/useUser';
import { LoadingIndicator } from '@/modules/shared/components/commons/loading';
import { useFocusEffect } from 'expo-router';

const PageNotification = () => {
    const { user } = useUserStore();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch
    } = useNotificationsInfinite(user?.id ?? 0, 10);

    const notifications = data?.pages?.flat();

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                refetch();
            }
        }, [user?.id, refetch])
    );

    return (
        <View className="bg-[#F7F6F3] rounded-3xl px-6 py-4 mx-4 mt-6 shadow-md flex-1 h-full">
            <FlatList
                data={notifications}
                renderItem={({ item }) => {
                    if (!item) return null;
                    return (
                        <NotificationCard
                            id={item?.id}
                            title={item?.title}
                            content={item?.content}
                            page={item?.page}
                            isRead={item?.is_read ?? false}
                            createdAt={item?.created_at}
                            updatedAt={item?.updated_at}
                        />
                    );
                }}
                ListEmptyComponent={
                    <View className="items-center justify-center py-10">
                        <TextInput
                            editable={false}
                            value="Não tem nada aqui"
                            className="text-xl text-gray-500 text-center bg-transparent"
                        />
                    </View>
                }
                keyExtractor={(item) => item?.id}
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
        </View>
    );
};

export default PageNotification;