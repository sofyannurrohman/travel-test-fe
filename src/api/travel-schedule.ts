import api from './api'
import { type TravelSchedule } from '../model/TravelSchedule'

const resource = '/admin/travel-schedules'

export const getAllTravelSchedules = async (): Promise<TravelSchedule[]> => {
  const response = await api.get<TravelSchedule[]>(resource)
  return response.data 
}
export const getAllTravelSchedulesByUser = async (): Promise<TravelSchedule[]> => {
  const response = await api.get<TravelSchedule[]>('/travels')
  return response.data 
}
export const getTravelReports = async (): Promise<any> => {
  const response = await api.get<any>("/admin/travel-reports")
  return response.data 
}
export const createTravelSchedule = async (travelSchedule: TravelSchedule): Promise<TravelSchedule> => {
  const response = await api.post<TravelSchedule>(resource, travelSchedule)
  return response.data
}
export const getTravelScheduleByID = async (id: string): Promise<TravelSchedule> => {
  const response = await api.get<TravelSchedule>(`${resource}/${id}`)
  return response.data 
}
export const updateTravelSchedule = async (id: string, TravelSchedule: any): Promise<TravelSchedule> => {
  const response = await api.put<any>(`${resource}/${id}`, TravelSchedule)
  return response.data
}
export const removeTravelSchedule = async (id: string): Promise<any> => {
  const response = await api.delete(`${resource}/${id}`)
  return response
}