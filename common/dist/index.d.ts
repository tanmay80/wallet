import { z } from 'zod';
export declare const expenseAddSchema: z.ZodObject<{
    amount: z.ZodNumber;
    categoryId: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    currency: z.ZodString;
    time: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    amount: number;
    categoryId: string;
    currency: string;
    time: Date;
    description?: string | null | undefined;
}, {
    amount: number;
    categoryId: string;
    currency: string;
    time: Date;
    description?: string | null | undefined;
}>;
export declare const expenseUpdateSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodString>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    time: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    amount?: number | undefined;
    categoryId?: string | undefined;
    description?: string | null | undefined;
    time?: Date | undefined;
}, {
    amount?: number | undefined;
    categoryId?: string | undefined;
    description?: string | null | undefined;
    time?: Date | undefined;
}>;
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
export type ExpenseAddSchema = z.infer<typeof expenseAddSchema>;
export type ExpenseUpdateSchema = z.infer<typeof expenseUpdateSchema>;
