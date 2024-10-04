import { z } from 'zod';

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