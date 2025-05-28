import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View } from "react-native";

const PageProfile = React.lazy(
	() => import("@/modules/profile/pages/profile"),
);

export default function Home() {
	return (
		<React.Suspense fallback={<LoadingIndicator />}>
			<View className="bg-[#E0CEAA] h-full pb-4 justify-center">
				<PageProfile />
			</View>
		</React.Suspense>
	);
}
