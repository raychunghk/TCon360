// app/api/auth/[...nextauth]/route.js
import { authOptions } from '@/auth';
import NextAuth from 'next-auth';

// Utility function for logging with timestamp
const logRoute = (description, details = {}) => {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`[Route][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

logRoute('Initializing NextAuth handlers', { authOptions: Object.keys(authOptions) });

const { handlers } = NextAuth(authOptions);

logRoute('Handlers initialized', { handlers: Object.keys(handlers) });

export const GET = async (req, res) => {
    logRoute('GET request received', {
        url: req.url,
        headers: Object.fromEntries(req.headers.entries()),
    });
    try {
        const response = await handlers.GET(req, res);
        logRoute('GET request processed', { status: response.status });
        return response;
    } catch (error) {
        logRoute('GET request error', { error: error.message, stack: error.stack });
        throw error;
    }
};

export const POST = async (req, res) => {
    logRoute('POST request received', {
        url: req.url,
        headers: Object.fromEntries(req.headers.entries()),
    });
    try {
        const response = await handlers.POST(req, res);
        logRoute('POST request processed', { status: response.status });
        return response;
    } catch (error) {
        logRoute('POST request error', { error: error.message, stack: error.stack });
        throw error;
    }
};