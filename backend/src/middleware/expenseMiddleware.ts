import { verify } from 'hono/jwt';
import { expenseAddSchema, expenseUpdateSchema } from '@tanmayaswal/wallet'

export const updateExpenseMiddleware= async (c:any,next:any)=>{
    try{
        const header = c.req.header('authorization');

        if (!header || !header.startsWith("Bearer ")) {
            return c.json({ error: "Unauthorized, token missing" }, 401);
        }

        const token = header.split(" ")[1];

        const payload = await verify(token, c.env.JWT_SECRET);

        c.set('userId',payload.userId);
        c.set('token',token);

        const body = await c.req.json();

        const { success, error } = expenseUpdateSchema.safeParse(body);

        if(!success){
            return c.json({ error: "Incorrect inputs", details: error.errors }, 400)
        }

        c.next();
    }catch(err:any){
        return c.json({ error: "Unauthorized!", details: err.message }, 401);
    }
}

export const addExpenseMiddleware= async (c:any,next:any)=>{
    try{
        const header = c.req.header('authorization');

        if (!header || !header.startsWith("Bearer ")) {
            return c.json({ error: "Unauthorized, token missing" }, 401);
        }

        const token = header.split(" ")[1];

        const payload = await verify(token, c.env.JWT_SECRET);

        c.set('userId',payload.userId);
        c.set('token',token);

        const body = await c.req.json();

        const { success, error } = expenseAddSchema.safeParse(body);

        if(!success){
            return c.json({ error: "Incorrect inputs", details: error.errors }, 400)
        }

        c.next();
    }catch(err:any){
        return c.json({ error: "Unauthorized!", details: err.message }, 401);
    }
}

export const getExpenseMiddleware= async (c:any,next:any)=>{
    try{
        const header = c.req.header('authorization');

        if (!header || !header.startsWith("Bearer ")) {
            return c.json({ error: "Unauthorized, token missing" }, 401);
        }

        const token = header.split(" ")[1];

        const payload = await verify(token, c.env.JWT_SECRET);
        c.set('userId',payload.userId);

        c.next();
    }catch(err:any){
        return c.json({ error: "Unauthorized!", details: err.message }, 401);
    }
}