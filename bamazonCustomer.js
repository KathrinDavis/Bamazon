var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Code2017",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("BAMAZON!");
  	pos();
});



// The first should ask them the ID of the product they would like to buy.
var pos = function() {
	connection.query("SELECT *FROM products", function(err, res){
		console.log(res.RowDataPacket);
	inquirer.prompt({
    name: "itemID",
    type: "input",
    message: "Input the ID of the product you would like to buy: ",
    }).then(function(answer){
    	// for (var i = 0; i < res.length; i++) {
     //    if (res[i].item_id === answer.itemID) {
     //    	chosenItem = res[i];
     	console.log(answer.itemID);
        	inquirer.prompt({
          		name: "units",
			    type: "input",
			    message:"How many units of the product would you like ot buy?",
			    validate: function(value) {
			    	if (isNaN(value) === false) {
			        	return true;
			      	}	return false;
			  	}
          }).then(function(answer){
          	var desiredUnits = parseINT(answer.units);
          	if (chosenItem.stock_quantity<desiredUnits){
          		console.log("Insufficient quantity!");
          	}else{
          		connection.query("UPDATE products SET ? WHERE ?", [{
          			stock_quantity: chosenItem.stock_quantity - desiredUnits
          		}, {
          			item_id: chosenItem_id
          		}], function(err, res){});

    			var cost = desiredUnits*chosenItem.price;
    			console.log("The total cost of your purchase is: $"+cost);
    		}
          	});
        });
        // else{
        // 	console.log("No such item ID. Please try again")
        // 	pos();
        // }
      	});
      }
      	