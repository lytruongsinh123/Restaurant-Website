"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
    try {
        const r = await signIn("credentials", {
            username: email,
            password: password,
            redirect: false,
        });
        return r;
    } catch (error) {
        // if (error.cause.err instanceof InvalidLoginError) {
            return {"error": "Incorrect username or password"}
        // } else {
        //     throw new Error("Failed to authenticate")
        // }
    }
}
