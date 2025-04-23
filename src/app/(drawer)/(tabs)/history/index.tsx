import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";

const PageNutrition = React.lazy(
	() => import("@/modules/history/pages/history"),
);

export default function History() {
	return (
		<React.Suspense fallback={<LoadingIndicator />}>
			<PageNutrition />
		</React.Suspense>
	);
}
