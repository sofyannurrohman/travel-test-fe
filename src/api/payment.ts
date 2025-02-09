import api from './api'
import { type Payment } from '../model/Payment' 

const resource = '/payments'

export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await api.get<Payment[]>(resource)
  return response.data
}
export const getAllPaymentsByUser = async (id:string): Promise<Payment[]> => {
  const response = await api.get<Payment[]>('')
  return response.data
}
export const createPayment = async (payment: Payment): Promise<Payment> => {
  const response = await api.post<Payment>(resource, payment)
  return response.data
}
export const getPaymentByID = async (id: string): Promise<Payment> => {
  const response = await api.get<Payment>(`${resource}/${id}`)
  return response.data
}
export const updatePayment = async (id: string, payment: any): Promise<Payment> => {
  const response = await api.put<any>(`${resource}/${id}`, payment)
  return response.data 
}
export const uploadPaymentProof = async (id: string, formData: FormData): Promise<void> => {
  await api.post(`/upload-payment/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'}
  })
}
export const removePayment = async (id: string): Promise<any> => {
  const response = await api.delete(`${resource}/${id}`)
  return response
}

