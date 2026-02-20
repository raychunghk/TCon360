# BetterAuth OAuth Reverse Proxy Fix - Implementation Summary

## Overview

This document summarizes the changes made to fix the Google OAuth flow in better-auth to work correctly with reverse proxy setups. The application runs on `localhost:3000` but is accessed via `https://code2.raygor.cc/absproxy/3000/`.

## Problem Statement

The OAuth flow was failing in three scenarios:
1. **No baseURL**: `redirect_uri_mismatch` error
2. **baseURL=localhost**: Redirect fails because Google expects https://
3. **baseURL=proxy domain**: 500 error on route

## Solution

Enable `trustedProxyHeaders` in better-auth to auto-detect the external URL from `X-Forwarded-*` headers set by the reverse proxy, while keeping all configuration via environment variables.

## Files Changed/Created

### 1. NEW: `frontend/.env.sample`

**Purpose**: Environment variable template with comprehensive documentation

**Key Features**:
- Google OAuth credentials (CLIENT_ID, CLIENT_SECRET)
- BETTER_AUTH_URL (left empty for auto-detection)
- TRUSTED_ORIGINS (comma-separated list of allowed origins)
- Detailed comments explaining each option
- Migration notes for moving to /packages/config

**Example**:
```bash
# Leave empty for auto-detection from X-Forwarded headers (recommended)
BETTER_AUTH_URL=

# Trusted origins for OAuth callbacks
TRUSTED_ORIGINS=http://localhost:3000,https://code2.raygor.cc

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 2. MODIFIED: `frontend/app/lib/auth.ts`

**Purpose**: Configure better-auth with proxy support and environment variables

**Key Changes**:
- Added `parseTrustedOrigins()` function to parse `TRUSTED_ORIGINS` from env
- Removed hardcoded `baseURL: 'http://localhost:3000'`
- Added logic to enable `trustedProxyHeaders: true` when `BETTER_AUTH_URL` is not set
- `baseURL` is now `process.env.BETTER_AUTH_URL || undefined`
- Uses `TRUSTED_ORIGINS` from env variable (with fallback defaults)
- Added comprehensive initialization logging via `logAuthInit()`

**Configuration Logic**:
```typescript
const useProxyHeaders = !process.env.BETTER_AUTH_URL;
const baseURL = process.env.BETTER_AUTH_URL || undefined;
const trustedOrigins = parseTrustedOrigins();

export const auth = betterAuth({
    baseURL: baseURL, // undefined triggers auto-detection
    advanced: {
        disableCSRFCheck: true,
        trustedProxyHeaders: useProxyHeaders, // Auto-detect from headers
    },
    trustedOrigins: trustedOrigins,
    // ... rest of config
});
```

### 3. NEW: `frontend/app/lib/auth-logger.ts`

**Purpose**: Centralized logging utilities for OAuth debugging

**Key Functions**:
- `createOAuthLog()`: Create timestamped OAuth logs
- `createRouteLog()`: Create timestamped route handler logs
- `logRequestHeaders()`: Log important headers (X-Forwarded-*, Origin, Referer, Host)
- `logOAuthParams()`: Log OAuth-specific parameters (provider, callbackURL, state, scope)
- `logOAuthRedirect()`: Log full OAuth URL before redirect
- `logOAuthCallback()`: Log OAuth callback handling
- `logAuthInit()`: Log BetterAuth initialization configuration

**Example Output**:
```
[BetterAuth Init][2/20/2026, 4:09:13 PM] Configuration: {
  "proxyHeadersEnabled": true,
  "baseURL": "(auto-detect from headers)",
  "baseURLSource": "X-Forwarded headers",
  "trustedOrigins": ["http://localhost:3000", "https://code2.raygor.cc"],
  "googleProvider": {
    "clientId": "(set)",
    "clientSecret": "(set)"
  },
  "basePath": "/api/bauth"
}
```

### 4. MODIFIED: `frontend/app/api/bauth/[...all]/route.ts`

**Purpose**: Add comprehensive request-time logging for OAuth debugging

**Key Changes**:
- Import logging functions from `auth-logger.ts`
- Added `extractOAuthInfo()` to detect OAuth routes
- Added `logOAuthRequest()` to log OAuth-specific information
- Enhanced GET/POST handlers with:
  - Request pathname and method
  - Incoming request headers (X-Forwarded-*, Origin, Referer, Host)
  - Detected URL/origin from headers
  - OAuth provider being used
  - OAuth parameters (client_id, redirect_uri, state, scope, etc.)
  - Full Google OAuth URL before redirect
  - Detected callback URL
  - Timestamp for each log entry
- Logs redirect responses with location header
- Enhanced error logging with stack traces

**Example Output**:
```
[BetterAuth Route][2/20/2026, 4:09:15 PM] OAuth route detected: {
  "provider": "google",
  "pathname": "/api/bauth/sign-in/social/google",
  "method": "POST"
}
[BetterAuth Route] Request headers: {
  "X-Forwarded-Host": "code2.raygor.cc",
  "X-Forwarded-Proto": "https",
  "X-Forwarded-Port": "(not set)",
  "Origin": "https://code2.raygor.cc",
  ...
}
[BetterAuth Route] Detected origin: {
  "detectedOrigin": "https://code2.raygor.cc",
  "From X-Forwarded headers": true
}
```

### 5. MODIFIED: `frontend/app/lib/bauthclient.ts`

**Purpose**: Ensure client-side baseURL consistency with server config

**Key Changes**:
- Replaced hardcoded `basePath: "/absproxy/3000/api/bauth"` with `baseURL: getClientBaseURL()`
- Added `getClientBaseURL()` function that:
  - Uses `BETTER_AUTH_URL` env var if set
  - Falls back to auto-detection from `window.location.origin`
  - Logs initialization with detected origin
- Import `createOAuthLog` for client-side logging

**Logic**:
```typescript
const getClientBaseURL = (): string => {
    if (typeof window === 'undefined') {
        return '/api/bauth';
    }

    const envBaseURL = process.env.BETTER_AUTH_URL;
    if (envBaseURL) {
        return envBaseURL + '/api/bauth';
    }

    // Auto-detect from current origin (works with reverse proxy)
    const origin = window.location.origin;
    createOAuthLog('Client initialized', {
        origin,
        basePath: `${origin}/api/bauth`,
        'Using env var': !!envBaseURL,
    });

    return `${origin}/api/bauth`;
};
```

### 6. NEW: `frontend/docs/REVERSE_PROXY_SETUP.md`

**Purpose**: Comprehensive documentation for reverse proxy configuration

**Contents**:
- How BetterAuth uses reverse proxy headers
- Detailed nginx configuration with security best practices
- Detailed Apache configuration
- Security considerations (stripping client headers)
- Trusted origins configuration
- Verification methods (browser DevTools, curl, server logs)
- Troubleshooting guide for common issues:
  - redirect_uri_mismatch error
  - 500 error on OAuth route
  - Wrong domain redirects
  - Mixed content warnings
- Full example OAuth flow walkthrough
- Testing checklist

## How It Works

### Initialization

1. Server starts, reads environment variables
2. `BETTER_AUTH_URL` is empty → `trustedProxyHeaders` enabled
3. `TRUSTED_ORIGINS` parsed from env variable
4. Configuration logged via `logAuthInit()`

### OAuth Flow

1. User accesses app via reverse proxy: `https://code2.raygor.cc/absproxy/3000/`
2. User clicks "Login with Google"
3. Client POSTs to `/api/bauth/sign-in/social`
4. Reverse proxy adds headers:
   - `X-Forwarded-Host: code2.raygor.cc`
   - `X-Forwarded-Proto: https`
5. Request logged with headers and detected origin
6. BetterAuth reads X-Forwarded headers, detects origin
7. BetterAuth constructs callback: `https://code2.raygor.cc/absproxy/3000/api/bauth/callback/google`
8. User redirected to Google with this callback URL
9. Google redirects back to callback URL
10. BetterAuth verifies origin is in TRUSTED_ORIGINS
11. Session created and user logged in

## Configuration Options

### Option 1: BETTER_AUTH_URL empty (Recommended for reverse proxy)
- Auto-detects from X-Forwarded headers
- Works correctly with nginx, Apache
- `trustedProxyHeaders: true` automatically enabled
- Most flexible and secure

### Option 2: BETTER_AUTH_URL=http://localhost:3000
- For local development without proxy
- Direct access to http://localhost:3000
- `trustedProxyHeaders: false`

### Option 3: BETTER_AUTH_URL=https://code2.raygor.cc/absproxy/3000
- Not recommended
- May cause issues with some OAuth providers
- `trustedProxyHeaders: false`
- Only use if auto-detection fails

## Testing

### Before Testing

1. Copy `.env.sample` to `.env.local`
2. Fill in `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
3. Ensure `BETTER_AUTH_URL` is empty
4. Add callback URL to Google Console: `https://code2.raygor.cc/absproxy/3000/api/bauth/callback/google`

### Test Steps

1. Start dev server: `pnpm dev`
2. Check console logs to see initialization config
3. Open browser to `https://code2.raygor.cc/absproxy/3000/`
4. Open browser DevTools Console
5. Click "Login with Google"
6. Watch for OAuth logs showing:
   - Detected origin from X-Forwarded headers
   - Full Google OAuth URL with correct redirect_uri
   - Callback URL matching Google Console config
7. Complete Google auth flow
8. Verify redirect returns to app successfully

### Expected Logs

**Server initialization**:
```
[BetterAuth Init] Configuration: {
  "proxyHeadersEnabled": true,
  "baseURL": "(auto-detect from headers)",
  "trustedOrigins": ["http://localhost:3000", "https://code2.raygor.cc"],
  ...
}
```

**OAuth request**:
```
[BetterAuth Route] Request headers: {
  "X-Forwarded-Host": "code2.raygor.cc",
  "X-Forwarded-Proto": "https",
  ...
}
[BetterAuth Route] Detected origin: https://code2.raygor.cc
[BetterAuth Route] OAuth callback URL: https://code2.raygor.cc/absproxy/3000/api/bauth/callback/google
```

## Security Considerations

1. **Strip client-provided headers**: Reverse proxy must replace X-Forwarded headers
2. **Trusted origins**: Only allow origins in TRUSTED_ORIGINS
3. **HTTPS in production**: Use https:// for production callbacks
4. **Secret protection**: Never expose GOOGLE_CLIENT_SECRET client-side

## Migration Path

Once OAuth is working:

1. Copy GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET to /packages/config
2. Update packages/config/src/env.ts with new variables
3. Update Zod schema validation
4. Import from config instead of process.env
5. Document migration for team reference

## Troubleshooting

### redirect_uri_mismatch

**Cause**: Redirect URI in Google Console doesn't match what's being sent

**Fix**:
1. Check server logs for actual redirect URI
2. Add that exact URI to Google Console
3. Verify X-Forwarded headers are correct

### 500 Error on OAuth Route

**Cause**: BETTER_AUTH_URL is set to proxy domain

**Fix**:
```bash
# Don't do this:
BETTER_AUTH_URL=https://code2.raygor.cc

# Do this:
BETTER_AUTH_URL=
```

### Callback Goes to Wrong Domain

**Cause**: X-Forwarded headers not set correctly

**Fix**:
1. Check reverse proxy configuration
2. Verify headers using browser DevTools
3. Ensure reverse proxy strips client headers

## Additional Resources

- [REVERSE_PROXY_SETUP.md](./REVERSE_PROXY_SETUP.md) - Detailed reverse proxy configuration
- [BetterAuth Documentation](https://better-auth.com)
- [nginx proxy_module docs](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [Apache mod_proxy docs](https://httpd.apache.org/docs/current/mod/mod_proxy.html)
