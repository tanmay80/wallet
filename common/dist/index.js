"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupSchema = exports.userSigninSchema = exports.userUpdateSchema = exports.expenseUpdateSchema = exports.expenseAddSchema = void 0;
const zod_1 = require("zod");
exports.expenseAddSchema = zod_1.z.object({
    amount: zod_1.z.number().positive().min(1, "Amount can't be zero"),
    categoryId: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    currency: zod_1.z.string(),
    time: zod_1.z.date()
});
exports.expenseUpdateSchema = zod_1.z.object({
    amount: zod_1.z.number().positive().min(1, "Amount can't be zero").optional(),
    categoryId: zod_1.z.string().optional(),
    description: zod_1.z.string().optional().nullable(),
    time: zod_1.z.date().optional()
});
exports.userUpdateSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name cannot be empty").optional(),
    lastName: zod_1.z.string().min(1, "First name cannot be empty").optional(),
    mobileNo: zod_1.z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").optional(),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long").optional(),
});
exports.userSigninSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
});
exports.userSignupSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name cannot be empty"),
    lastName: zod_1.z.string().optional(),
    mobileNo: zod_1.z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").optional(),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
});
