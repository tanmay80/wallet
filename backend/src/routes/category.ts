import { Hono } from 'hono';
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';

export const categoryRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();

//api/v1/category
//1) /create
//2) /update
//3) /

categoryRouter.post('/create',async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const body= await c.req.json();

    try{
        const category= await prisma.categories.create({
            data:body
        });

        if(!category){
            return c.json({error:"Problem with category creation"});
        }

        return c.json({message:"Category created!",category},200);

    }catch(err:any){
        return c.json({ error: "Category creation failed", details: err.message }, 500);
    }
});

categoryRouter.get('/:categoryId',async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const categoryId = c.req.param('categoryId');

    try{
        const category= await prisma.categories.findFirst({
            where:{
                categoryId:categoryId
            }
        });

        if(!category){
            return c.json({error:"Category not found"},404);
        }

        return c.json({message:"Category found!",category},200);

    }catch(err:any){
        return c.json({ error: "Failed to fetch category", details: err.message }, 500);
    }
});

categoryRouter.get('/bulk',async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      try{
        const category= await prisma.categories.findMany({});

        if(category.length===0){
            return c.json({error:"No category found"},404);
        }

        return c.json({message:"Categories  found!",category},200);

    }catch(err:any){
        return c.json({ error: "Failed to fetch categories ", details: err.message }, 500);
    }
})

categoryRouter.put('/update',async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const body= await c.req.json();

    try{
        const category= await prisma.categories.update({
            where:{
                categoryId: body.categoryId
            },
            data:body
        });

        if(!category){
            return c.json({error:"Problem with category updation"});
        }

        return c.json({message:"Category updated!",category},200);

    }catch(err:any){
        return c.json({ error: "Category creation failed", details: err.message }, 500);
    }
});

