import { error } from "console";
import express , {Request , Response , NextFunction} from "express";

const app = express();

app.get("/list" , (req : Request , res : Response)=>{
    res.json({
        service : "orders",
        message : "Here are your orders",
        user : (req as any).user,
        orders: [
            {id : 1 , item : "Laptop" , qty: 1},
            {id : 2 , item : "book" , qty: 9},
            {id : 3 , item : "PC" , qty: 2},
            
        ],
    });
});

app.get("/health" , (req : Request , res : Response) => {
    res.json({status : "ok" , service : "orders"});
});

app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    console.error('[Orders-Servce] Unhandled error :', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });


app.listen(5002,()=>{
    console.log("Orders service running on port 5002");
});