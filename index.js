const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose=require('mongoose');
const encrypt = require("mongoose-encryption");
global.email="";

mongoose.connect('mongodb+srv://g3:g3@cluster0.9owf4.mongodb.net/usersDB',{ useNewUrlParser: true, useUnifiedTopology: true } ); 



const userSchema=new mongoose.Schema({  
  email:String,
  password:String,
});

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });
const User=new mongoose.model("User",userSchema);


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/register",function(req,res){
    res.sendFile(__dirname+"/register.html");
});

app.post("/login",function(req,res){
    email=req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
  
        if (foundUser) {
          if (foundUser.password === password) {
            res.sendFile(__dirname+"/landing.html")
          }
          else
          {
              console.log("Not Found");
          }
        }
      }
    });
  
  });
app.post("/register",function(req,res){
    console.log(req.body.email);
    console.log(req.body.password);
    email=req.body.email;
    const newUser =  new User({
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(err){
        if (err) {
          console.log(err);
        } else {
          res.sendFile(__dirname+"/landing.html")      
    
        }
      });
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
