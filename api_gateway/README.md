# API Gateway — Step 1 (Scaffold + JWT Auth + Docker)

This is the minimal scaffold for your Node.js API Gateway. It includes:
- Express server
- `/health` endpoint
- `/auth/login` to mint a JWT (temporary, accepts any `userId` + `apiKey`)
- `requireAuth` middleware
- Protected route `/api/hello`
- Dockerfile and docker-compose

## Run locally
```bash
cd api-gateway-step1
cp .env.sample .env            # then edit .env and set a strong JWT_SECRET
npm install
npm start
```

Test:
```bash
# Mint a token
curl -s -X POST http://localhost:8080/auth/login     -H "Content-Type: application/json"     -d '{"userId":"pulkit","apiKey":"abc"}' | jq .

# Save the token to a shell variable (bash)
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login     -H "Content-Type: application/json"     -d '{"userId":"pulkit","apiKey":"abc"}' | jq -r .token)

# Call a protected route
curl -s http://localhost:8080/api/hello -H "Authorization: Bearer $TOKEN" | jq .
```

## Run with Docker
```bash
cd api-gateway-step1
cp .env.sample .env            # set JWT_SECRET
docker compose up --build
# gateway will be on http://localhost:8080
```

## Next steps (Step 2)
- Add Redis and implement token-bucket rate limiting per user/IP.
- Add request logging (to console now, DB in Step 3).
- Add reverse proxying to upstream services.
```
