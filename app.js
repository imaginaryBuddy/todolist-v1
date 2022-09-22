const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const app = express();

console.log(date);
// u can still change the elements inside the array, but you cannot reiitialize the array.
const items = ["Buy Food", "Go for cc07"];
const studyItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.get("/", (req, res) =>{
	let day = date.getDay();
	res.render("list", {listTitle: day, newListItems: items});
});

// for deployment, can run on 3000 and process.env.PORT
app.listen(3000 || process.env.PORT, () =>{
	console.log("Server started on port 3000");
});

app.post("/", function(req, res){
	let item = req.body.newItem;
	console.log(req.body.list);
	if (req.body.list == "Studies"){
		studyItems.push(item);
		res.redirect("/studies");
	} else{
		items.push(item);
		res.redirect("/");

	}

});

// add work route, to provide work todo list
app.get("/studies", (req, res)=>{
	res.render("list", {listTitle: "Studies", newListItems: studyItems});
});

app.get("/about", (req, res)=>{
	res.render("about");
});
