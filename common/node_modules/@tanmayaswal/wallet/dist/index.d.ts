import { z } from 'zod';
export declare const userUpdateSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    mobileNo: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    mobileNo?: string | undefined;
    password?: string | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    mobileNo?: string | undefined;
    password?: string | undefined;
}>;
export declare const userSigninSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export declare const userSignupSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    mobileNo: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    password: string;
    email: string;
    lastName?: string | undefined;
    mobileNo?: string | undefined;
}, {
    firstName: string;
    password: string;
    email: string;
    lastName?: string | undefined;
    mobileNo?: string | undefined;
}>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type UserSigninSchema = z.infer<typeof userSigninSchema>;
export type UserSignupSchema = z.infer<typeof userSignupSchema>;
