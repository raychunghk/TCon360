// src/app/lib/types/auth.ts (or inline in bauthclient.ts)

import type { User } from 'better-auth';

export interface CustomSignInResponseData {
    token: string;
    user: User & {
        // Include any additionalFields declared on the server (e.g., staff, tokenMaxAge, etc.)
        staff?: Array<{
            id: number;
            StaffName: string;
            AgentName: string;
            StaffCategory: string;
            Department: string;
            PostUnit: string;
            ManagerName: string;
            ManagerTitle: string;
            ManagerEmail: string;
            userId: string;
            contracts: Array<{
                id: number;
                ContractStartDate: string;
                ContractEndDate: string;
                AnnualLeave: number;
                staffId: number;
                IsActive: boolean;
            }>;
        }>;
        tokenMaxAge?: number;
        // Add other known user fields if needed
    };
    extUser: NonNullable<CustomSignInResponseData['user']> & {
        id: string; // Present in extUser from your actual response
        tokenMaxAge: number;
        nestJwt: string;
        // Matches the enriched user object (duplicate of user + extras)
    };
    session: {
        expiresAt: string; // ISO date string
        createdAt: string; // ISO date string
    };
}