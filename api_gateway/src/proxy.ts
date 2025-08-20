import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from "express";
import { requireAuth } from ".";
import { rateLimiter } from "./middleware/rateLimiter";

export function setupProxies(app : Express){
    app.use(
        "/api/users" ,requireAuth , rateLimiter ,
        createProxyMiddleware({
            target: "http://users:5001/profile",
            changeOrigin : true,
            pathRewrite : {"^/api/users":""}
        })
    );

    app.use(
        "/api/orders", requireAuth ,rateLimiter ,
        createProxyMiddleware({
            target : "http://orders:5002/list",
            changeOrigin : true,
            pathRewrite : {"^/api/orders":""}
        })
    );

}