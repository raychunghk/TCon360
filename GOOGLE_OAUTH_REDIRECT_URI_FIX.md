# Google OAuth Redirect URI Fix

## Problem Statement

When the Next.js application runs behind a reverse proxy (VS Code Server's `absproxy`), Better Auth constructs the `redirect_uri` parameter based on the request it receives (`http://localhost:3000/api/bauth/callback/google`), but Google OAuth is configured to accept:

```
https://code2.raygor.cc/absproxy/3000/api/bauth/callback/google
```

This causes a `redirect_uri_mismatch` error during OAuth flow.

## Solution Overview

The fix intercepts the OAuth redirect response **after** Better Auth generates it and rewrites the `redirect_uri` parameter using X-Forwarded headers from the proxy.

## Implementation Details

### File Modified
- `/frontend/app/api/bauth/[...all]/route.ts`

### Key Changes

1. **Response Interception**: Added logic to intercept OAuth redirect responses in the POST handler
2. **X-Forwarded Header Detection**: Reads proxy information from headers:
   - `x-forwarded-proto` (https)
   - `x-forwarded-host` (code2.raygor.cc)
   - `x-forwarded-port` (3000)
3. **URL Rewriting**: Replaces the `redirect_uri` parameter in the Google OAuth URL with the correct proxy origin

### Code Flow

```typescript
POST /api/bauth/sign-in/social
  ↓
Better Auth generates OAuth URL with localhost redirect_uri
  ↓
Response intercepted (status 200, contains Google accounts URL)
  ↓
Extract X-Forwarded headers:
  - proto: 'https'
  - host: 'code2.raygor.cc'
  - port: '3000'
  ↓
Construct correct origin: https://code2.raygor.cc:3000
  ↓
Replace redirect_uri in OAuth URL
  ↓
Return modified response to client
```

### Example Transformation

**Before:**
```
https://accounts.google.com/o/oauth2/v2/auth?
  redirect_uri=http://localhost:3000/api/bauth/callback/google
  &client_id=...
```

**After:**
```
https://accounts.google.com/o/oauth2/v2/auth?
  redirect_uri=https://code2.raygor.cc:3000/api/bauth/callback/google
  &client_id=...
```

## Port Handling

The implementation only includes the port in the URL if:
- Port exists in X-Forwarded-Port header
- Port is not standard (80 for HTTP, 443 for HTTPS)

```typescript
const portString = port && port !== '80' && port !== '443' ? `:${port}` : '';
```

## Logging

The fix includes comprehensive logging to help debug:
- Original redirect_uri (decoded from OAuth URL)
- New redirect_uri
- X-Forwarded headers used

Example log output:
```json
{
  "description": "Rewriting Google OAuth redirect_uri",
  "details": {
    "originalRedirectUri": "http://localhost:3000/api/bauth/callback/google",
    "newRedirectUri": "https://code2.raygor.cc:3000/api/bauth/callback/google",
    "xForwardedHeaders": {
      "proto": "https",
      "host": "code2.raygor.cc",
      "port": "3000"
    }
  }
}
```

## Error Handling

The implementation includes robust error handling:
1. **JSON Parsing Errors**: If the response can't be parsed as JSON, the original response is returned
2. **Missing Headers**: Falls back to sensible defaults:
   - `proto`: 'https'
   - `host`: falls back to 'host' header, then 'localhost'
   - `port`: optional, omitted if not present
3. **Non-OAuth Responses**: Only processes responses that match specific criteria:
   - Path includes 'sign-in/social'
   - Response status is 200
   - Response body contains Google accounts URL

## Impact on Other Flows

✅ **Credential Login**: Unaffected - only processes social login paths
✅ **Other OAuth Providers**: Can be extended to support additional providers by adding similar checks
✅ **OAuth Callback**: Unaffected - only intercepts the initial OAuth redirect
✅ **Direct Access**: Works correctly when accessed directly without proxy

## Testing Checklist

- [ ] Google sign-in initiates with correct redirect_uri
- [ ] redirect_uri matches the URI registered in Google Cloud Console
- [ ] OAuth flow completes without redirect_uri_mismatch error
- [ ] User successfully redirected back to application after Google auth
- [ ] Credential login continues to work
- [ ] Logs show correct X-Forwarded header detection
- [ ] Works with VS Code Server's reverse proxy

## Google Cloud Console Configuration

Ensure the authorized redirect URI is registered:
```
https://code2.raygor.cc/absproxy/3000/api/bauth/callback/google
```

Note: The port (`:3000`) is included if VS Code Server forwards the port in headers.

## Future Enhancements

1. **Support Additional Providers**: Extend to GitHub, Microsoft, etc.
2. **Configuration**: Make redirect_uri rewriting configurable via environment variables
3. **Multiple Proxy Scenarios**: Handle different proxy configurations (e.g., path-based vs subdomain-based)
