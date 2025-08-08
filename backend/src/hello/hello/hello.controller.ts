import { Controller, Get } from '@nestjs/common';

@Controller('/api/time')
export class HelloController {
  @Get()
  getServerTime(): { serverTime: string; hongKongTime: string } {
    const now = new Date(); // Get current server time (in server's local timezone initially)

    // serverTime: Return in ISO format (UTC), which is standard and recommended for backend-frontend communication
    const serverTimeUTC = now.toISOString();

    // hongKongTime: Convert the Date object to Hong Kong Time string
    // 'en-US' locale is used for consistent formatting, but you can choose any locale.
    // timeZone: 'Asia/Hong_Kong' explicitly sets the timezone.
    const hongKongTime = now.toLocaleString('en-US', {
      timeZone: 'Asia/Hong_Kong',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    });

    return {
      serverTime: serverTimeUTC,
      hongKongTime: hongKongTime,
    };
  }
}
