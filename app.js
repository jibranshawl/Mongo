var mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));


var dbpath ="mongodb://localhost/myblogapp";

db = mongoose.connect(dbpath);

mongoose.connection.once('open',function(){

	console.log("database connection open success");

});



var Blog = require('./blog.js');

var blogModel = mongoose.model('Blog');

app.get('/', function (req, res) {

  res.send('This is a blog app');

});

app.get('/blogs', function (req, res) {


	blogModel.find(function(err,result){
		if(err){
			console.log(err);
  			res.send(err); 
  		}
  		else{
  			res.send(result)
  		}	
});
});


	app.post('/blog/create',function(req,res){

		var newBlog = new blogModel({

			title    : req.body.title,
			subTitle : req.body.subTitle,
			blogBody :  req.body.blogBody

		});


		var today = Date.now();
		newBlog.created = today;
	
	var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split('.'):'';
	newBlog.tags = allTags;

	var authorInfo = {fullName: req.body.authorFullName,email:req.body.authorEmail};
	newBlog.authorInfo=authorInfo;


	newBlog.save(function(error){
		if(error){
		console.log(error);
		res.send(error);	

		}
		else{
			console.log(newBlog);
			res.send(newBlog);
		}
	});

});

app.get('/blogs/:id',function(req,res){

	blogModel.findOne({'_id':req.params.id},function(err,result){
		if(error){
		console.log(error);
		res.send(error);	

		}
		else{
			res.send(newBlog);
		}

	});
});	




app.put('/blog/:id/edit',function(req,res){

	var update =req.body;

	blogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){
		if(error){
		console.log(error);
		res.send(error);	

		}
		else{
			res.send(newBlog);
		}
	});

});


app.post('/blogs/:id/delete',function(req,res){

	blogModel.remove({'_id':req.params.id},function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}

	});


});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
