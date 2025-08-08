// Google Sheets integration for reservations
export interface ReservationData {
  trek_id: string
  trek_title: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  preferred_date?: string
  group_size: string
  message?: string
}

export const saveReservationToGoogleSheets = async (reservationData: ReservationData) => {
  try {
    // Get the Supabase URL for the edge function
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
    const functionUrl = `${supabaseUrl}/functions/v1/google-sheets-reservation`
    
    // If Supabase is not configured, simulate success for demo
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      console.log('Demo mode: Would save to Google Sheets:', reservationData)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        success: true,
        data: {
          id: `demo-${Date.now()}`,
          ...reservationData,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      }
    }

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(reservationData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result

  } catch (error) {
    console.error('Error saving reservation to Google Sheets:', error)
    throw error
  }
}

// Contact form integration (can also use Google Sheets)
export interface ContactData {
  name: string
  email: string
  subject?: string
  message: string
  inquiry_type: 'general' | 'booking' | 'support' | 'partnership'
}

export const saveContactToGoogleSheets = async (contactData: ContactData) => {
  try {
    // For now, we'll use the same pattern as reservations
    // You can create a separate edge function for contact forms if needed
    console.log('Would save contact inquiry to Google Sheets:', contactData)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      success: true,
      data: {
        id: `contact-${Date.now()}`,
        ...contactData,
        created_at: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Error saving contact to Google Sheets:', error)
    throw error
  }
}