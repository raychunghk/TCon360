# Reverse Proxy Setup for BetterAuth OAuth

This document explains how to configure your reverse proxy to work with BetterAuth's OAuth flow, particularly for Google OAuth.

## Overview

When your application runs behind a reverse proxy (e.g., nginx, Apache), BetterAuth needs to know the external URL to construct proper OAuth callback URLs. This is handled through the use of `X-Forwarded-*` headers.

## How BetterAuth Uses Reverse Proxy Headers

BetterAuth supports automatic detection of the external URL through `X-Forwarded-*` headers. When `trustedProxyHeaders: true` is set in the configuration, BetterAuth will:

1. Read `X-Forwarded-Host` to determine the external hostname
2. Read `X-Forwarded-Proto` to determine the protocol (http/https)
3. Read `X-Forwarded-Port` (optional) to determine the port
4. Use these values to construct OAuth callback URLs

### Environment Configuration

In your `.env` file:

```bash
# Leave BETTER_AUTH_URL empty to auto-detect from X-Forwarded headers
BETTER_AUTH_URL=

# List all trusted origins (comma-separated)
TRUSTED_ORIGINS=http://localhost:3000,https://code2.raygor.cc
```

When `BETTER_AUTH_URL` is not set, BetterAuth will:
- Enable `trustedProxyHeaders: true` automatically
- Read X-Forwarded headers from incoming requests
- Construct callback URLs based on the detected external URL

## Nginx Configuration

Here's a sample nginx configuration that properly sets the X-Forwarded headers:

```nginx
server {
    listen 443 ssl http2;
    server_name code2.raygor.cc;

    # SSL configuration (example)
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security: Strip client-provided X-Forwarded headers
    # This prevents clients from spoofing the headers
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;

    location /absproxy/3000/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;

        # WebSocket support (if needed)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### Key Points for Nginx:

1. **Order matters**: Set headers before `proxy_pass` to ensure they're sent to the backend
2. **Strip client headers**: By setting headers with `proxy_set_header`, nginx replaces any client-provided values
3. **Use `$scheme`**: This automatically sets the correct protocol (http/https)
4. **Use `$host`**: This uses the hostname from the `Host` header (or server_name if not present)

## Apache Configuration

Here's a sample Apache configuration using mod_proxy:

```apache
<VirtualHost *:443>
    ServerName code2.raygor.cc

    # SSL configuration (example)
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    # Enable reverse proxy
    ProxyPreserveHost On

    # Security: Set X-Forwarded headers
    # These will override any client-provided headers
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Host "code2.raygor.cc"
    RequestHeader set X-Forwarded-Port "443"

    # Proxy configuration
    ProxyPass /absproxy/3000/ http://localhost:3000/
    ProxyPassReverse /absproxy/3000/ http://localhost:3000/

    # Timeouts
    ProxyTimeout 60
</VirtualHost>
```

### Key Points for Apache:

1. **RequestHeader set**: This sets the headers and overwrites any client-provided values
2. **ProxyPreserveHost On**: Preserves the original Host header
3. **SSL certificate**: Required for https:// in X-Forwarded-Proto

## Security Considerations

### ⚠️ Critical: Strip Client-Provided Headers

Your reverse proxy **must** strip or replace client-provided `X-Forwarded-*` headers. If a malicious client can set these headers, they could:

1. Bounce OAuth callbacks through untrusted domains
2. Cause session fixation attacks
3. Redirect users to phishing sites

### Verifying Header Security

Test that your reverse proxy is correctly stripping headers:

```bash
# Test that client-provided headers are ignored
curl -H "X-Forwarded-Host: evil.com" https://code2.raygor.cc/absproxy/3000/api/bauth/session

# Should show code2.raygor.cc in logs, NOT evil.com
```

### Trusted Origins

The `TRUSTED_ORIGINS` environment variable provides an additional layer of security:

```bash
# Only these origins will be accepted for OAuth callbacks
TRUSTED_ORIGINS=http://localhost:3000,https://code2.raygor.cc
```

Even if headers are spoofed, BetterAuth will reject origins not in this list.

## Verifying Headers Are Being Sent

### Using Browser DevTools

1. Open browser DevTools (F12)
2. Go to the Network tab
3. Click "Login with Google"
4. Look at the request to `/api/bauth/sign-in/social`
5. Check the Request Headers section
6. You should see:
   - `X-Forwarded-Host: code2.raygor.cc`
   - `X-Forwarded-Proto: https`
   - `X-Forwarded-Port: 443` (optional)

### Using curl

```bash
# Test headers with curl
curl -v https://code2.raygor.cc/absproxy/3000/api/bauth/session

# Look for these in the output:
# < X-Forwarded-Host: code2.raygor.cc
# < X-Forwarded-Proto: https
```

### Checking Server Logs

When `BETTER_AUTH_DEBUG=true`, BetterAuth will log:

```
[BetterAuth Init][2/20/2026, 4:09:13 PM] Configuration: {
  "proxyHeadersEnabled": true,
  "baseURL": "(auto-detect from headers)",
  "baseURLSource": "X-Forwarded headers",
  ...
}

[BetterAuth Route][2/20/2026, 4:09:15 PM] Request headers: {
  "X-Forwarded-Host": "code2.raygor.cc",
  "X-Forwarded-Proto": "https",
  ...
}

[BetterAuth Route] Detected origin: https://code2.raygor.cc
```

## Troubleshooting

### Issue: redirect_uri_mismatch Error

**Cause**: The redirect URI sent to Google doesn't match what's configured in Google Console.

**Solutions**:
1. Check server logs for the actual redirect URI being sent
2. Add that exact URI to your Google OAuth application
3. Verify X-Forwarded headers are being sent correctly

### Issue: 500 Error on OAuth Route

**Cause**: `BETTER_AUTH_URL` is set to the proxy domain instead of being left empty.

**Solution**:
```bash
# Don't do this:
# BETTER_AUTH_URL=https://code2.raygor.cc

# Do this:
BETTER_AUTH_URL=
```

### Issue: OAuth Callback Goes to Wrong Domain

**Cause**: X-Forwarded headers not set or incorrect.

**Solutions**:
1. Check reverse proxy configuration
2. Verify headers are being sent (see "Verifying Headers" section above)
3. Ensure reverse proxy is stripping client-provided headers

### Issue: Mixed Content Warnings

**Cause**: X-Forwarded-Proto is set to `http` when the site is accessed via `https`.

**Solution**:
- Nginx: Use `$scheme` (automatically detects http/https)
- Apache: Hardcode to `"https"` in SSL virtual host

## Testing Checklist

Before deploying to production, verify:

- [ ] X-Forwarded-Host header is set to the external domain
- [ ] X-Forwarded-Proto header is set to `https`
- [ ] Client-provided X-Forwarded headers are stripped
- [ ] Server logs show correct detected origin
- [ ] OAuth callback URL in Google Console matches the actual URL
- [ ] TRUSTED_ORIGINS includes all legitimate domains
- [ ] BETTER_AUTH_URL is empty (for auto-detection)
- [ ] OAuth flow completes successfully end-to-end

## Example Full Flow

1. User accesses: `https://code2.raygor.cc/absproxy/3000/`
2. User clicks "Login with Google"
3. Client POSTs to: `https://code2.raygor.cc/absproxy/3000/api/bauth/sign-in/social`
4. Nginx receives request and sets headers:
   - `X-Forwarded-Host: code2.raygor.cc`
   - `X-Forwarded-Proto: https`
5. Nginx forwards to: `http://localhost:3000/api/bauth/sign-in/social`
6. BetterAuth reads headers, detects origin: `https://code2.raygor.cc`
7. BetterAuth constructs callback: `https://code2.raygor.cc/absproxy/3000/api/bauth/callback/google`
8. User is redirected to Google with this callback URL
9. Google redirects back to callback URL
10. BetterAuth verifies origin is in TRUSTED_ORIGINS
11. Session is created and user is logged in

## Additional Resources

- [BetterAuth Documentation](https://better-auth.com)
- [nginx proxy_module documentation](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [Apache mod_proxy documentation](https://httpd.apache.org/docs/current/mod/mod_proxy.html)
