Episode-03 | Creating our Express Server
---------------------------------------------------
- Create Repository
- Initialize the Repository
- node_modules,package.json,package-lock.json
- Install Express(npm i express)
- Create a Server(app.listen())
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
- Error Handling using app.use("/",(err,req,res,next)={})

Episode-06 | Database, Schema & Models | Mongoose
----------------------------------------------------------------
- Install Moongse Compass
- Go to moongose atlas and create cluster
- mongodb+srv://mlaxmiprava:DevTinder123@firstnode.732hfkb.mongodb.net/
- create a folder src=>config=>database.js
- Install mongoose(npm i mongoose)
- Go to Atlas Security → Database Access
- Find user → mlaxmiprava -> Edit password 
- Whitelist your IP (VERY IMPORTANT)
          - Go to Network Access(0.0.0.0/0)
- Connect your Application to the Database "Connection-url"/devTinder
- Call the Database (connectDB()) function and connect to database before starting the application on 3001
- Create a UserSchema and userModel(src=>model=>user.js)
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try, catch

Episode-07 | Diving into the APIs
--------------------------------------------------
- Js Object Vs JSON
- Add express.json() middleware to your app
- make SignUp API dynamic to receive data from the end User
- Find all the users stored in database(model.find({}) , model.fineOne({emailId:user.body.emailId}))
- User.findOne with duplicate emailIds, which Object returned
- API - Get User API by emailId
- API - Feed API  - GET /feed - all users stored in database
- API - Get User API by Id
