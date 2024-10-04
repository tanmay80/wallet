import { Hono} from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import {userUpdateSchema,userSigninSchema,userSignupSchema} from '@tanmayaswal/wallet'
import { signinUserMiddleware, signupUserMiddleware, updateUserMiddleware } from '../middleware/userMiddleware';

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    }
    Variables:{
        updateData:string
        token:string
        userId:string
    }
}>();

// app/v1/user
// 	1./signup
//  2./signin
// 	3./update
//  4./

userRouter.put('/update',updateUserMiddleware,async (c)=>{
  const prisma= new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const updateData = c.get('updateData');

  const post= await prisma.users.update({
      where:{
        userId:c.get('userId'),
      },
      data:updateData,
    })

  if(!post){
      return c.json({error:"Error while updating the field"},404);
  }

  return c.json({message:"User details updated"},200);
})

userRouter.post('/signin',signinUserMiddleware,async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    const body = await c.req.json();

    const user=await prisma.users.findFirst({
        where:{
          email:body.email,
        }
      });

    if(!user){
        return c.json({error:"No user found!"},404);
    }

    if(user.password!=body.password){
        return c.json({error:"Wrong password!"},404);
    }

    const token = await sign({userId:user.userId}, c.env?.JWT_SECRET);
    return c.json({token},200);
})

userRouter.post('/signup',signupUserMiddleware,async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    const body = await c.req.json();

    const user = await prisma.users.create({
        data: {
          firstName:body.firstName,
          lastName: body.lastName,
          mobileNo: body.mobileNo,
          email: body.email,
          password: body.password
        }
      });

      const token = await sign({userId:user.userId}, c.env?.JWT_SECRET);
      return c.json({token});
})