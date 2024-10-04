import { Hono} from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinUserMiddleware, signupUserMiddleware, updateUserMiddleware, userMiddleware } from '../middleware/userMiddleware';

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
userRouter.get('/',userMiddleware,async (c)=>{
    const prisma= new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const user= await prisma.users.findFirst({
      where:{
        userId:c.get('userId')
      }
    })

    if(!user){
      return c.json({error:"Unauthorized!"},401);
    }

    return c.json(user,200);
});

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
});

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
});

userRouter.post('/signup',signupUserMiddleware,async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    const body = await c.req.json();

    const user = await prisma.users.create({
        data: body
      });

      const token = await sign({userId:user.userId}, c.env?.JWT_SECRET);
      return c.json({token});
});