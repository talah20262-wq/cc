const firebaseConfig = {

databaseURL:
"https://mama-c6e6b-default-rtdb.firebaseio.com/"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

/* ===========================
   Collections
=========================== */

const productsRef =
db.ref("products");

const salesRef =
db.ref("sales");

const customersRef =
db.ref("customers");

const expensesRef =
db.ref("expenses");

const tailorsRef =
db.ref("tailors");

const factoryRef =
db.ref("factory");

const settingsRef =
db.ref("settings");

/* ===========================
   Products
=========================== */

function saveProductToFirebase(product){

let id =
product.id ||
"PRD_" + Date.now();

product.id = id;

return productsRef
.child(id)
.set(product);

}

function updateProductInFirebase(
id,
data
){

return productsRef
.child(id)
.update(data);

}

function deleteProductFromFirebase(
id
){

return productsRef
.child(id)
.remove();

}

function loadProductsRealtime(){

productsRef.on(
"value",
snapshot=>{

let data =
snapshot.val() || {};

window.products =
data;

if(
typeof renderProducts
=== "function"
){
renderProducts();
}

if(
typeof renderInventory
=== "function"
){
renderInventory();
}

if(
typeof updateDashboard
=== "function"
){
updateDashboard();
}

});

}

/* ===========================
   Customers
=========================== */

function saveCustomer(customer){

let id =
customer.id ||
"CUS_" + Date.now();

customer.id = id;

return customersRef
.child(id)
.set(customer);

}

function updateCustomer(
id,
data
){

return customersRef
.child(id)
.update(data);

}

function deleteCustomer(
id
){

return customersRef
.child(id)
.remove();

}

function loadCustomersRealtime(){

customersRef.on(
"value",
snapshot=>{

window.customers =
snapshot.val() || {};

if(
typeof renderCustomers
=== "function"
){

renderCustomers();

}

});

}

/* ===========================
   Sales
=========================== */

function saveSale(invoice){

let id =
invoice.id ||
"INV_" + Date.now();

invoice.id = id;

return salesRef
.child(id)
.set(invoice);

}

function loadSalesRealtime(){

salesRef.on(
"value",
snapshot=>{

window.sales =
snapshot.val() || {};

if(
typeof renderSales
=== "function"
){
renderSales();
}

if(
typeof updateDashboard
=== "function"
){
updateDashboard();
}

});

}

/* ===========================
   Expenses
=========================== */

function saveExpense(expense){

let id =
"EXP_" + Date.now();

expense.id = id;

return expensesRef
.child(id)
.set(expense);

}

function loadExpensesRealtime(){

expensesRef.on(
"value",
snapshot=>{

window.expenses =
snapshot.val() || {};

if(
typeof renderExpenses
=== "function"
){

renderExpenses();

}

});

}

/* ===========================
   Tailors
=========================== */

function saveTailorJob(job){

let id =
"TLR_" + Date.now();

job.id = id;

return tailorsRef
.child(id)
.set(job);

}

function loadTailorsRealtime(){

tailorsRef.on(
"value",
snapshot=>{

window.tailors =
snapshot.val() || {};

if(
typeof renderTailors
=== "function"
){

renderTailors();

}

});

}

/* ===========================
   Factory
=========================== */

function saveFactoryItem(item){

let id =
item.id ||
"FAC_" + Date.now();

item.id = id;

return factoryRef
.child(id)
.set(item);

}

function updateFactoryStage(
id,
stage
){

return factoryRef
.child(id)
.update({

stage:stage

});

}

function loadFactoryRealtime(){

factoryRef.on(
"value",
snapshot=>{

window.factoryItems =
snapshot.val() || {};

if(
typeof renderFactory
=== "function"
){

renderFactory();

}

});

}

/* ===========================
   Settings
=========================== */

function saveSettings(settings){

return settingsRef.set(
settings
);

}

function loadSettings(){

settingsRef.once(
"value"
).then(snapshot=>{

window.storeSettings =
snapshot.val() || {};

if(
typeof applySettings
=== "function"
){

applySettings();

}

});

}

/* ===========================
   Dashboard
=========================== */

function getTotalSales(){

let total = 0;

Object.values(
window.sales || {}
).forEach(s=>{

total += Number(
s.total || 0
);

});

return total;

}

function getTotalProfit(){

let total = 0;

Object.values(
window.sales || {}
).forEach(s=>{

total += Number(
s.profit || 0
);

});

return total;

}

function getInvoicesCount(){

return Object.keys(
window.sales || {}
).length;

}

function getLowStockCount(){

let count = 0;

Object.values(
window.products || {}
).forEach(p=>{

if(
Number(p.qty) <= 5
){

count++;

}

});

return count;

}

/* ===========================
   Loyalty
=========================== */

function addPoints(
phone,
points
){

if(!phone) return;

customersRef
.child(phone)
.once(
"value"
)
.then(snapshot=>{

let customer =
snapshot.val() || {

phone:phone,
points:0

};

customer.points =
(customer.points || 0)
+
points;

customersRef
.child(phone)
.set(customer);

});

}

function getVipStatus(points){

if(points >= 1000)
return "VIP";

if(points >= 500)
return "GOLD";

if(points >= 200)
return "SILVER";

return "NORMAL";

}

/* ===========================
   Startup
=========================== */

window.products = {};
window.sales = {};
window.customers = {};
window.expenses = {};
window.tailors = {};
window.factoryItems = {};

loadProductsRealtime();

loadSalesRealtime();

loadCustomersRealtime();

loadExpensesRealtime();

loadTailorsRealtime();

loadFactoryRealtime();

loadSettings();
