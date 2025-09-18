# Stripe Checkout Setup Guide

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```bash
# Medusa Configuration
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_medusa_publishable_key_here
NEXT_PUBLIC_DEFAULT_REGION=us

# Stripe Configuration (use either one)
NEXT_PUBLIC_STRIPE_PK=pk_test_your_stripe_publishable_key_here
# OR
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_stripe_publishable_key_here

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:8000

# Medusa Backend URL (if different from default)
MEDUSA_BACKEND_URL=http://localhost:9000
```

## Prerequisites

1. **Medusa Backend Running**: Make sure your Medusa backend is running on port 9000
2. **Stripe Account**: You need a Stripe account with API keys
3. **Stripe Module**: Ensure the Stripe payment provider is installed and configured in your Medusa backend

## Getting Your Keys

### Medusa Publishable Key
1. Go to your Medusa Admin dashboard
2. Navigate to Settings > API Key Management
3. Create a new Publishable API Key
4. Copy the key and add it to your `.env.local` file

### Stripe Keys
1. Go to your Stripe Dashboard
2. Navigate to Developers > API Keys
3. Copy your Publishable key (starts with `pk_test_` for test mode)
4. Add it to your `.env.local` file

## Testing the Integration

1. Start your Medusa backend: `npm run dev` (in your backend directory)
2. Start your Next.js frontend: `yarn dev` (in this directory)
3. Go to http://localhost:8000
4. Add items to cart and proceed to checkout
5. Select a Stripe payment method
6. Enter test card details (use Stripe's test cards)
7. Complete the payment

## Test Card Numbers

Use these test card numbers for testing:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

Use any future expiry date and any 3-digit CVC.

## Troubleshooting

### "An unexpected response was received from the server"
This usually means:
1. Medusa backend is not running
2. Environment variables are not set correctly
3. Stripe module is not properly configured in Medusa

### "Card element not found"
This means:
1. You haven't selected a payment method yet
2. You need to go to the payment step first and select Stripe
3. The Stripe Elements provider is not properly initialized

### Debug Information
The implementation includes console logging to help debug issues. Check your browser's developer console for debug information.

## Next Steps

1. Set up your environment variables
2. Ensure your Medusa backend is running with Stripe configured
3. Test the checkout flow
4. Check the browser console for any error messages
5. If issues persist, check the Medusa backend logs
