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
- Find all the users stored in database(model.find({}) , model.fineOne({emailId:user.body.emailId}))==>(mongoose documentation)
- User.findOne with duplicate emailIds, which Object returned
- API - Get User API by emailId
- API - Feed API  - GET /feed - all users stored in database
- API - Get User API by Id
- API - Create  a delete User API
- Difference between PUT and PATCH
- API - Update a user
- Explore mongoose doucmentation for model methods
- What are the Options  in a Model.findOneAndUpdate method, explore more
- ApI - Update user with emailId

Episode-08 | Data Sanitization & Schema Validations
-----------------------------------------------------------------------
- Explore SchemaTpe Options from the documentation
- Add required, unique,lowerCase,min,minLength,trim
- Add default
- Create a custom validation function in gender
- Improve the DB schema PUT all appropriate valiadtion on each field in Schema
- Added timestamps to the userSchema
- Added API level validation on patch request & SignUP post API
- DATA SANITIZING- Added API validation for each field 
- go to mongoose Validator and Install (npm i mongoose-validator)
- Added Validator in password,emailId,photoUrl

Episode-09 | Encrypting Passwords
=======================================================================
- Validate data in SignUp API
- Created Src==>utils==>validate.js(validate-firstName,lastName,emailId,password)
- Install bcrypt(npm i bcrypt)
- Create passwordHash using bcrypt.hash(bcrypt password) && Save the user is excrupted password
- Create Login API
         - Check the emailId present in DB(findOne)
         - compare the password(bcrypt.compare)
-          
Episode-10 | Authentication, JWT & Cookies
---------------------------------------------------------
- Install Cookies-parser
- Install jsonWebToken
- Login after email and password verification, create a JWT token and send it to the user
- Create a JWT token(jwt.sign({hidden},ScrecetKey) then Add the token to the cookies and send response back to the user.
- Create a GET/PROFILE API and check the cookies 
- Read the cookies inside your Profile API and find the logged In user
- Inside /Profile API
      - Read the cookies
      - Extract token from the cookies
      - verify a token symmetric(jwt.verify(token,ScretKey))
      - Extarct Id from the decodedMessage
      - From USer findById
      - Send the User back
- expires:new Date(Date.now()+8*3600000)     
-  Create userAuth Middileare
      - Extract token from req.cookies
      - Verify/Validate the token 
      - find the user by Id
- Add the UserAuth middleware in /profile API and a new /sendrequest API      
- Set the expiry of JWT token  and cookies to 7 days
- Create userSchema method to getJWT()
- Create userSchema method to validatePassword(userInputPassword)

Episode-11 | Diving into the APIs and express Router
-----------------------------------------------------------------------
- create routes folder(src=>routes=>authRouter,profileRouter,requestRouter(express.Router()))
- Import those router in app.use
      app.use("/",authRouter);
      app.use("/",profileRouter)
      app.use("/",requestRouter)

- Create Logout API
- Create PATCH /Profile/edit
- Create Change Password
- Create PATCH /Profile/password ==>forgot passowrd

Episode-12 | Logical DB Query & Compound Indexes
----------------------------------------------------------------------------------
- Create connectionRequest Schema(fromUserId,toUserId,status,timestap)
- Create connectionRequest API
- Proper Validation of Data
- Think About ALL corner Cases
        - validate status(either interested/ignored)
        - Can't send request to  yourself(connectionRequestSchema.pre("save",) SchemaLevel)
        - can't send request toUserId to fromUserId($or)
        - can't send request any other Id(findById)
- $or  and $and Query in mongooses
- Schema.pre("save") function       
- Why do we need indexes in DB?
- What is advantages and disadvantages of creating?
- compound Indexes(fromUser:1,toUserId:1)

Episode-13 | ref, Populate & Thought process of writing APIs
---------------------------------------------------------------------
- Created /request/review/:status/:requestId API
         - Check  loggedInUser = req.user; and status,requestId:req.params
         - validate status(either accepted/rejected)
         - .findOne({
                 _id: requestId,
                  status: "interested",
                  toUserId: loggedInUser._id})
          - update status(connectionRequest.status = status;)        

- Created  GET /user/connections API
       - loggedInUser:req.user
       - find connectionRequest({status:"interested", toUserId:loggedInUser._id})
       - Establish Connection using "ref"(ref:"User") in connectionRequestSchma level
       - Add .populate("fromUserId", ["firstName","lastName"])

- Created user/requests API
           - loggedInUser:req.user 
           - find connectionRequest($or:[
                {toUserId:loggedInUser._id , status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ])
            -  const data= connectionRequest.map((row)=>row.fromUserId); // only filter required fields