const adminAuth = (req, res, next) => {
    console.log("Admin Authorized");
    const token = "123456789";
    const isAuthenticated = token === "123456789";
    if(!isAuthenticated) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

const userAuth = (req,res,next) => {
    console.log("User Authorized");
    const token = "123456789";
    const isUserAuthenticated = token === "123456789";
    if(!isUserAuthenticated) 
    {
        return res.status(401).send("Unauthorized");
    }
    next();
}
module.exports = { adminAuth , userAuth }