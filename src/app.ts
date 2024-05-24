import cors from "cors";
import express, { Application, Request, Response } from 'express';
import productRoutes from './../src/app/routes/product';
import orderRoutes from './../src/app/routes/order';
const app: Application = express()


app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;

