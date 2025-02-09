export interface TicketBooking {
    id?: number; 
    user_id: number;
    travel_schedule_id: number;
    status: string;
    quantity: number;
}