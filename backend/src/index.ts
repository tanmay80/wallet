import { Hono } from 'hono'
import { expenseRouter } from './routes/expense';
import { userRouter } from './routes/user';
import { categoryRouter } from './routes/category';


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

app.route('api/v1/user',userRouter);
app.route('api/v1/expense',expenseRouter);
app.route('api/v1/category',categoryRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
