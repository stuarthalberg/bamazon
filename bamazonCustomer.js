var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "0812Morris33",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});



var startCustomer = function() {
    connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                // console.log("works");
                console.log('Item # ' + results[i].item_id + ': ' + results[i].product_name + ' + | $' + results[i].price);
            }
            inquirer.prompt([{
                type: "input",
                name: "productChoice",
                message: "Choose the product you'd like to buy",
            },
            {
                type: "input",
                name: "productQty",
                message: "How many would you like to buy?"
            }]).then(function(answer) {
                console.log("you chose " + answer.productChoice);
                checkStock(answer.productChoice, answer.productQty);
            });
        });
    };

var checkStock = function(itemId, qtyReq) {
    connection.query("SELECT * FROM products where ?",
        {item_id: itemId},  function(err, results) {
        if (err) throw err;
        console.log(results[0].stock_quantity);
        if (results[0].stock_quantity < parseInt(qtyReq)) {
            console.log("Insufficient quantity!");
        }
    });
};

// var processOrder = function(itemId, qtyReq, itemName) {
//     console.log("Your order is being processed.....");
//     connection.query("UPDATE products set ? where ?",
//         {item_id: itemId},  function(err, results) {
//         if (err) throw err;
//         console.log(results[0].stock_quantity);
//         if (results[0].stock_quantity < parseInt(qtyReq)) {
//             console.log("Insufficient quantity!");
//         }
//     });


// }

startCustomer();
