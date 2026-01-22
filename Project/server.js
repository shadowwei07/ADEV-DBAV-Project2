var express = require("express");
var db = require("./db-connections");
var app = express();
app.use(express.json());
//static files are to be served from public folder - for e.g. html,images, css
app.use(express.static("./public"));


//Display all the vending machines 
app.route('/vending_machines').get(function(req, res){
  var sql = `SELECT vending_machine.vending_machine_id,vending_machine.location.block,vending_machine.location.floor,
  GROUP_CONCAT(vending_machine.payment_method.payment_name SEPARATOR ',') AS payment_methods 
  FROM vending_machine.vending_machine 
  JOIN vending_machine.location ON vending_machine.location_id = vending_machine.location.location_id 
  JOIN vending_machine.vending_payment ON vending_machine.vending_machine_id = vending_payment.vending_id 
  JOIN vending_machine.payment_method ON vending_payment.payment_id = vending_machine.payment_method.payment_id 
  GROUP BY vending_machine.vending_machine_id, vending_machine.location.block, vending_machine.location.floor;`

  db.query(sql, function (error, result) {
    if (error){
      throw error; 
    } else {
      res.json(result); 
    }
  });
});

  


// Vending Machine 1
//Display all the vending machine items in vending machine 1 
app.route('/vending_machine1_items').get(function(req, res){
  var sql = `SELECT vending_machine.vending_item.vending_machine_id,item.item_id,item.item_name,item.item_cost,item.item_image,
  item.availability,item.item_quantity FROM vending_machine.vending_item 
  JOIN vending_machine.item ON vending_machine.item.item_id = vending_machine.vending_item.item_id 
  WHERE VENDING_MACHINE_ID=1;`
  //"SELECT * FROM VENDING_MACHINE.ITEM"

  db.query(sql, function(error, result){
    if (error){
      throw error
    } else {
      res.json(result);
    }
  });
});



//Retrieve Vending Machine 1 item using id
app.route('/vending_machine1_items/:id').get(function(req, res){
  var sql = `SELECT vending_machine.vending_item.vending_machine_id, vending_machine.item.item_id, vending_machine.item.item_name, vending_machine.item.item_cost, 
  vending_machine.item.item_image,vending_machine.item.availability, vending_machine.item.item_quantity FROM vending_machine.vending_item  
  JOIN vending_machine.item ON  vending_machine.item.item_id = vending_machine.vending_item.item_id 
  WHERE vending_machine.vending_item.vending_machine_id=1 AND vending_machine.item.item_id = ?;`

  var parameters = [req.params.id]

  
  db.query(sql,parameters, function(error, result){
    if (error){
      throw error
    } else {
      res.json(result);
    }
  });
});  


// Add/Insert vending machine 1 items  
app.route('/add/vending_machine1_item').post(function(req, res) {
  var sql1 = "INSERT INTO VENDING_MACHINE.ITEM (item_name, item_cost, item_image, availability, item_quantity) VALUES (?, ?, ?, ?, ?);";

  var parameters1 = [req.body.item_name, req.body.item_cost, req.body.item_image, req.body.availability, req.body.item_quantity];

  db.beginTransaction(function(err) {
    if (err) {
      res.status(500).json({ error: 'Transaction initiation failed' });
      return;
    }

    db.query(sql1, parameters1, function(error, result){
      if(error){  
        return db.rollback(function() {
          res.status(500).json({ error: 'Failed to insert item into VENDING_ITEM table' });
        });
      }
      
      var itemId = result.insertId;
      
      var sql2 = "INSERT INTO VENDING_MACHINE.VENDING_ITEM(vending_machine_id, item_id) VALUES (1, ?);";
      
      db.query(sql2, [itemId], function(error, result) {
        if (error) {
          return db.rollback(function() {
            res.status(500).json({ error: 'Failed to insert item into VENDING_ITEM table' });
          });
        }
        
        db.commit(function(err) {
          if (err) {
            return db.rollback(function() {
              res.status(500).json({ error: 'Transaction commit failed' });
            });
          }

          res.json({ message: 'Item added successfully!' });
        });
      });
    }); 
  });
});
 


//Update vending machine 1 items  
app.route('/update/vending_machine1_item/:id').put(function(req, res){
  var sql = "UPDATE VENDING_MACHINE.ITEM SET item_name = ?, item_cost = ?, item_image = ?, availability = ?, item_quantity = ? WHERE item_id = ? ";

  var parameters = [req.body.item_name, req.body.item_cost, req.body.item_image, req.body.availability, req.body.item_quantity, req.params.id];


  db.query(sql, parameters, function(error, result){
    if(error){
      throw error;
    } else {
      res.json(result);
    }
  });
});


//Delete vending machine items in vending machine 1 
app.route('/delete/vending_machine1_item/:id').delete(function(req, res){
  var sql = "DELETE FROM VENDING_MACHINE.ITEM WHERE item_id = ?";

  var parameters = [req.params.id];

  
  db.query(sql, parameters, function(error, result){
    if (error){
      throw error;
    } else {
      res.json({message: 'Item deleted successfully!'});
    }
  });
});




// Vending Machine 2
//Display all the vending machine items in vending machine 2 
app.route('/vending_machine2_items').get(function(req, res){
  var sql = `SELECT vending_machine.vending_item.vending_machine_id,item.item_id,item.item_name,item.item_cost,item.item_image,item.availability,item.item_quantity 
  FROM vending_machine.vending_item 
  JOIN vending_machine.item ON vending_machine.item.item_id = vending_machine.vending_item.item_id 
  WHERE VENDING_MACHINE_ID=2;`
  //"SELECT * FROM VENDING_MACHINE.ITEM"

  
  db.query(sql, function(error, result){
    if (error){
      throw error
    } else {
      res.json(result);
    }
  });
});


//Retrieve Vending Machine 2 item using id
app.route('/vending_machine2_items/:id').get(function(req, res){
  var sql = `SELECT vending_machine.vending_item.vending_machine_id,item.item_id,item.item_name,item.item_cost,
  item.item_image,item.availability,item.item_quantity FROM vending_machine.vending_item 
  JOIN vending_machine.item ON vending_machine.item.item_id = vending_machine.vending_item.item_id 
  WHERE vending_machine.vending_item.vending_machine_id= 2 AND vending_machine.item.item_id = ?;`
  var parameters = [req.params.id]

  
  db.query(sql,parameters, function(error, result){
    if (error){
      throw error
    } else {
      res.json(result);
    }
  });
});

// Add/Insert vending machine 2 items 
app.route('/add/vending_machine2_item').post(function(req, res) {
  var sql1 = "INSERT INTO VENDING_MACHINE.ITEM (item_name, item_cost, item_image, availability, item_quantity) VALUES (?, ?, ?, ?, ?);";

  var parameters1 = [req.body.item_name, req.body.item_cost, req.body.item_image, req.body.availability, req.body.item_quantity];

  db.beginTransaction(function(err) {
    if (err) {
      res.status(500).json({ error: 'Transaction initiation failed' });
      return;
    }

    
    db.query(sql1, parameters1, function(error, result) {
      if (error) {
        return db.rollback(function() {
          res.status(500).json({ error: 'Failed to insert item into ITEM table' });
        });
      }
      
    

      var itemId = result.insertId;

      var sql2 = "INSERT INTO VENDING_MACHINE.VENDING_ITEM(vending_machine_id, item_id) VALUES (2, ?);";
      
      
      db.query(sql2, [itemId], function(error, result) {
        if (error) {
          return db.rollback(function() {
            res.status(500).json({ error: 'Failed to insert item into VENDING_ITEM table' });
          });
        }
       
      
           
        db.commit(function(err) {
          if (err) {
            return db.rollback(function() {
              res.status(500).json({ error: 'Transaction commit failed' });
            });
          }

          res.json({ message: 'Item added successfully!' });
        });
      });
    });
  });
});



//Update vending machine 2 items  
app.route('/update/vending_machine2_item/:id').put(function(req, res){
  var sql = "UPDATE VENDING_MACHINE.ITEM SET item_name = ?, item_cost = ?, item_image = ?, availability = ?, item_quantity = ? WHERE item_id = ? ";

  var parameters = [req.body.item_name, req.body.item_cost, req.body.item_image, req.body.availability, req.body.item_quantity, req.params.id];


  db.query(sql, parameters, function(error, result){
    if(error){
      throw error;
    } else {
      res.json(result);
    }
  });
});


//Delete vending machine items in vending machine 2 
app.route('/delete/vending_machine2_item/:id').delete(function(req, res){
  var sql = "DELETE FROM VENDING_MACHINE.ITEM WHERE item_id = ?";

  var parameters = [req.params.id];

  
  db.query(sql, parameters, function(error, result){
    if (error){
      throw error;
    } else {
      res.json({message: 'Item deleted successfully!'});
    }
  });
});



//Special Feature
// Display item restock in vending machine 1
app.route('/item_restock_1').get(function(req, res){
  var sql = `SELECT vending_machine.item_restock.item_restock_id,
  vending_machine.vending_item.vending_machine_id,vending_machine.item.item_id,
  vending_machine.item.item_name, vending_machine.item.item_cost,
  vending_machine.item.item_image,vending_machine.item.availability,
  vending_machine.item.item_quantity,vending_machine.item_restock.restock_quantity
  FROM vending_machine.item_restock
  JOIN vending_machine.item ON vending_machine.item_restock.item_id = vending_machine.item.item_id
  JOIN vending_machine.vending_item ON vending_machine.item.item_id =vending_machine. vending_item.item_id
  WHERE vending_machine.vending_item.vending_machine_id = 1;`

  
  db.query(sql, function(error, result){
    if(error){
      throw error;
    } else {
      res.json(result);
    }
  });
});


// Display item restock in vending machine 2
app.route('/item_restock_2').get(function(req, res){
  var sql = `SELECT vending_machine.item_restock.item_restock_id,
  vending_machine.vending_item.vending_machine_id,vending_machine.item.item_id,
  vending_machine.item.item_name, vending_machine.item.item_cost,
  vending_machine.item.item_image,vending_machine.item.availability,
  vending_machine.item.item_quantity,vending_machine.item_restock.restock_quantity
  FROM vending_machine.item_restock 
  JOIN vending_machine.item ON vending_machine.item_restock.item_id = vending_machine.item.item_id
  JOIN vending_machine.vending_item ON vending_machine.item.item_id =vending_machine. vending_item.item_id
  WHERE vending_machine.vending_item.vending_machine_id = 2;`

 
  db.query(sql, function(error, result){
    if(error){
      throw error;
    } else {
       res.json(result);
    }
  });
});


app.listen(8080, "127.0.0.1"); 
console.log("web server running @ http://127.0.0.1:8080");


