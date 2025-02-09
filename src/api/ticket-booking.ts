import api from './api'
import { type TicketBooking } from '../model/TicketBooking'

const resource = '/admin/ticket-bookings'

export const getAllTicketBooking = async (): Promise<TicketBooking[]> => {
  const response = await api.get<TicketBooking[]>(resource)
  return response.data
}

export const getAllTicketBookingByUser = async (id: string): Promise<TicketBooking[]> => {
  const response = await api.get<TicketBooking[]>(`/ticket-bookings/history/${id}`)
  return response.data
}

export const createTicketBooking = async (ticketBooking: TicketBooking): Promise<TicketBooking> => {
  const response = await api.post<TicketBooking>(resource, ticketBooking)
  return response.data
}
export const createTicketBookingByUser = async (ticketBooking: TicketBooking): Promise<TicketBooking> => {
  const response = await api.post<TicketBooking>('/bookings', ticketBooking)
  return response.data
}

export const getTicketBookingByID = async (id: string): Promise<TicketBooking> => {
  const response = await api.get<TicketBooking>(`${resource}/${id}`)
  return response.data
}

export const updateTicketBooking = async (id: string, ticketBooking: any): Promise<TicketBooking> => {
  const response = await api.put<any>(`${resource}/${id}`, ticketBooking)
  return response.data
}

export const removeTicketBooking = async (id: string): Promise<any> => {
  const response = await api.delete(`${resource}/${id}`)
  return response
}

