
/* ==========================
   Navigation
========================== */

function showPage(pageId){

document
.querySelectorAll(".page")
.forEach(page=>{

page.classList.add(
"hidden"
);

});

document
.getElementById(pageId)
.classList.remove(
"hidden"
);

localStorage.setItem(
"lastPage",
pageId
);

}

/* ==========================
   Startup
========================== */

window.onload = ()=>{

let lastPage =
localStorage.getItem(
"lastPage"
);

if(lastPage){

showPage(lastPage);

}else{

showPage(
"dashboard"
);

}

startClock();

};

/* ==========================
   Clock
========================== */

function startClock(){

setInterval(()=>{

let now =
new Date();

let timeText =
now.toLocaleString(
"ar-EG"
);

let el =
document.getElementById(
"liveClock"
);

if(el){

el.innerText =
timeText;

}

},1000);

}

/* ==========================
   Toast
========================== */

function toast(message){

let old =
document.querySelector(
".toast"
);

if(old){

old.remove();

}

let div =
document.createElement(
"div"
);

div.className =
"toast";

div.innerText =
message;

document.body
.appendChild(div);

setTimeout(()=>{

div.remove();

},3000);

}

/* ==========================
   Currency
========================== */

function money(value){

return Number(
value || 0
)
.toLocaleString(
"ar-EG"
)
+
" ج";

}

/* ==========================
   Search
========================== */

function searchProducts(){

let text =
document
.getElementById(
"searchProduct"
)
.value
.toLowerCase();

document
.querySelectorAll(
".productCard"
)
.forEach(card=>{

let name =
card.dataset.name
.toLowerCase();

card.style.display =
name.includes(text)
?
"block"
:
"none";

});

}

/* ==========================
   Barcode Scanner
========================== */

let barcodeBuffer = "";

document.addEventListener(
"keydown",
event=>{

if(event.key==="Enter"){

if(
barcodeBuffer.length
> 4
){

searchByBarcode(
barcodeBuffer
);

}

barcodeBuffer="";

return;

}

barcodeBuffer +=
event.key;

});

function searchByBarcode(
barcode
){

let found =
null;

Object.values(
window.products || {}
)
.forEach(product=>{

if(
product.barcode
===
barcode
){

found =
product;

}

});

if(found){

addToCart(
found.id
);

toast(
"تمت إضافة المنتج"
);

}else{

toast(
"الباركود غير موجود"
);

}

}

/* ==========================
   QR Scanner
========================== */

function openQRScanner(){

toast(
"QR Scanner Ready"
);

}

/* ==========================
   Dashboard
========================== */

function updateDashboard(){

let sales =
getTotalSales();

let profit =
getTotalProfit();

let invoices =
getInvoicesCount();

let low =
getLowStockCount();

let s =
document.getElementById(
"todaySales"
);

let p =
document.getElementById(
"todayProfit"
);

let i =
document.getElementById(
"todayInvoices"
);

let l =
document.getElementById(
"lowStock"
);

if(s){

s.innerText =
money(sales);

}

if(p){

p.innerText =
money(profit);

}

if(i){

i.innerText =
invoices;

}

if(l){

l.innerText =
low;

}

}

/* ==========================
   Local Cache
========================== */

function saveCache(){

localStorage.setItem(

"productsCache",

JSON.stringify(
window.products
)

);

localStorage.setItem(

"salesCache",

JSON.stringify(
window.sales
)

);

}

function loadCache(){

let products =

localStorage.getItem(
"productsCache"
);

let sales =

localStorage.getItem(
"salesCache"
);

if(products){

window.products =
JSON.parse(products);

}

if(sales){

window.sales =
JSON.parse(sales);

}

}

/* ==========================
   Auto Backup
========================== */

setInterval(()=>{

saveCache();

console.log(
"Backup Saved"
);

},60000);

/* ==========================
   Session
========================== */

let currentUser = {

name:"مدير",

role:"admin"

};

function logout(){

localStorage.clear();

location.reload();

}

/* ==========================
   Mobile Cards
========================== */

function createMobileCard(
title,
value
){

return `

<div class="mobileCard">

<h3>

${title}

</h3>

<p>

${value}

</p>

</div>

`;

}

/* ==========================
   Theme
========================== */

function toggleTheme(){

document.body
.classList.toggle(
"lightTheme"
);

}

/* ==========================
   Export JSON
========================== */

function exportData(){

let data = {

products:
window.products,

sales:
window.sales,

customers:
window.customers,

expenses:
window.expenses,

tailors:
window.tailors

};

let blob =

new Blob(

[
JSON.stringify(
data,
null,
2
)
],

{
type:
"application/json"
}

);

let a =
document.createElement(
"a"
);

a.href =
URL.createObjectURL(
blob
);

a.download =
"TAL3A_BACKUP.json";

a.click();

toast(
"تم تصدير نسخة احتياطية"
);

}

/* ==========================
   Import JSON
========================== */

function importData(
event
){

let file =
event.target.files[0];

if(!file)
return;

let reader =
new FileReader();

reader.onload =
function(e){

let data =
JSON.parse(
e.target.result
);

console.log(data);

toast(
"تم استيراد البيانات"
);

};

reader.readAsText(
file
);

}

/* ==========================
   Online Check
========================== */

window.addEventListener(
"online",
()=>{

toast(
"تم الاتصال"
);

});

window.addEventListener(
"offline",
()=>{

toast(
"لا يوجد اتصال"
);

});

/* ==========================
   Helpers
========================== */

function generateId(){

return

"ID_" +

Math.random()
.toString(36)
.substring(2,10)

+

Date.now();

}
