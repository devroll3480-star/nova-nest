"use client"

export function initiateGoogleAuth() {
  // Use our API route that handles the publishable key
  window.location.href = '/api/auth/google'
}
