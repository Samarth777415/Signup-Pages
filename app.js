const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { default: mongoose } = require("mongoose");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*/css", express.static("public/css"));
app.use("*/image", express.static("public/image"));
mongoose.connect("mongodb://localhost:27017/SignUp");
const itemsSchema = new mongoose.Schema({
  name: String
});
const element =mongoose.model("Element",itemsSchema)
const item1 =new element({
  name:"TO Do Lists"
});
const item2 =new element({
  name:"TO "
});
const defaultItems = [ item1,item2];

const signupSchema ={
  name: String,
  mail:String,
  Pass:String ,
  todoList: [itemsSchema]
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
    Pass:Password,
    todoList: []
  
  });
  item.save();
  res.redirect("/")
 

});
app.post("/delete", (req, res) => {
  let checkedItemId = req.body.checkbox.trim(); // Trim any leading or trailing whitespace

  element.findOneAndDelete({ _id: checkedItemId })
      .then((deletedItem) => {
          if (deletedItem) {
              console.log("Successfully deleted checked item.");
              res.redirect("/");
          } else {
              console.log("Item not found.");
              res.redirect("/");
          }
      })
      .catch((err) => {
          console.log(err);
      });
});

app.post("/signin", (req, res) => {
    var Password = req.body.pass;
    var Email = req.body.email;

    Item.findOne({ mail: Email, Pass: Password })
        .then(foundUser => {
            if (foundUser) {
                console.log("User found. Logging in...");
                res.redirect("/todo"); // Redirect to the homepage or wherever you want after successful login
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

app.get("/todo", (req, res) => {
  element.find({  })
  .then(iitems => {
  if(iitems.length===0){
    element.insertMany(defaultItems);
    res.redirect("/todo")
  } else{

       res.render('list',{listTitle:day, newlistitems:iitems});
  
  }
});
    var today=new Date();
    var option={
        weekday: "long",
        day:"numeric",
        month:"long"
    };
    var day=today.toLocaleDateString("en-US",option);
  });
  app.use("*/css", express.static("public/css"));

app.post("/todo", (req, res) => {
  const itemName =req.body.NEWITEM;
  const item =new element({
    name:itemName
  });
  item.save();
  res.redirect("/todo")
  
});
app.listen(3000, () => {
  console.log("The server is Running");
});
