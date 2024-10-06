import { Hono } from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { addExpenseMiddleware, getExpenseMiddleware, updateExpenseMiddleware } from '../middleware/expenseMiddleware';

export const expenseRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>();

// app/v1/expense
// 	2./addExpense
        //token validate 
        //input zod
        //database input
// 	3./
        //using params
// 	4./updateExpense

expenseRouter.get('/',getExpenseMiddleware, async (c) => {
    const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const userId = c.get('userId');
    const categoryId = c.req.query('categoryId');
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');
  
    // Build filters based on query parameters
    let filters: any = {
        deletedAt: null // Ensures that only non-deleted records are retrieved
    };
    if (userId) filters.userId = userId;
    if (categoryId) filters.categoryId = categoryId;
    if (startDate && endDate) {
      filters.time = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
  
    try{
        const expenses = await prisma.expenses.findMany({
            where: filters,
          });
        
        return c.json(expenses);
    }catch(err:any){
        return c.json({ error: 'Failed to fetch expenses' }, 500);
    }
  });
  
expenseRouter.put('/update',updateExpenseMiddleware,async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const body= await c.req.json();

      const expenseId= c.req.param('expenseId');

      try{
        const expense= prisma.expenses.update({
            where:{
                userId:c.get('userId'),
                expenseId:expenseId
            },
            data:body
        })

        return c.json({message:"Expense added",details: expense},200);

    }catch(err:any){
        return c.json({ error: "Expense addition failed", details: err.message }, 500);
    }
})

expenseRouter.post('/add',addExpenseMiddleware,async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    
    const body= await c.req.json();

    const userId= c.get('userId');

    try{
        const expense= prisma.expenses.create({
            data:{
                userId:userId,
                amount:body.amount,
                categoryId:body.categoryId,
                description:body.description,
                currency:body.currency,
                time:body.time,
            }
        })

        return c.json({message:"Expense added",details: expense},200);

    }catch(err:any){
        return c.json({ error: "Expense addition failed", details: err.message }, 500);
    }
    
})