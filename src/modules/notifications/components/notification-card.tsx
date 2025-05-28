import { formatDate } from "@/modules/shared/utils/date";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useReadNotification } from "@/hooks/useNotifications";
import { useEffect } from "react";
import { useState } from "react";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";

interface NotificationCardProps {
    id: number;
    title: string;
    content: string;
    page: string;
    isRead: boolean;
    scheduleAt?: string;
    createdAt: string;
    updatedAt: string;
}

export const NotificationCard = ({
    id,
    title,
    content,
    page,
    isRead: isReadProp,
    createdAt,
    updatedAt,
}: NotificationCardProps) => {
    const router = useRouter();
    const { mutate, isSuccess, isPending } = useReadNotification();
    const [isRead, setIsRead] = useState(isReadProp);

    const onPress = (page: string) => {
        mutate({
            notification: {
                content: content,
                is_read: true,
                page: page,
                title: title
            },
            notificationId: id
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsRead(true);
            router.push(page);
        }
    }, [isSuccess]);

    return (
        <TouchableOpacity
            onPress={() => onPress(page)}
            disabled={isPending}
            activeOpacity={0.8}
            className={"p-4 mb-3 rounded-xl border-[0.1px]"}
            style={{ backgroundColor: isRead ? "#f3f3f3" : "#e6e6e6" }}
        >
            <Text className="mb-1 text-base font-semibold text-[#111] ">
                {title.split(" ").map((word, idx) =>
                    word.startsWith("#") ? (
                        <Text key={idx} className="text-xs">
                            {word + " "}
                        </Text>
                    ) : (
                        <Text key={idx}>{word + " "}</Text>
                    )
                )}
            </Text>
            {isPending ? (
                <LoadingIndicator />
            )
                : (
                    <Text className="text-sm text-[#444] mb-2">
                        {(() => {
                            const text = content.length > 100 ? content.slice(0, 97) + "..." : content;
                            return text.replace(
                                /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?/g,
                                (match) => formatDate(match).split(" ")[0]
                            );
                        })()}
                    </Text>
                )}
            <View className="flex-row justify-between items-center">
                <Text className="text-xs text-[#999]">
                    {formatDate(new Date(new Date(createdAt).getTime() - 3 * 60 * 60 * 1000).toISOString())}
                </Text>
                {!isRead && <View className="w-2 h-2 rounded-full bg-[#9D4815]" />}
            </View>
        </TouchableOpacity>
    );
};
