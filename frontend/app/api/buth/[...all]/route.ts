// app/api/auth/[...all]/route.ts
import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

// Single unified handler for all methods
//export const { GET, POST } = handler;

// Optional: If you want custom logging, wrap it properly without breaking types
const logRoute = (description: string, details: any = {}) => {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`\n[BetterAuth Route][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

export async function GET(request: NextRequest) {
    logRoute('GET request received', { url: request.url });
    try {
        const response = await handler.GET(request);
        logRoute('GET handled successfully', { status: response.status });
        return response;
    } catch (error: any) {
        logRoute('GET error', { error: error.message });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const cloned = request.clone();
    let bodyPreview = "Not JSON or already consumed";
    try {
        const json = await cloned.json();
        bodyPreview = JSON.stringify(json).substring(0, 200) + "...";
    } catch { }

    logRoute('POST request received', {
        url: request.url,
        bodyPreview,
    });

    try {
        const response = await handler.POST(request);
        logRoute('POST handled successfully', { status: response.status });
        return response;
    } catch (error: any) {
        logRoute('POST error', { error: error.message });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}