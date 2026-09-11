import { apiClient, ApiResponse } from './apiClient';

export interface WorkshopBookingPayload {
  workshopTitle: string;
  sessionDate: string;
  timeSlot: string;
  guestCount: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  totalFee: number;
}

export interface BookingRecord extends WorkshopBookingPayload {
  ticketCode: string;
  bookingTime: string;
  status: 'confirmed' | 'checked_in' | 'cancelled';
}

export const bookingService = {
  async bookWorkshop(payload: WorkshopBookingPayload): Promise<ApiResponse<BookingRecord>> {
    const mockRecord: BookingRecord = {
      ...payload,
      ticketCode: 'WS-' + Math.floor(1000 + Math.random() * 9000),
      bookingTime: new Date().toISOString(),
      status: 'confirmed',
    };

    return apiClient.post<BookingRecord>('/workshops/book', payload, {
      mockData: mockRecord,
    });
  },
};
