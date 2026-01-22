
// Vending Machine 1 and Vending Machine 2
// Display all Vending Machine Information (display_vending_machines.html)
function loadVendingMachinesData(){
   var vendingArray = [];

   fetch('/vending_machines', {
    method: "GET"
   })
   .then(response => {
    if (!response.ok) {
      throw new Error('Error: The response was not ok, please check the logs for error message.');
    }
    return response.json();
   })
   .then(data => {
    //retrieve response and store it in vendingArray
    vendingArray = data
    //print the array in the console
    //console.log(vendingArray);
    insertDynamicVendingMachines(vendingArray)
   })
   .catch(error => {
    console.error('Error:', error); //Handle errors
  });
   
}

function insertDynamicVendingMachines(arrayOfVending) {
  // Retrieve dynamic vending machine container via id
  var dynamicVendingMachineList = document.getElementById("dynamicVendingMachineDataList");

  // Start building new HTML content
  var newContent = "<div class='container'><table><tr>";

  for (var i = 0; i < arrayOfVending.length; i++) {
    // Log the current vending machine object to the console
    console.log(arrayOfVending[i]);

    // Build up the HTML string for vending machines      
    newContent += 
    `<td>
      <div class="card">
        <h2>Vending Machine ${arrayOfVending[i].vending_machine_id}</h2>
        <p><strong>Block:</strong> ${arrayOfVending[i].block}</p>
        <p><strong>Floor:</strong> ${arrayOfVending[i].floor}</p>
        <p><strong>Payment Methods:</strong> ${arrayOfVending[i].payment_methods}</p>
      </div>
    </td>`;

    
    //After every 2 vending machine, end the current row and start a new one
    if ((i+1) % 2 ===0 && i < arrayOfVending.length-1){
      newContent += "</tr><tr>";
    }

  }
    // Close the div container
    newContent += "</tr></table></div>";

    dynamicVendingMachineList.innerHTML = newContent;
}

// Vending Machine 1 
// Display all Vending Machine 1 Items (display_vending_machine1_items.html)
function loadVending1ItemData(){
   var vendingItemArray = [];
   fetch('/vending_machine1_items', {
    method: "GET"
   })
   .then(response => { 
    if (!response.ok){
      throw new Error('Error: The response was not ok, please check logs for error message.')
    }
    return response.json();
   })
   .then(data => {
    vendingItemArray = data
    //console.log(vendingItemArray)
    insertDynamicVendingMachine1Items(vendingItemArray)
  })
  .catch(error => {
    console.error('Error:', error);
  });

}

function insertDynamicVendingMachine1Items(arrayOfVendingItems){
  var dynamicVendingMachineItemsList = document.getElementById("dynamicVendingItemsDataList")

  var newContent = "<div class=container><table><tr>";

  for (var i = 0; i < arrayOfVendingItems.length; i++){
    console.log(arrayOfVendingItems[i]);

    newContent +=
      "<td><h2>" +  arrayOfVendingItems[i].item_id + "</h2>" + 
      "<img src='" + arrayOfVendingItems[i].item_image + "' width='200' height='300'>" + "<br>" + 
      "Item Name: " + arrayOfVendingItems[i].item_name + "<br>" +
      "Item Cost: " + '$'+ arrayOfVendingItems[i].item_cost + "<br>" +
      "Item Availability: " + arrayOfVendingItems[i].availability + "<br>" + 
      "Quantity: " + arrayOfVendingItems[i].item_quantity + "<br>" +
      "<button type='button' id='editbutton' onclick='editVending1ItemData(this)' restId=' " + arrayOfVendingItems[i].item_id + "'>Edit</button>" + 
      "<button type='button' id='deletebutton' onclick='deleteVending1ItemData(this)' restId=' " + arrayOfVendingItems[i].item_id + "'>Delete</button>"
      + "</td>"

    // After every four items, create a new row
    if ((i + 1) % 4 ===0 && arrayOfVendingItems.length-1){
      newContent += "</tr><tr>";
    }
  }
  newContent += "</tr></table></div>";

  dynamicVendingMachineItemsList.innerHTML = newContent;
}


// Delete vending machine 1 items 
function deleteVending1ItemData(buttonElement){
  //use getAttribute to extract the the value of restId
  var id = buttonElement.getAttribute("restId");
  var actionConfirm = confirm('Are you sure you want to delete this item?');
  if (actionConfirm){
    // create api_url of the API to call
    var api_url = '/delete/vending_machine1_item/'+id;

    fetch(api_url, {
      method: "DELETE"
    })
    .then(response => {
      if(!response.ok){
        throw new Error('Error: Please check logs for error message.');
      }
      return response.json();
    })
    .then(data => {
      location.href = "display_vending_machine1_items.html"
    })
    .catch(error => {
      console.error('Error', error)
    });
  } else {
    console.log('Deletion of item cancelled.');
  }  
}


// Add/Insert New Item to Vending Machine 1 (add_vending_machine1_items.html)
function addVending1ItemData(){
  var formElement = document.getElementById('insertForm');

  var formData = new FormData(formElement);

  var VendingItemData = Object.fromEntries(formData.entries());

  var jsonString = JSON.stringify(VendingItemData)

  fetch('/add/vending_machine1_item', {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body:jsonString //javaScript Object in json string format
  })
  .then(response => {
    if (!response.ok){
      throw new Error('Error: The response was not ok, please check error message.');
    }
    return response.text();
  })
  .then(data =>{
    location.href= "./display_vending_machine1_items.html"
  })
  .catch(error =>{
    console.log("Error: ", error)
  });
}


// Update a Item in Vending Machine 1 (update_vending_machine1_items.html)
function editVending1ItemData(btnElement){
  var id = btnElement.getAttribute("restId");
  location.href = "/update_vending_machine1_items.html?id="+ id; 
}

function loadVending1ItemDetail(){
  var vendingItemArray = [];
  var params = new URLSearchParams(location.search);
  var id = params.get("id");
  var api_url = '/vending_machine1_items/'+id;

  fetch(api_url, {
    method: "GET"
  })
  .then (response => {
    if (!response.ok){
      throw new Error('Error: The response was not ok, please check the logs for error message.')
    }
    return response.json();
  })
  .then(data => {
    //retrieve the response and share it in vendingItemArray
    vendingItemArray = data;
    //print out the array in console to see the data
    //console.log(vendingItemArray);
    setVending1ItemDetail(vendingItemArray[0])
  })
  .catch(error =>{
    console.error('Error:', error);
  });
}

function setVending1ItemDetail(item){
  document.getElementById('name_tb').value = item.item_name;
  document.getElementById('cost').value = item.item_cost;
  document.getElementById('image_tb').value = item.item_image;
  document.getElementById('availability').value = item.availability;
  document.getElementById('quantity').value = item.item_quantity;
  document.getElementById('id').value = item.item_id;
}

function updateVending1ItemsData(){
  //retrieve the queries in the URL address
  var params = new URLSearchParams(location.search);
  //Extract id from params
  var id = params.get("id");
  var api_url = '/update/vending_machine1_item/'+id;
  //Retrieve the form element
  var formElement =  document.getElementById('updateVendingItemsForm');
  //Create FormData object from the form
  var formData = new FormData(formElement);
  //Convert FormData to a plain object that is convertible to a JSON string
  var VendingItemData = Object.fromEntries(formData.entries());
  //Convert the object to JSON string to be able to send thorugh body
  var jsonString = JSON.stringify(VendingItemData)

  fetch(api_url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: jsonString
  })
  .then(response => {
    if(!response.ok){
      Error('Error: The response was not ok, please check logs for error message.')
    } 
    return response.json()
  })
  .then(data => {
    location.href = '/display_vending_machine1_items.html';
  })
  .catch(error => {
    console.error('Error:', error);
  })
}


// Vending Machine 2
// Display all Vending Machine 2 Items (display_vending_machine2_items.html)
function loadVending2ItemData(){
  var vending2ItemArray = [];

  fetch('/vending_machine2_items', {
    method: "GET"
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Error: The response was not ok, please check the logs for error message.');
    }
    return response.json();
  })
  .then(data => {
    //retrieve response and store it in vendingItemArray
    vending2ItemArray = data
    //print out the array in console
    //console.log(vending2ItemArray)
    insertDynamicVendingMachine2Items(vending2ItemArray)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function insertDynamicVendingMachine2Items(arrayOfVending2Items){
  // retrieve the dynamic vending item 2 data container via id
  var dynamicVendingMachine2ItemsList = document.getElementById("dynamicVending2ItemsDataList");

  // Start build new HTML content
  var newContent = "<div class='container'><table><tr>";

  for (var i = 0; i < arrayOfVending2Items.length; i++){
    //Log the current vending 2 item object to the console
    console.log(arrayOfVending2Items[i]);

    //Build up new HTML content
    newContent += 
    "<td><h2>" + arrayOfVending2Items[i].item_id + "</h2>" + 
    "<img src='" + arrayOfVending2Items[i].item_image + "' width='200' height='300'>" + "<br>" + 
    "Item Name: " + arrayOfVending2Items[i].item_name + "<br>" +
    "Item Cost: " + '$'+ arrayOfVending2Items[i].item_cost + "<br>" +
    "Item Availability: " + arrayOfVending2Items[i].availability + "<br>" + 
    "Quantity: " + arrayOfVending2Items[i].item_quantity + "<br>" +
    "<button type='button' id='editbutton' onclick='editVending2ItemData(this)' restId='" + arrayOfVending2Items[i].item_id + "'>Edit</button>" + 
    "<button type='button' id='deletebutton' onclick='deleteVending2ItemData(this)' restId='" + arrayOfVending2Items[i].item_id + "'>Delete</button>"
    + "</td>"

  // After every four items, create a new row
  if ((i + 1) % 4 ===0 && arrayOfVending2Items.length-1){
    newContent += "</tr><tr>";
  }
}
  newContent += "</tr></table></div>";

  dynamicVendingMachine2ItemsList.innerHTML = newContent;

}

// Add/Insert New Item to Vending Machine 2 (add_vending_machine2_items.html)
function addVending2ItemData(){
  // Select the form element
  var formElement = document.getElementById('insertForm');

  // Create FormData object from the form element to collect the form fields 
  // Collect all the form fields and the values
  var formData = new FormData(formElement);

  // Convert FormData to a plain object that is convertible to a JSON string
  var Vending2ItemData = Object.fromEntries(formData.entries());

  // Convert the object to JSON string to be able to send through the body
  var jsonString = JSON.stringify(Vending2ItemData) 

  fetch('/add/vending_machine2_item', {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: jsonString
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Error: The response was not ok, please check error message.')
    } 
    return response.text();
  })
  .then(data => {
    location.href = 'display_vending_machine2_items.html';
  })
  .catch(error => {
    console.log('Error: ', error)
  });
}

// Delete Vending Machine 2 Items
function deleteVending2ItemData(buttonElement2){
  //use getAttribute to extract the the value of restId
  var id = buttonElement2.getAttribute("restId");
  var actionConfirm = confirm('Are you sure you want to delete this item?');
  if (actionConfirm){
    // create api_url of the API to call
    var api_url = '/delete/vending_machine2_item/'+id;

    fetch(api_url, {
      method: "DELETE"
    })
    .then(response => {
      if(!response.ok){
        throw new Error('Error: Please check logs for error message.');
      }
      return response.json();
    })
    .then(data => {
      location.href = "display_vending_machine2_items.html"
    })
    .catch(error => {
      console.error('Error', error)
    });
  } else {
    console.log('Deletion of item cancelled.');
  }  
}

//Update a Item in Vending Machine 2 Items (update_vending_machine2_items.html) (NOT WORKING)
function editVending2ItemData(btnElement2){
  var id = btnElement2.getAttribute("restId");
  location.href = "/update_vending_machine2_items.html?id="+ id
}

function loadVending2ItemDetail() {
  var vending2ItemArray = [];
  var params = new URLSearchParams(location.search);
  var id = params.get("id");
  var api_url = '/vending_machine2_items/'+ id;

  fetch(api_url, {
    method:"GET"
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Error: The response was not ok, please check logs for error message.');
    }
    return response.json();
  }) 
  .then(data => {
    // retrieve response and store it in vending2ItemArray
    vending2ItemArray = data;
    //print out the vending2ItemArray in console to see the data
    //console.log(vending2ItemArray);
    setVending2ItemDetail(vending2ItemArray[0])
  })
  .catch(error => {
    console.error('Error: ', error);
  });
}

function setVending2ItemDetail(item){
  document.getElementById('name_tb').value = item.item_name;
  document.getElementById('cost').value = item.item_cost;
  document.getElementById('image_tb').value = item.item_image;
  document.getElementById('availability').value = item.availability;
  document.getElementById('quantity').value = item.item_quantity;
  document.getElementById('id').value = item.item_id;
}

function updateVending2ItemsData(){
  //retrieve the quries in the URL address
  var params = new URLSearchParams(location.search);
  //extract id from params
  var id = params.get("id")
  var api_url = '/update/vending_machine2_item/' + id;
  //retrieve the form element
  var formElement = document.getElementById('updateVending2ItemsForm');
  // Create FormData object from the form
  var formData = new FormData(formElement);
  // Convert FormData to a plain object that is convertible to JSON string
  var Vending2ItemData = Object.fromEntries(formData.entries());
  // Convert the object to JSON string to be able to send through the body
  var jsonString = JSON.stringify(Vending2ItemData)

  fetch(api_url, {
    method:"PUT",
    headers: {
      'Content-Type': 'application/JSON'
    },
    body:jsonString
  })
  .then(response => {
    if(!response.ok){
       Error('Error: The response was not ok, please check logs for error message.')
    }
    return response.json()
  })
  .then(data => {
    location.href="/display_vending_machine2_items.html"    
  })
  .catch(error => {
    console.error('Error:', error);
  })
}



// Special Feature
// Display item restock list in vending machine 1
function loadItemRestockData(){
  var ItemRestockArray =[];

  fetch('/item_restock_1', {
    method: "GET"
  })
  .then(response => {
    if (!response.ok){
      throw new Error('Error: The response was not ok, please check logs for error message.');
    }
    return response.json();
  })
  .then(data => {
    ItemRestockArray = data;
    //console.log(data);
    insertDynamicItemRestock(ItemRestockArray)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function insertDynamicItemRestock(arrayOfItemRestock) {
  var dynamicItemRestockTable = document.getElementById('dynamicItemRestockDataList');

  // Start the table with headers
  var newContent = "<table class='table'><thead><tr><th id='itemid'>Item ID</th><th>Item Name</th><th id='cost'>Item Cost</th><th id='quantity'>Item Quantity</th><th id='restock'>Restock Quantity</th></tr></thead><tbody>"
   
  // Add rows for each item
  for (var i = 0; i < arrayOfItemRestock.length; i++) {
    newContent += "<tr><td id='itemid'>" + arrayOfItemRestock[i].item_id + "</td>" + "<td>" + "<img src='" + arrayOfItemRestock[i].item_image + "' width='100' height='150'>"
    + arrayOfItemRestock[i].item_name + "</td>" + "<td id='cost'>" +arrayOfItemRestock[i].item_cost + "</td>" + 
    "<td id='quantity'>" + arrayOfItemRestock[i].item_quantity + "</td>" + "<td id='restock'>" + arrayOfItemRestock[i].restock_quantity + "</td>"
    + " </tr>";
  }
  
  // Close the table
  newContent += "</tbody></table>"
  

  // Update the inner HTML of the target element
  dynamicItemRestockTable.innerHTML = newContent;
}


// Display item restock list in vending machine 2
function loadItemRestock2Data(){
  var ItemRestockArray =[];

  fetch('/item_restock_2', {
    method: "GET"
  })
  .then(response => {
    if (!response.ok){
      throw new Error('Error: The response was not ok, please check logs for error message.');
    }
    return response.json();
  })
  .then(data => {
    ItemRestockArray = data;
    //console.log(data);
    insertDynamicItemRestock2(ItemRestockArray)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function insertDynamicItemRestock2(arrayOfItemRestock) {
  var dynamicItemRestockTable = document.getElementById('dynamicItemRestock2DataList');

  // Start the table with headers
  var newContent = "<table class='table'><thead><tr><th id='itemid'>Item ID</th><th>Item Name</th><th id='cost'>Item Cost</th><th id='quantity'>Item Quantity</th><th id='restock'>Restock Quantity</th></tr></thead><tbody>"
   
  // Add rows for each item
  for (var i = 0; i < arrayOfItemRestock.length; i++) {
    newContent += "<tr><td id='itemid'>" + arrayOfItemRestock[i].item_id + "</td>" + "<td>" + "<img src='" + arrayOfItemRestock[i].item_image + "' width='100' height='150'>"
    + arrayOfItemRestock[i].item_name + "</td>" + "<td id='cost'>" + arrayOfItemRestock[i].item_cost + "</td>" + 
    "<td id='quantity'>" + arrayOfItemRestock[i].item_quantity + "</td>" + "<td id='restock'>" + arrayOfItemRestock[i].restock_quantity + "</td>" 
    + "</tr>";
  }

  // Close the table
  newContent += "</tbody></table>"
  

  // Update the inner HTML of the target element
  dynamicItemRestockTable.innerHTML = newContent;
}







