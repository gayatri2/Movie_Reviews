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
    
    var mov1=Math.round(Number(results[0].sumrate)/Number(results[0].total));
    if(results[0].total==0){mov1 = 0};
    console.log(mov1);
    var mov2=Math.round(Number(results[1].sumrate)/Number(results[1].total));
    if(results[1].total==0){mov2 = 0};
    console.log(mov2);
    var mov3=Math.round(Number(results[2].sumrate)/Number(results[2].total));
    if(results[2].total==0){mov3 = 0};
    console.log(mov3);
    var mov4=Math.round(Number(results[3].sumrate)/Number(results[3].total));
    if(results[3].total==0){mov4 = 0};
    console.log(mov4);
    var mov5=Math.round(Number(results[4].sumrate)/Number(results[4].total));
    if(results[4].total==0){mov5 = 0};
    console.log(mov5);
    var mov6=Math.round(Number(results[5].sumrate)/Number(results[5].total));
    if(results[5].total==0){mov6 = 0};
    console.log(mov6);
    var mov7=Math.round(Number(results[6].sumrate)/Number(results[6].total));
    if(results[6].total==0){mov7 = 0};
    console.log(mov7);
    var mov8=Math.round(Number(results[7].sumrate)/Number(results[7].total));
    if(results[7].total==0){mov8 = 0};
    console.log(mov8);
    var mov9=Math.round(Number(results[8].sumrate)/Number(results[8].total));
    if(results[8].total==0){mov9 = 0};
    console.log(mov9);
    var mov10=Math.round(Number(results[9].sumrate)/Number(results[9].total));
    if(results[9].total==0){mov10 = 0};
    console.log(mov10);
    var mov11=Math.round(Number(results[10].sumrate)/Number(results[10].total));
    if(results[10].total==0){mov11 = 0};
    console.log(mov11);
    var mov12=Math.round(Number(results[11].sumrate)/Number(results[11].total));
    if(results[11].total==0){mov12 = 0};
    console.log(mov12);
    res.render("landing",{mov1:mov1,mov2:mov2,mov3:mov3,mov4:mov4,mov5:mov5,mov6:mov6,mov7:mov7,mov8:mov8,mov9:mov9,mov10:mov10,mov11:mov11,mov12:mov12,authenticate:flag});


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
    User.findOne({email: email}, function(err, foundUser){
      if (err) {
        var mov3=(err);
      } else {
  
        if (foundUser) {
          if (foundUser.password === password) {
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
          else
          {
              var mov3=("Not Found");
          }
        }
      }
    });
  
  });
app.post("/register",function(req,res){
    //var mov3=(req.body.email);
    //var mov3=(req.body.password);

    email=req.body.email;
    const newUser =  new User({
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(err){
        if (err) {
          var mov3=(err);
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
  var mov3=(req.body.name);
  var mov3=(req.body.rate);
  var mov3=(req.body.reviews);
  
  const name=req.body.name;
  const rate=Number(req.body.rate);
  const reviews=req.body.reviews;

  var mov3=(email);
  
  const newReviews= new Reviews({
    email: email,
    name: name,
    rate: rate,
    review:reviews
    
  });
  newReviews.save(function(err){
    if(err)
    {
      var mov3=(err);
    }
    else{
     var mov3=('User saved');
    }
  });

  Results.findOne({name: name}, function(err, foundUser) {
    if (err) {
      var mov3=(err);
    } 
    else 
    {
      if (foundUser)
      {
        var mov3=(foundUser.total);
        var mov3=(foundUser.sumrate);
        var prevtot=foundUser.total;
        var prevsum=foundUser.sumrate;
        prevtot=Number(prevtot)+Number(1);
        prevsum=Number(prevsum)+Number(rate);
        
        Results.updateOne({name:name},{sumrate:prevsum,total:prevtot},function(err){
          if(err){
            var mov3=(err);
          }
          else{
           var mov3=("all good-update");
           res.redirect("/reviews");
          }
        });
      
      }
      else
      {
        var mov3=("Not found");
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
app.get("/trial",function(req,res){
 
  res.send("hi");
});
app.get('/signout',function(req,res){
  flag = 0;
  res.redirect('/');
})
app.get("/:inp",function(req,res){
    let param=req.params.inp;
    Reviews.find({ name: param }, function(err,results) {
      if (err) {
        var mov3=(err);
      } else {
        var mov3=(results);
        Results.findOne({name:param},function(err,result){
          if(err)
          {
            var mov3=(err);
          }
          else
          {
            var sum=result.sumrate;
            var tot=result.total;
            var mov3=(sum);
            var mov3=(tot);
            var avg=Number(sum)/Number(tot);
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
