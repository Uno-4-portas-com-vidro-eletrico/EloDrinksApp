export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export const formatToISOStringWithOffset = (dateString?: string, offsetHours: number = -3) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    date.setHours(date.getHours() + offsetHours, date.getMinutes(), 0, 0);
    return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, ':00');
};