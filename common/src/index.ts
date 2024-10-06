import { z } from 'zod';

export const expenseAddSchema = z.object({
  amount: z.number().positive().min(1,"Amount can't be zero"),
  categoryId: z.string(),
  description: z.string().optional().nullable(),
  currency: z.string(),
  time: z.date()
});

export const expenseUpdateSchema = z.object({
  amount: z.number().positive().min(1,"Amount can't be zero").optional(),
  categoryId: z.string().optional(),
  description: z.string().optional().nullable(),
  time: z.date().optional()
});

export const userUpdateSchema = z.object({
  firstName: z.string().min(1, "First name cannot be empty").optional(),
  lastName: z.string().min(1, "First name cannot be empty").optional(),
  mobileNo: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").optional(), 
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
});

export const userSigninSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password:z.string().min(8,"Password must be at least 8 characters long"),
})

export const userSignupSchema = z.object({
    firstName: z.string().min(1, "First name cannot be empty"),
    lastName: z.string().optional(),
    mobileNo: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})


export type UserUpdateSchema= z.infer<typeof userUpdateSchema>; 
export type UserSigninSchema= z.infer<typeof userSigninSchema>;
export type UserSignupSchema= z.infer<typeof userSignupSchema>;

//expense type

export type ExpenseAddSchema= z.infer<typeof expenseAddSchema>

export type ExpenseUpdateSchema= z.infer<typeof expenseUpdateSchema>