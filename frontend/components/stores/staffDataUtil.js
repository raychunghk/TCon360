import { SignOut } from '@/app/lib/auth-action';
import axios from 'axios';
import { parseCookies } from 'nookies';

export async function fetchStaffData(get, set) {
    const { basepath, isUnauthorized, isExiting } = get();
    const cookies = parseCookies();
    const tokenCookie = cookies.token;

    if (isUnauthorized || isExiting || !tokenCookie) {
        console.log('Skipping staff data fetch', { isUnauthorized, isExiting, tokenCookie });
        set({ status: 'unauthenticated', isAuthenticated: false });
        return;
    }

    try {
        console.log('Fetching staff data in store');
        const response = await axios.get(`${basepath}/api/user/myuser`, {
            headers: { Authorization: `Bearer ${tokenCookie}` },
        });
        if ([200, 201].includes(response.status)) {
            const userData = response.data;
            const staffMember = userData.staff[0];
            const activeContracts = staffMember.contracts.filter((contract) => contract.IsActive);
            set({
                activeUser: userData,
                activeStaff: staffMember,
                activeContract: activeContracts.length > 0 ? activeContracts[0] : null,
                isAuthenticated: true,
                status: 'authenticated',
            });
        } else {
            throw new Error('Invalid response status');
        }
    } catch (error) {
        console.error('Failed to fetch staff data in store:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log('Received 401 Unauthorized, initiating sign-out in store');
            set({ isUnauthorized: true, isExiting: true });
            try {
                await SignOut();
                console.log('Sign-out successful in store');
            } catch (signOutError) {
                console.error('Sign-out failed in store:', signOutError);
            } finally {
                set({ isExiting: false, isAuthenticated: false, status: 'unauthenticated' });
            }
        } else {
            set({ isAuthenticated: false, status: 'unauthenticated' });
        }
    }
}