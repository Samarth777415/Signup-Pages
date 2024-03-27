const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*/css", express.static("public/css"));
app.use("*/image", express.static("public/image"));
mongoose.connect("mongodb://localhost:27017/SignUp");
const signupSchema ={
  name: String,
  mail:String,
  Pass:String 
};
const Item =mongoose.model("Item",signupSchema)

app.get("/", (req, res) => {
    
    res.sendFile(__dirname + "/signup.html");
    
  });

app.get("/signin",(req,res)=>{
  res.sendFile(__dirname+"/signin.html")
})
app.get("/Success", (req, res) => {
    
  res.sendFile(__dirname + "/Success.html");
  
});
app.post("/", (req, res) => {
  var Firstname = req.body.fname;
  var  Password= req.body.pass;
  var Email = req.body.email;
  const item =new Item({
    name:Firstname,
    mail:Email,
    Pass:Password
  
  });
  item.save();
  res.redirect("/")
 
});
app.post("/signin", (req, res) => {
    var Password = req.body.pass;
    var Email = req.body.email;

    Item.findOne({ mail: Email, Pass: Password })
        .then(foundUser => {
            if (foundUser) {
                console.log("User found. Logging in...");
                res.redirect("/Success"); // Redirect to the homepage or wherever you want after successful login
            } else {
                console.log("User not found. Please sign up.");
                res.redirect("/signin");
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect("/signin");
        });
});


app.listen(3000, () => {
  console.log("The server is Running");
});
