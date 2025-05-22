import PageHistoryDetails from "@/modules/history/pages/historyDetails";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import { useLocalSearchParams } from "expo-router";
import React from "react";


export default function HistoryDetail() {
	const { id } = useLocalSearchParams();
	const orderId = String(Array.isArray(id) ? id[0] : id);

	return (
		<>
			{id ? (
				<PageHistoryDetails id={orderId} />
			) : (
				<LoadingIndicator />
			)}
		</>
	);
}
