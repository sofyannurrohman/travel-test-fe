export interface Payment {
    id?: number; 
    ticket_booking_id: number;
    amount: number;
    status: string;
    payment_proof: string;
}