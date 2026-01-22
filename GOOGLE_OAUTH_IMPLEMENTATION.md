# Google OAuth Backend Implementation

## Overview
This implementation moves all Google OAuth database operations from the frontend to the NestJS backend, maintaining proper separation of concerns and security.

## Changes Made

### Backend (NestJS)

#### 1. New DTO: `GoogleAuthDto`
**File**: `backend/src/models/customDTOs.ts`

```typescript
export class GoogleAuthDto {
  id: string; // Google ID
  email: string;
  name: string;
  picture?: string;
  email_verified?: boolean;
}
```

#### 2. New Auth Service Method: `handleGoogleAuth`
**File**: `backend/src/auth/auth.service.ts`

- Accepts Google OAuth profile data
- Checks if user exists by email
- If exists: updates user with Google profile data
- If doesn't exist: creates new user with Google profile data
- Generates JWT token using existing `generateToken` method
- Returns same response format as existing login endpoint

#### 3. New Controller Endpoint: `POST /api/auth/google-callback`
**File**: `backend/src/auth/users.controller.ts`

```typescript
@Post('auth/google-callback')
async handleGoogleAuth(@Body() googleData: GoogleAuthDto) {
  try {
    const { token, user } = await this.authService.handleGoogleAuth(googleData);
    const tokenMaxAge = parseInt(process.env.TOKEN_MAX_AGE || '0', 10) / 1000;
    return { accessToken: token, user, tokenMaxAge };
  } catch (error) {
    throw new HttpException('Google authentication failed', HttpStatus.UNAUTHORIZED);
  }
}
```

### Frontend (Next.js)

#### 1. Modified Better-Auth Configuration
**File**: `frontend/app/lib/auth.ts`

- Added `autoSignUp: false` to Google social provider
- Added custom social handler plugin to intercept Google social login
- Custom handler sends Google profile to backend instead of using prismaAdapter

#### 2. Updated Custom Sign-in Response Plugin
**File**: `frontend/app/lib/plugin/customSignInResponsePlugin.ts`

- Added handler for social login responses
- Ensures proper response format for Google OAuth flow

## Key Features

✅ **All database operations for Google OAuth occur in NestJS backend**
✅ **Frontend sends Google profile to backend via dedicated endpoint**
✅ **Backend handles user creation/update for Google OAuth**
✅ **JWT token generation and response format matches existing login flow**
✅ **No Prisma operations remain in frontend auth.ts for Google flow**
✅ **Code follows existing TCON360 patterns (auth service, error handling, logging)**

## Database Schema Alignment

✅ **Optional password field for OAuth users** - User model already has `password: String?`
✅ **Google unique ID storage** - User can be identified by email, Google ID stored in logic
✅ **Staff/contract data optional** - Handles both new users and existing users without staff data

## Response Format

The backend endpoint returns the same format as the existing login endpoint:

```json
{
  "accessToken": "jwt.token.here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "username": "username",
    "staff": [...]
  },
  "tokenMaxAge": 2592000
}
```

## Error Handling

- Proper error handling with HttpException
- Logging for debugging and monitoring
- Consistent error responses with existing patterns

## Testing Scenarios

The implementation handles:
- ✅ Google OAuth signup creates user in DB correctly
- ✅ Google OAuth login for existing users  
- ✅ "Onboarding" scenario (Google user adding staff details post-signup)
- ✅ Token generation and session handling
- ✅ No direct frontend-to-database Prisma calls for Google flow

## Migration Path

1. **Backend**: New endpoint is ready and compatible with existing auth patterns
2. **Frontend**: Custom handler intercepts Google social login and routes to backend
3. **Database**: No schema changes required (uses existing User model)
4. **Deployment**: Can be deployed independently (backend first, then frontend)

## Backward Compatibility

- Existing password-based authentication remains unchanged
- Existing login/signup endpoints remain unchanged
- Better-Auth configuration maintains compatibility for other providers
- No breaking changes to existing functionality