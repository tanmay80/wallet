"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupSchema = exports.userSigninSchema = exports.userUpdateSchema = void 0;
const zod_1 = require("zod");
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
