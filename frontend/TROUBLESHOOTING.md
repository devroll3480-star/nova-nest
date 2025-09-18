# Troubleshooting Guide

## Common Issues and Solutions

### 1. Stripe Integration Issues

#### Problem: `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT`
**Cause:** Ad blockers or browser extensions are blocking Stripe resources.

**Solutions:**
1. **Disable Ad Blockers**: Temporarily disable ad blockers (uBlock Origin, AdBlock Plus, etc.) for localhost
2. **Whitelist Stripe Domains**: Add these domains to your ad blocker whitelist:
   - `r.stripe.com`
   - `js.stripe.com`
   - `m.stripe.com`
3. **Use Incognito Mode**: Test in incognito/private browsing mode
4. **Check Network Settings**: Ensure your network/firewall isn't blocking Stripe

#### Problem: `You may test your Stripe.js integration over HTTP`
**Cause:** Stripe is warning about HTTP usage (development only).

**Solution:** This is normal for development. For production, ensure you're using HTTPS.

### 2. Environment Variables Issues

#### Problem: Stripe not loading or payment methods not showing
**Check these environment variables in your `.env.local`:**

```bash
# Required for Stripe
NEXT_PUBLIC_STRIPE_PK=pk_test_your_stripe_publishable_key_here
# OR
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_stripe_publishable_key_here

# Required for Medusa
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_medusa_publishable_key_here
NEXT_PUBLIC_DEFAULT_REGION=us
```

### 3. Shipping Methods Not Loading

#### Problem: Shipping section stuck loading
**Solutions:**
1. **Add Shipping Address First**: Ensure you've added a shipping address before trying to select delivery options
2. **Check Medusa Backend**: Ensure your Medusa backend is running on port 9000
3. **Check Console Logs**: Look for API errors in the browser console

### 4. Content Security Policy (CSP) Issues

#### Problem: Font loading violations
**Cause:** CSP restrictions blocking external fonts.

**Solution:** This is usually a development-only issue and won't affect production. If needed, you can configure CSP headers in your Next.js config.

### 5. Next.js Image Warnings

#### Problem: Image quality not configured
**Solution:** Fixed in `next.config.js` - the warning should disappear after restarting the dev server.

## Debug Steps

1. **Check Browser Console**: Look for error messages and warnings
2. **Check Network Tab**: Verify API calls are successful
3. **Check Environment Variables**: Ensure all required variables are set
4. **Restart Development Server**: After making changes to environment variables
5. **Clear Browser Cache**: Sometimes cached data can cause issues

## Getting Help

If you're still experiencing issues:

1. Check the browser console for specific error messages
2. Verify your Medusa backend is running and configured properly
3. Ensure all environment variables are set correctly
4. Try testing in incognito mode to rule out extension conflicts

## Test Cards for Stripe

Use these test card numbers for testing payments:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.
