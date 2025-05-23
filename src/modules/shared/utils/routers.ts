export const routersStrings = {
    signin: "/auth/sign-in",
    signup: "/auth/sign-up",
    home: "/(tabs)/home",

    history: "/(drawer)/(tabs)/history",
    historyDetails: (orderId: string) => `/(drawer)/(tabs)/history/${orderId}`,

    newOrder: "/(drawer)/(tabs)/new-order",

    newOrder_packages: "/(drawer)/(tabs)/new-order/packages",
    newOrder_packages2: "/(drawer)/(tabs)/new-order/packages/second",
    newOrder_packages3: "/(drawer)/(tabs)/new-order/packages/resume",

    newOrder_fullorder: "/(drawer)/(tabs)/new-order/full-order",
    newOrder_fullorder2: "/(drawer)/(tabs)/new-order/full-order",


};
