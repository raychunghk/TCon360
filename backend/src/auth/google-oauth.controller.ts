import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';

@Controller('api/gauth')
export class GoogleOAuthController {
  constructor(private authService: AuthService) {}

  @Get('initiate')
  @UseGuards(AuthGuard('google'))
  initiate(@Query() query: { mode?: 'signup' | 'login' }) {
    // Passport handles redirect to Google
    // The mode query param can be used to determine behavior on callback
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res, @Query() query: { mode?: 'signup' | 'login' }) {
    const { googleId, email, name, picture } = req.user;
    const mode = query.mode || 'signup'; // Default to signup mode

    try {
      // Check if user exists
      const existingUser = await this.authService.userExists(email, email);

      if (mode === 'login') {
        // Login mode: If user exists, complete login
        if (existingUser) {
          // Handle Google login for existing user
          const result = await this.authService.handleGoogleSignup({
            googleId,
            email,
            name,
            picture,
          });

          // Redirect to frontend with login success token
          const frontendUrl = process.env.FRONTEND_URL || 'https://code2.raygor.cc/absproxy/3000';
          const redirectUrl = `${frontendUrl}/login?googleLoginToken=${result.token}`;
          return res.redirect(redirectUrl);
        } else {
          // User doesn't exist - redirect to signup
          return res.redirect(`${process.env.FRONTEND_URL || 'https://code2.raygor.cc/absproxy/3000'}/signup?error=user_not_found`);
        }
      }

      // Signup mode: Always redirect to signup with one-time token
      const signupToken = this.authService.generateSignupToken({
        googleId,
        email,
        name,
        picture,
      });

      const frontendUrl = process.env.FRONTEND_URL || 'https://code2.raygor.cc/absproxy/3000';
      
      // Redirect to frontend signup page with token
      const redirectUrl = `${frontendUrl}/signup?googleToken=${signupToken}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
      
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'https://code2.raygor.cc/absproxy/3000';
      return res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
    }
  }
}
