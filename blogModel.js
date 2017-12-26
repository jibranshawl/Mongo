var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({


	title    : {type:String,default:'',required:true},
	subTitle : {type:String,default:''},
	blogBody :{type:String,default:''},
	tags     : [],
	created  : {type:Date},
	lastModfied : {type:Date},
	authorInfo : {}

});	


mongoose.model('Blog',blogSchema);