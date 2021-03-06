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
global.flag=0;
global.read=0;

mongoose.connect('mongodb+srv://g3:g3@cluster0.9owf4.mongodb.net/usersDB',{ useNewUrlParser: true, useUnifiedTopology: true } ); 



const userSchema=new mongoose.Schema({  
  email:String,
  password:String,
});

const reviewsSchema=new mongoose.Schema({  
  email:String,
  name:String,
  rate:Number,
  review: String,
  date:
  {
    type:Date, 
    default:Date.now()
  }
  
});

const resultSchema=new mongoose.Schema({
  name:String,
  sumrate:Number,
  total:Number

});

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });
const User=new mongoose.model("User",userSchema);
const Reviews = new mongoose.model("Reviews",reviewsSchema);
const Results=new mongoose.model("Results",resultSchema);


app.get("/",function(req,res){
  Results.find(function(err,results){
    if(err)
    {
      console.log(err);
    }
    else
    {
    
    var mov1=(Number(results[0].sumrate)/Number(results[0].total)).toFixed(1);
    if(results[0].total==0){mov1 = 0};
    console.log("1",mov1);
    var mov2=(Number(results[1].sumrate)/Number(results[1].total)).toFixed(1);
    if(results[1].total==0){mov2 = 0};
    console.log("2",mov2);
    var mov3=(Number(results[2].sumrate)/Number(results[2].total)).toFixed(1);
    if(results[2].total==0){mov3 = 0};
    console.log("3",mov3);
    var mov4=(Number(results[3].sumrate)/Number(results[3].total)).toFixed(1);
    if(results[3].total==0){mov4 = 0};
    console.log("4",mov4);
    var mov5=(Number(results[4].sumrate)/Number(results[4].total)).toFixed(1);
    if(results[4].total==0){mov5 = 0};
    console.log("5",mov5);
    var mov6=(Number(results[5].sumrate)/Number(results[5].total)).toFixed(1);
    if(results[5].total==0){mov6 = 0};
    console.log("6",mov6);
    var mov7=(Number(results[6].sumrate)/Number(results[6].total)).toFixed(1);
    if(results[6].total==0){mov7 = 0};
    console.log("7",mov7);
    var mov8=(Number(results[7].sumrate)/Number(results[7].total)).toFixed(1);
    if(results[7].total==0){mov8 = 0};
    console.log("8",mov8);
    var mov9=(Number(results[8].sumrate)/Number(results[8].total)).toFixed(1);
    if(results[8].total==0){mov9 = 0};
    console.log("9",mov9);
    var mov10=(Number(results[9].sumrate)/Number(results[9].total)).toFixed(1);
    if(results[9].total==0){mov10 = 0};
    console.log("10",mov10);
    var mov11=(Number(results[10].sumrate)/Number(results[10].total)).toFixed(1);
    if(results[10].total==0){mov11 = 0};
    console.log("11",mov11);
    var mov12=(Number(results[11].sumrate)/Number(results[11].total)).toFixed(1);
    if(results[11].total==0){mov12 = 0};
    console.log("12",mov12);
    res.render("landing",{mov1:mov1,mov2:mov2,mov3:mov3,mov4:mov4,mov5:mov5,mov6:mov6,mov7:mov7,mov8:mov8,mov9:mov9,mov10:mov10,mov11:mov11,mov12:mov12,authenticate:flag});
    }

  });
});

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/register",function(req,res){
    res.sendFile(__dirname+"/register.html");
});
app.get("/reviews",function(req,res){
  if(flag==1)
  {
    res.sendFile(__dirname+"/reviews.html");

  }
  else
  {
    read=1;
    res.sendFile(__dirname+"/index.html");


  }
  
});

app.post("/login",function(req,res){
    email=req.body.email;
    const password = req.body.password;
    var red = 0;
    User.findOne({email: email}, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
  
        if (foundUser) {
          if (foundUser.password === password) {
            
            flag=1;
            if(read==1)
            {
              console.log("shitttt");
              res.sendFile(__dirname+"/reviews.html");
            }
            else
            {
              res.redirect("/");
            }
          }
          
        }
        else{
          console.log("ok");
          res.sendFile(__dirname+"/register.html");
        }
      }
    });
  });
app.post("/register",function(req,res){
    //console.log(req.body.email);
    //console.log(req.body.password);

    email=req.body.email;
    const newUser =  new User({
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(err){
        if (err) {
         console.log(err);
        } else {
          flag=1;
          if(read==1)
          {
            res.sendFile(__dirname+"/reviews.html");
              
          }
          else
          {
            res.redirect("/");
          }    
    
        }
      });
});
app.post("/reviews",function(req,res){
  console.log(req.body.name);
  console.log(req.body.rate);
  console.log(req.body.reviews);
  
  const name=req.body.name;
  const rate=Number(req.body.rate);
  const reviews=req.body.reviews;

  console.log(email);
  
  const newReviews= new Reviews({
    email: email,
    name: name,
    rate: rate,
    review:reviews
    
  });
  newReviews.save(function(err){
    if(err)
    {
      console.log(err);
    }
    else{
      console.log('User saved');
    }
  });

  Results.findOne({name: name}, function(err, foundUser) {
    if (err) {
      console.log(err);
    } 
    else 
    {
      if (foundUser)
      {
        console.log(foundUser.total);
        console.log(foundUser.sumrate);
        var prevtot=foundUser.total;
        var prevsum=foundUser.sumrate;
        prevtot=Number(prevtot)+Number(1);
        prevsum=Number(prevsum)+Number(rate);
        
        Results.updateOne({name:name},{sumrate:prevsum,total:prevtot},function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("all good-update");
           res.redirect("/reviews");
          }
        });
      
      }
      else
      {
        console.log("Not found");
      }
     
    }
      
      

    
  });
  

});
/*app.get("/dummy", function(req, res){
 Reviews.find({ email: email }, function(err,results) {
        if (err) {
          var mov3=(err);
        } else {
          var mov3=(results);
          res.render('dummy',{results:results});  //ejs file to be rendered is 'dummy.ejs'
        }
      });
  
  
});*/
/*app.get("/trial",function(req,res){
 
  res.send("hi");
});*/
app.get('/signout',function(req,res){
  flag = 0;
  res.redirect('/');
})

app.get("/movie/:inp",function(req,res){
  console.log("inp called");
    let param=req.params.inp;
    Reviews.find({ name: param }, function(err,results) {
      if (err) {
        console.log(error);
      } else {
        
        Results.findOne({name:param},function(err,result){
          if(err)
          {
            console.log("error:",err);
          }
          else
          {
            console.log(result);
            console.log(result.sumrate,result.total);
            var sum=result.sumrate;
            var tot=result.total;
            console.log(sum);
            console.log(tot);
            var avg=(Number(sum)/Number(tot)).toFixed(1);
           res.render('dummy',{results:results,avg:avg});  //ejs file to be rendered is 'dummy.ejs'
 


          }
        });

        
      }
    });
  //res.render('dummy',{val:param});
});




app.listen(3000, function() {
    console.log("Server started on port 3000");
  });