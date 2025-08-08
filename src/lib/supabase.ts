import { createClient } from '@supabase/supabase-js'

// Use placeholder values for build - these will be replaced with actual values when Supabase is connected
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Reservation {
  id: string
  trek_id: string
  trek_title: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  preferred_date?: string
  group_size: string
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  inquiry_type: 'general' | 'booking' | 'support' | 'partnership'
  created_at: string
}

// Reservation functions
export const createReservation = async (reservationData: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  // Check if Supabase is properly configured
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.log('Supabase not configured - would save:', reservationData)
    // Simulate success for demo purposes
    return { id: 'demo-' + Date.now(), ...reservationData, status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert([reservationData])
    .select()
    .single()

  if (error) {
    console.error('Error creating reservation:', error)
    throw error
  }

  return data
}

export const getReservations = async () => {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    return []
  }

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reservations:', error)
    throw error
  }

  return data
}

export const updateReservationStatus = async (id: string, status: Reservation['status']) => {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    return { id, status }
  }

  const { data, error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating reservation:', error)
    throw error
  }

  return data
}

// Contact inquiry functions
export const createContactInquiry = async (inquiryData: Omit<ContactInquiry, 'id' | 'created_at'>) => {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.log('Supabase not configured - would save:', inquiryData)
    return { id: 'demo-' + Date.now(), ...inquiryData, created_at: new Date().toISOString() }
  }

  const { data, error } = await supabase
    .from('contact_inquiries')
    .insert([inquiryData])
    .select()
    .single()

  if (error) {
    console.error('Error creating contact inquiry:', error)
    throw error
  }

  return data
}

export const getContactInquiries = async () => {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    return []
  }

  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact inquiries:', error)
    throw error
  }

  return data
}