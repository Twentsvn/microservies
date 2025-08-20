# Microservices

How to run
```
cd /project/directory
docker compose build
docker compose up 
```

### You can access the service at localhost:8080 from your browser
## Endpoints of API
- ### API Gateway
  - /
  - /ping
  - /login
  - /auth
  - /api/hello
  
- ### Users Service
  - /api/users
- ### Orders Service
  - /api/orders

#### NOTE
this project has many flaws , it is just for learning i dont think you can use it for anything but there are some microservices which you might share with the world but you dont want single person to overload it so you can use it but again there is no database for storing or endpoint for registering new user. 

Following diagram depicts the architecture (Everthing goes to redis for checking if user is not creating too much load)
```
[ Client / Browser ]
        |
        v
  +-------------------+
  |   API Gateway     | (8080, public)
  +-------------------+
       |         \
       |          \ _ _ _ _ _ _ _
       v                          \ 
+-----------------------+     +------------------------+
|     Users Service     |     |     Orders Service     |
|   (5001, internal)    |     |    (5002, internal)    |
+-----------------------+     +------------------------+
                      
            |
            v
   +-------------------+
   |    Redis Server   |
   |  (6379, internal) |
   +-------------------+

```
