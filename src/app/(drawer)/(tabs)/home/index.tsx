// import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// const PageHome = React.lazy(() => import("@/modules/home/pages/home"));
// const PageNewHome = React.lazy(() => import("@/modules/new-home/pages/home"));

export default function Home() {

	// Exibe loading enquanto a feature flag ainda está indefinida
	// if (newHome === undefined) {
	// 	return <LoadingIndicator />;
	// }

	return (
		<View>
			<Text>
				home
			</Text>
		</View>
		// <React.Suspense fallback={<LoadingIndicator />}>
		// 	{newHome ? <PageNewHome /> : <PageHome />}
		// </React.Suspense>
	);
}
