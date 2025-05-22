export function translateStatusOrder(status: string): string {
    const translated: Record<typeof status, string> = {
        pending: "Pendente",
        cancelled: "Cancelado",
        confirmed: "Confirmado",
    };

    return translated[status];
}