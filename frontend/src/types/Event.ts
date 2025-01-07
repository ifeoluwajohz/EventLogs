export interface Event {
    id: string;
    adminId: string;
    availableTickets: number;
    title: string;
    shortDescription: string;
    longDescription: string;
    eventType: string;
    price?: number;
    date: string;
    image: string;
}