export type Package = {
    id: string;
    name: string;
    event_type: string;
    guest_count: number;
    price: number;
    structure_id: number;
}

export type Structure = {
    id: string;
    name: string;
    price: number;
}
