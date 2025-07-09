 
import { Staff } from '@/components/leaveRequestStaffInfo';

declare module '@auth/core/types' {
  interface User {
    staff?: Staff | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user?: User;
  }
}
 