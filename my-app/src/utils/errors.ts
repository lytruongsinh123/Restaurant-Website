/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from "next-auth";

// Customize ERROR
// export class CustomAuthError extends AuthError {
//     static type: string;

//     constructor(message?: any) {
//         super();
//         this.type = message;
//     }
// }
export class InvalidEmailPasswordError extends AuthError {
    static type = "Email or Password are invalid";
}
export class InactiveAccountError extends AuthError {
    static type = "Account is inactive";
}