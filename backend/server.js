import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { ConnectDb } from './config/db.js';
import UserRouter from './routes/userRoutes.js';
import recommendationRouter from './routes/recommendationRoutes.js';


const app = express()
app.use(express.json())
app.use(cors())
await ConnectDb();

app.use('/api/auth',UserRouter)
app.use('/api/ai', recommendationRouter)

const port = process.env.PORT || 5001

app.get('/', (req,res)=> res.send('HI TESTING 1 2 3 . . . '))

app.listen(port ,( ) => {
    console.log('SERVER RUNNING ON PORT', port)
})