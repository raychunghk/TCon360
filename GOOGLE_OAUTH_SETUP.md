# Google OAuth Setup Guide

This document describes the Google OAuth implementation for TCon360, which enables users to sign up and log in using their Google account.

## Overview

The Google OAuth implementation uses a custom 2-step flow:

1. **User clicks "Sign up with Google"** → Redirects to `/api/gauth/initiate`
2. **Google OAuth exchange** → NestJS handles OAuth flow, generates one-time signup token
3. **Redirect to signup page** → Frontend pre-fills Google data (email, name)
4. **User completes staff details** → Form submission includes `googleToken`
5. **Backend verifies token** → Creates user with Google ID and staff data
6. **Better-Auth session established** → User is logged in

## Architecture

### Backend (NestJS)

#### New Files

1. **`backend/src/auth/google.strategy.ts`**
   - Passport Google OAuth strategy configuration
   - Handles Google profile extraction

2. **`backend/src/auth/google-oauth.controller.ts`**
   - `GET /api/gauth/initiate` - Initiates Google OAuth flow
   - `GET /api/gauth/callback` - Handles Google callback
   - Generates one-time signup tokens (10 min expiry)
   - Redirects to frontend with token

#### Modified Files

1. **`backend/src/auth/auth.service.ts`**
   - `generateSignupToken(profile)` - Creates one-time JWT
   - `verifySignupToken(token)` - Verifies and returns profile
   - `signUp(payload)` - Handles Google token verification

2. **`backend/src/models/customDTOs.ts`**
   - Added `googleToken?: string` to `signupUserDTO`

3. **`backend/src/auth/auth.module.ts`**
   - Added `GoogleStrategy` to providers
   - Added `GoogleOAuthController` to controllers

4. **`backend/src/auth/users.controller.ts`**
   - Updated error handling for Google token errors

### Frontend (Next.js)

#### Modified Files

1. **`frontend/app/signup/page.tsx`**
   - Detects `googleToken` query parameter
   - Pre-fills email and name from Google
   - Skips to Step 2 (Staff Details)
   - Hides password field for Google signup
   - Includes `googleToken` in form submission

2. **`frontend/app/lib/auth.ts`**
   - Added `provider: 'google-complete'` handling in credentials callback
   - Establishes Better-Auth session after Google signup

3. **`frontend/components/login/LoginBody.tsx`**
   - Updated `handleGoogleLogin()` to redirect to `/api/gauth/initiate?mode=login`

4. **`frontend/app/auth/login/page.tsx`**
   - Handles `googleLoginToken` parameter for existing user login
   - Establishes Better-Auth session after Google login

5. **`frontend/next.config.ts`**
   - Added rewrite rules for `/api/gauth/:path*`

## Environment Variables

Add the following to your `.env` file:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/absproxy/3800/api/gauth/callback

# Frontend URL for redirects
FRONTEND_URL=https://yourdomain.com/absproxy/3000
```

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to: **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure OAuth consent screen (if required)
6. Select **Web application**
7. Add authorized redirect URIs:
   - Development: `http://localhost:3800/api/gauth/callback`
   - Production: `https://yourdomain.com/absproxy/3800/api/gauth/callback`
8. Copy Client ID and Client Secret to your `.env` file

## Flow Details

### Signup Flow

```
1. User clicks "Sign up with Google"
   Frontend: window.location.href = '/api/gauth/initiate'
   
2. NestJS redirects to Google OAuth
   GET /api/gauth/initiate → Google
   
3. User authenticates with Google
   Google → GET /api/gauth/callback?code=...
   
4. NestJS exchanges code for profile
   - Extracts: googleId, email, name, picture
   - Generates: signupToken (JWT, 10min expiry)
   - Redirects to: /signup?googleToken=xxx&email=...&name=...
   
5. Frontend pre-fills form
   - Email and name auto-filled
   - Skips to Step 2 (Staff Details)
   
6. User completes staff form
   POST /api/user/signup with:
   { email, username, staff, googleToken }
   
7. Backend verifies token
   - Decodes signupToken
   - Creates/updates user with googleId
   - Creates staff record and contract
   - Returns: { accessToken, user, tokenMaxAge }
   
8. Frontend establishes Better-Auth session
   signIn.credentials({
     provider: 'google-complete',
     token: data.accessToken
   })
```

### Login Flow (Existing User)

```
1. User clicks "Google" on login page
   window.location.href = '/api/gauth/initiate?mode=login'
   
2. Google OAuth flow completes
   - Backend checks if user exists
   - If exists: generates JWT and redirects with googleLoginToken
   - If not exists: redirects to signup with error
   
3. Frontend establishes session
   signIn.credentials({
     provider: 'google-complete',
     token: googleLoginToken
   })
```

## Security Features

1. **One-time tokens** - Signup tokens expire in 10 minutes
2. **Email verification** - Token email must match form email
3. **Token validation** - Backend rejects invalid/expired tokens
4. **Google ID binding** - User account linked to Google ID for future logins

## Testing Checklist

- [ ] Google OAuth initiation redirects to Google
- [ ] Callback receives profile and redirects with token
- [ ] Signup page pre-fills email and name
- [ ] User skips Step 1 (login details)
- [ ] Form submission includes googleToken
- [ ] Backend verifies token and creates user
- [ ] Better-Auth session is established
- [ ] User is redirected to dashboard
- [ ] Login flow works for existing users
- [ ] Error handling works for expired tokens

## Troubleshooting

### "Invalid or expired Google token"
- The signup token has expired (10 min timeout)
- User must restart the Google OAuth flow

### "Email mismatch between token and form"
- User changed email after Google OAuth
- Ensure email field is read-only for Google signup

### Google OAuth not redirecting
- Check `/api/gauth` rewrite rules in `next.config.ts`
- Verify `GOOGLE_CALLBACK_URL` matches Google Console

### "User not found" on login
- User must sign up first before using Google login
- Redirect to signup page with error message

## Notes

- Uses `/api/gauth` route (NOT `/api/auth` - reserved for Auth.js)
- Better-Auth session established via credentials plugin
- Staff data required for all users (Google or email signup)
- Supports both new user signup and existing user login
