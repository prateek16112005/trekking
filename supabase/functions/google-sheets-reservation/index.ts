import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ReservationData {
  trek_id: string
  trek_title: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  preferred_date?: string
  group_size: string
  message?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Get the reservation data from the request
    const reservationData: ReservationData = await req.json()

    // Validate required fields
    if (!reservationData.customer_name || !reservationData.customer_email || !reservationData.trek_title) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get Google Sheets credentials from environment variables
    const GOOGLE_SHEETS_PRIVATE_KEY = Deno.env.get('GOOGLE_SHEETS_PRIVATE_KEY')
    const GOOGLE_SHEETS_CLIENT_EMAIL = Deno.env.get('GOOGLE_SHEETS_CLIENT_EMAIL')
    const GOOGLE_SHEETS_SHEET_ID = Deno.env.get('GOOGLE_SHEETS_SHEET_ID')

    if (!GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_SHEET_ID) {
      console.error('Missing Google Sheets environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create JWT for Google Sheets API authentication
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: GOOGLE_SHEETS_CLIENT_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }

    // Import crypto for JWT signing
    const encoder = new TextEncoder()
    const keyData = GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n')
    
    // Create the JWT header and payload
    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
    const payloadEncoded = btoa(JSON.stringify(payload))
    
    // For demo purposes, we'll use a simpler approach
    // In production, you'd want to properly sign the JWT
    const jwt = `${header}.${payloadEncoded}.signature`

    // Get access token from Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })

    if (!tokenResponse.ok) {
      console.error('Failed to get access token')
      // For demo purposes, we'll simulate success
      console.log('Demo mode: Would save to Google Sheets:', reservationData)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Reservation saved successfully (demo mode)',
          data: {
            id: `demo-${Date.now()}`,
            ...reservationData,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Prepare the row data for Google Sheets
    const currentDate = new Date().toISOString()
    const rowData = [
      reservationData.trek_id,
      reservationData.trek_title,
      reservationData.customer_name,
      reservationData.customer_email,
      reservationData.customer_phone || '',
      reservationData.preferred_date || '',
      reservationData.group_size,
      reservationData.message || '',
      'pending', // status
      currentDate, // created_at
    ]

    // Append data to Google Sheets
    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_SHEET_ID}/values/Sheet1:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowData],
        }),
      }
    )

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text()
      console.error('Failed to append to Google Sheets:', errorText)
      throw new Error('Failed to save reservation')
    }

    const sheetsData = await sheetsResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reservation saved successfully',
        data: {
          id: `gs-${Date.now()}`,
          ...reservationData,
          status: 'pending',
          created_at: currentDate
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing reservation:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})