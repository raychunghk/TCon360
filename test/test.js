/** @format */

// Better-Auth API Tester for code-server proxy basepath
// Run this in browser console on your code-server page. Edit BASE_PATH and ENDPOINTS as needed.

const BASE_PATH = ""; // Your proxy prefix
const ORIGIN = "http://localhost:3000";
const HEADERS = {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua":
        '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
};

const BODY = {
    identifier: "a@a.com",
    password: "b",
};

const testEndpoints = [
    "/api/bauth/sign-in/credentials",
    "/api/bauth/sign-in/email",
    "/api/auth/signin",

    "/absproxy/3000/api/bauth/sign-in/credentials",
    "/absproxy/3000/api/bauth/sign-in/email",
    "/api/bauth/sign-in/credentials",



];

async function testEndpoint(path) {
    const url = `${ORIGIN}${BASE_PATH}${path}`;
    console.log(`\n🧪 Testing: ${url}`);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY),
            credentials: "include",
            referrer: `${ORIGIN}${BASE_PATH}/auth/login`,
        });

        console.log(`📊 Status: ${response.status} ${response.statusText}`);
        console.log(`📍 URL: ${response.url}`);
        console.log(`✅ Headers:`, Object.fromEntries(response.headers.entries()));

        if (response.ok) {
            const data = await response.json();
            console.log("🎉 SUCCESS:", data);
            return true;
        } else {
            console.log("❌ Failed");
            if (response.status === 404) console.log("🔍 404 - Route not found");
            return false;
        }
    } catch (error) {
        console.log("💥 Error:", error.message);
        return false;
    }
}

// 🚀 Run all tests
async function runAllTests() {
    console.log("🔍 Starting Better-Auth endpoint discovery...\n");
    let found = false;

    for (const path of testEndpoints) {
        const success = await testEndpoint(path);
        if (success) {
            found = true;
            console.log(`\n✅ WORKING ENDPOINT: ${BASE_PATH}${path}`);
        }
        await new Promise((r) => setTimeout(r, 500)); // Rate limit
    }

    console.log(
        `\n${found ? "🎉 Found working endpoint(s)!" : "❌ No endpoints worked. Try adjusting BASE_PATH or check server config."}`
    );
}

// Quick single test
function testOne(path) {
    testEndpoint(path);
}

// Execute
runAllTests();

// Quick controls:
// testOne('/api/bauth/sign-in/credentials');
// BASE_PATH = '/absproxy/4000'; runAllTests();  // Change proxy port
