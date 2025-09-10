import { SignOut } from '@/app/lib/auth-action.ts';
import axios from 'axios';
import { format } from 'date-fns';

export async function loadPublicHolidays(get, set) {
    const { basepath, isUnauthorized, isExiting } = get();
    if (isUnauthorized || isExiting) {
        console.log('Skipping public holidays fetch in store', { isUnauthorized, isExiting });
        return;
    }

    try {
        console.log('Fetching public holidays in store');
        const response = await axios.get(`${basepath}/api/timesheet/publicholidays`);
        const pldays = response.data.map((holiday) => ({
            Summary: holiday.Summary,
            StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
        }));
        set({ publicHolidays: pldays });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log('Received 401 Unauthorized, initiating sign-out in store');
            set({ isUnauthorized: true, isExiting: true });
            try {
                console.log('Starting SignOut in store');
                await SignOut();
                console.log('Sign-out successful in store');
            } catch (signOutError) {
                console.error('Sign-out failed in store:', signOutError);
            } finally {
                set({ isExiting: false });
            }
        } else {
            console.error('Error fetching public holidays in store:', error);
        }
    }
}