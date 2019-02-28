var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var mongo=require('mongoose');




var app=express();


var db=mongo.connect("mongodb://localhost:27017/AngularCRUD",function(err,res){
    if(err){
        console.log(err);
    }else{
        console.log('connected to db');
    }
});

app.use(bodyParser());
app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
));

var Schema=mongo.Schema;

var UserSchema= new Schema({
    name:{ type:String},
    country:{type:String}
},{ versionKey: false });  

var model=mongo.model('users',UserSchema,'users');

app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});  

app.post("/api/saveuser",function(req,res){
    var mod=new model(req.body);
    
    
    
    
    if(req.body.mode=="Save")
    {
        mod.save(function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.send({
                data:"Record inserted"
            });
            }
        });
    }
    else{
        model.findByIdAndUpdate(req.body.id, { name: req.body.name, country: req.body.country},  
            function(err,data) {  
            if (err) {  
            res.send(err);         
            }  
            else{        
                   res.send({data:"Record has been Updated..!!"});  
              }  
          });  
}
});

app.post("/api/deleteuser",function(req,res){
        model.remove({_id:req.body.id},function(err,data){
            if(err){res.send(err);}
            else{
                res.send({data:"record has been deleted"});
            }
        });
});

app.get("/api/getuser",function(req,res){
        model.find({},function(err,data)
        {
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        });
});
app.listen(process.env.PORT || 3000, function(){
    console.log("listening on 3000");
});