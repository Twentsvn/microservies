import express , { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

app.get("/profile",(req : Request , res : Response )=>{
    res.json({
        service: "users",
        message : " Here is your profile",
        user : (req as any).user,
    });
});

app.get("/health" , (req : Request , res : Response)=>{
    res.json({status : "ok" , service : "users"});
});

app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    console.error('[Users-Service] Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(5001,()=>{
    console.log("Users service running on port 5001");
})
