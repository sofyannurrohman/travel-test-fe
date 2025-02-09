export interface TravelSchedule {
    id?: string; 
    destination: string;
    departure_date: string;
    departure_time: string;
    quota: number;
    ticket_price: number;
}