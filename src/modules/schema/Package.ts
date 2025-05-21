export type Package = {
    id: number;
    name: string;
    event_type: string;
    guest_count: number;
    price: number;
    structure_id: number;
    products: {
        id: number;
        quantity: number;
    }[];
}



