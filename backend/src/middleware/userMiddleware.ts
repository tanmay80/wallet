import {userUpdateSchema,userSigninSchema,userSignupSchema} from '@tanmayaswal/wallet'
import { verify } from 'hono/jwt';

export const updateUserMiddleware = async (c: any, next: any) => {
    try {
        const header = c.req.header('authorization');

        if (!header || !header.startsWith("Bearer ")) {
            return c.json({ error: "Unauthorized, token missing" }, 401);
        }

        const token = header.split(" ")[1];

        const payload = await verify(token, c.env.JWT_SECRET);

        c.set('userId',payload.userId);
        c.set('token',token);

        const body = await c.req.json();

        const { success, error } = userUpdateSchema.safeParse(body);

        if (!success) {
            return c.json({ error: "Incorrect inputs", details: error.errors }, 400);  //400-bad input
        }

        const updateData: any = {};
        if (body.firstName) {
            updateData.firstName = body.firstName;
        }
        if (body.lastName) {
            updateData.lastName = body.lastName;
        }
        if (body.mobileNo) {
            updateData.mobileNo = body.mobileNo;
        }
        if (body.password) {
            updateData.password = body.password;
        }

        if (Object.keys(updateData).length === 0) {
            return c.json({ error: "No fields to update" }, 400);
        }

        c.set('updateData', updateData);
        await next(); 

    } catch (err) {
        // Handle token verification errors or other issues
        return c.json({ error: "Unauthorized, invalid token" }, 401);
    }
};

export const userMiddleware= async (c:any,next:any)=>{
    try{

        const header = c.req.header('authorization');

        if (!header || !header.startsWith("Bearer ")) {
            return c.json({ error: "Unauthorized, token missing" }, 401);
        }

        const token = header.split(" ")[1];

        const payload = await verify(token, c.env.JWT_SECRET);

        c.set('userId',payload.userId);
        c.set('token',token);

        await next();

    }catch (err) {
        // Handle token verification errors or other issues
        return c.json({ error: "Unauthorized, invalid token" }, 401);
    }
}

export const signupUserMiddleware= async (c:any, next:any)=>{
    const body = await c.req.json();
  
    // Validate the input data
    const { success, error } = userSignupSchema.safeParse(body);
  
    if (!success) {
        return c.json({ error: "Incorrect inputs", details: error.errors }, 401);
    }

    await next();
}

export const signinUserMiddleware= async (c:any, next:any)=>{
    const body = await c.req.json();
  
    const { success, error } = userSigninSchema.safeParse(body);
  
    if (!success) {
        return c.json({ error: "Incorrect inputs", details: error.errors }, 401);
    }

    await next();
}