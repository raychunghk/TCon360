import { z } from "zod";

export const myCredentialsSchema = z.object({
    // Adjust fields as needed for your "always true" authenticator
    // Since validation is bypassed in the callback, these can be minimal/loose
    identifier: z.string().optional(),  // e.g., username or email
    password: z.string().optional(),
    // Add any other fields you send from the client, even if ignored
    rememberMe: z.boolean().optional(),
});