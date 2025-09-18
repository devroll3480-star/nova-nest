import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''
  
  try {
    // Make a request to the backend OAuth endpoint with the publishable key
    const response = await fetch(`${backendUrl}/store/auth/google`, {
      method: 'GET',
      headers: {
        'x-publishable-api-key': publishableKey,
      },
    })
    
    if (response.ok) {
      // If successful, redirect to the OAuth URL
      return NextResponse.redirect(`${backendUrl}/store/auth/google`)
    } else {
      // Check if response is HTML (error page) or JSON
      const contentType = response.headers.get('content-type')
      let errorData
      
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json()
      } else {
        // If it's HTML, just get the text
        const text = await response.text()
        errorData = { message: `Backend returned HTML: ${text.substring(0, 200)}...` }
      }
      
      console.error('OAuth initiation error:', errorData)
      return NextResponse.json({ error: 'Failed to initiate OAuth' }, { status: 500 })
    }
  } catch (error) {
    console.error('OAuth initiation error:', error)
    return NextResponse.json({ error: 'Failed to initiate OAuth' }, { status: 500 })
  }
}
