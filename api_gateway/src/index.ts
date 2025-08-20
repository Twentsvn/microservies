import dotenv from 'dotenv';
import express ,{Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import { rateLimiter } from './middleware/rateLimiter';
import { setupProxies } from './proxy';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_admin';

// --- middleware ---
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupProxies(app);

// Ping check
app.get('/ping', (req : Request, res: Response) => {
  res.json({
    status: 'pong',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Simple login to mint a JWT (placeholder - will add real users later)
// POST /auth/login  { "userId": "pulkit", "apiKey": "anything-for-now" }
app.post('/auth', (req : Request, res : Response) => {
  const { userId, apiKey } = req.body as {userId?: string; apiKey?: string};
  if (!userId || !apiKey) {
    return res.status(400).json({ error: 'userId and apiKey are required' });
  }
  // TODO: verify apiKey properly once we add a DB
  const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('authorization',"Bearer "+token,{
      httpOnly: true,
      secure : true,
      maxAge : 36000000
  });
  res.json({ token, expiresIn: 3600 });
  

});

// Bearer auth middleware
export function requireAuth(req : Request, res : Response, next : NextFunction) {
  
  //console.error(req.cookies);
  try{   // To use req.cookies, the cookie-parser middleware must be installed and used in your Express application. Without it, req.cookies will typically be an empty object or undefined.
  let header = req.headers['cookie'] || req.headers['authorization'] || " " ; // either as cookie or in header field
  console.error(header);
  header = header.split('authorization=')[1];
  console.error(header);
  const [scheme, token] = header.split('%20');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid Authorization header' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {sub : string};
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
  catch(err){
    console.error(err);
    res.status(401).json({error : 'Missing or invalid Authorization header' })
  }
  
}

app.get('/',(req : Request, res : Response)=>{
  res.send(`<html> This is api gateway!! <br> <a href="/login"> <button> TO Login Page </button> </a> </html>  `);
});

// Protected sample route
app.get('/api/hello', requireAuth, rateLimiter, (req : Request, res : Response) => {
  res.json({ message: `Hello, ${(req as any).user.sub}!`, user: (req as any).user });
});

// Global error handler
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

//public dir added for static access
app.use(express.static(path.join(__dirname,'../../public')));

app.get('/login',(req : Request, res : Response) => {
  
  res.redirect('/login.html');
  
});





app.listen(PORT, () => {
  console.log(`API Gateway listening on http://localhost:${PORT}`);
});




