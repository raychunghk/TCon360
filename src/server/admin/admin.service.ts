import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  async createPublicCalendar(calendarData: any) {
    // Logic to handle the creation of the public calendar
    // You can perform any necessary operations here, such as saving the calendar data to a database
    console.log('Creating public calendar:', calendarData);
  }
}