import { SignOut } from '@/app/lib/auth-action';
import axios from 'axios';
import { parseCookies } from 'nookies';

export async function fetchStaffData(get, set) {
    const { basepath, isUnauthorized, isExiting } = get();
    if (isExiting) {
        console.log('fetchStaffData: Skipping due to isExiting=true');
        return;
    }
    const cookies = parseCookies();
    const tokenCookie = cookies.token;

    if (isUnauthorized || !tokenCookie) {
        console.log('fetchStaffData: Skipping due to unauthorized or no token', { isUnauthorized, tokenCookie });
        set({ status: 'unauthenticated', isAuthenticated: false, isUnauthorized: true });
        return;
    }

    try {
        console.log('fetchStaffData: Fetching staff data', { basepath });
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
        console.error('fetchStaffData: Failed to fetch staff data:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log('fetchStaffData: Received 401 Unauthorized, initiating sign-out');
            set({ isUnauthorized: true, isExiting: true, status: 'unauthenticated', isAuthenticated: false });
            try {
                await SignOut();
                console.log('fetchStaffData: Sign-out successful');
            } catch (signOutError) {
                console.error('fetchStaffData: Sign-out failed:', signOutError);
            }
        } else {
            set({ isAuthenticated: false, status: 'unauthenticated', isUnauthorized: true });
        }
    }
}