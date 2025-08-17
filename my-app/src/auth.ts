import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log("Credentials:", credentials);
                let user = null;
                // Call backend
                user = {
                    _id: "123",
                    username: "johndoe",
                    email: "johndoe@example.com",
                    isVerify: true,
                    type: "user",
                    role: "admin"
                };
                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.");
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login"
    }
});
