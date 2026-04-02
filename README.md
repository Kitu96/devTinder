Episode-03 | Creating our Express Server
---------------------------------------------------
- Create Repository
- Initialize the Repository
- node_modules,package.json,package-lock.json
- Install Express
- Create a Server
- Listen to port 7777
- Make request handler for /test,/hello
- Install nodemon and update the script inside package.json
- what are dependencies
- what is the use of -g while installing
- what is ~ vs ^
- To Run "npm run dev"

-------------------------------------------------
Episode-04 | Routing and Request Handlers
--------------------------------------------------------------
- git init
- .gitignore => /node_modules
- git add .
- git commit -m "created server"
- create a repository in github
- push it to locally or remote origin
- Play with routes and route extensions ex. /hello, /test, /,
- Order of routes matters alot
- Install postman app and test API call
- Write logic to handle GET,POST,PUT,PATCH API calls
- Explore routing and use of ?,+,, () , * in the routes
- Use of regx in routes /a/ , /.*fly$/
- Reading the Query params in the routes=>console.log(req.params)(http://localhost:3001/user/1001)
- Reading the dynamic routes=>console.log(req.query)(http://localhost:3001/user?userId=1001)

Episode-05 | Middlewares & Error Handlers
-----------------------------------------------------------------------------------
- Multiple Route Handlers
- next()
- next function and error along with res.send()
- app.use("/route",[rH1,rH2,rH3,rH4])
- What is middleware? and why we need it?
- How Express Js handles requests behind the scene
- Difference between app.use() and app.all()
- Write dummy Auth middleware for Admin(src=>middleware=auth.js)
- Write dummy Auth middleware for all user Routes , except /user/login