// ==UserScript==
// @name         RecNet Pie Chart & Top Seller Extension
// @version      2.0.0
// @description  Adds a simple doughnut chart and best selling Keys, Consumables, and Currency fields to https://rec.net/stats
// @author       Legacy#9998 https://rec.net/user/L
// @match        https://rec.net/stats
// @icon         https://rec.net/favicon.ico
// @require      https://cdn.plot.ly/plotly-2.18.0.min.js
// @grant        GM.xmlHttpRequest
// ==/UserScript==
window.addEventListener("load", (event) => {
setTimeout(addHTML, 1200)
});
function addHTML() {
var newHTML = document.createElement('div');
newHTML.innerHTML = `
<style>
.nameStyle {
color: #393939;
overflow: hidden;
font-size: 1.5em;
font-weight: 500;
font-family: "Roboto", "Helvetica", "Arial", sans-serif;
white-space: nowrap;
margin-bottom: 10px;
text-overflow: ellipsis;
}
.titleStyle {
width: auto;
color: #393939;
font-size: 1em;
font-weight: 300;
font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
.wrapper {
width: 100%;
overflow: hidden; /* add this to contain floated children */
}
.first {
width: 75%;
float:left; /* add this */
}
.second {
float: left; /* add this */
padding-top: 2.7%;
}
</style>
<div class="wrapper">
<div class="first">
<div class="titleStyle" id='chartDiv'></div>
</div>
<div class="second">
<span class="titleStyle">Top Earning Key</span>
<div id="keyName" class="nameStyle"></div>
<span class="titleStyle">Top Earning Currency</span>
<div id="currencyName" class="nameStyle"></div>
<span class="titleStyle">Top Earning Consumable</span>
<div id="consumableName" class="nameStyle"></div>
</div>
</div>
`;
var infoBody = document.getElementsByClassName("jss20 jss59 jss105")
var infoBodyGetLast = infoBody[infoBody.length - 1];
infoBodyGetLast.appendChild(newHTML);
getKeySalesData()
}
function getKeySalesData(keyEarnedCombinedOut, bestSellingKey) {
var auth_storage = JSON.parse(localStorage.getItem("oidc.user:https://auth.rec.net:recnet"))
var acc_token = "Bearer " + auth_storage['access_token']
GM.xmlHttpRequest({
method: "GET",
url: "https://econ.rec.net/api/stats/roomkeys",
headers: {
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
"Authorization": acc_token
},
onload: function(response) {
const keyOutputJSON = JSON.parse(response.responseText)
var keyEarnedCombinedOut = 0
var bestSellingKey = "";
for (var i = 0; i < keyOutputJSON.length; i++) {
if (keyOutputJSON[i].NumTokensEarned>bestSellingKey) {
bestSellingKey = keyOutputJSON[i].KeyName;
}
keyEarnedCombinedOut += parseInt(keyOutputJSON[i].NumTokensEarned) + parseInt(keyOutputJSON[i].NumTokensPending);
}
getCurrencySalesData(keyEarnedCombinedOut, bestSellingKey)
}
});
}
function getCurrencySalesData(keyEarnedCombinedOut, bestSellingKey) {
var auth_storage = JSON.parse(localStorage.getItem("oidc.user:https://auth.rec.net:recnet"))
var acc_token = "Bearer " + auth_storage['access_token']
GM.xmlHttpRequest({
method: "GET",
url: "https://econ.rec.net/api/stats/currencyPurchaseOffers",
headers: {
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
"Authorization": acc_token
},
onload: function(response) {
const currencyOutputJSON = JSON.parse(response.responseText)
var currencyEarnedCombinedOut = 0
var bestSellingCurrency = "";
for (var i = 0; i < currencyOutputJSON.length; i++) {
if (currencyOutputJSON[i].NumTokensEarned>bestSellingCurrency) {
bestSellingCurrency = currencyOutputJSON[i].CurrencyName;
}
currencyEarnedCombinedOut += parseInt(currencyOutputJSON[i].NumTokensEarned) + parseInt(currencyOutputJSON[i].NumTokensPending);
}
getConsumablesSalesData(keyEarnedCombinedOut, bestSellingKey, currencyEarnedCombinedOut, bestSellingCurrency)
}
});
}
function getConsumablesSalesData(keyEarnedCombinedOut, bestSellingKey, currencyEarnedCombinedOut, bestSellingCurrency) {
var auth_storage = JSON.parse(localStorage.getItem("oidc.user:https://auth.rec.net:recnet"))
var acc_token = "Bearer " + auth_storage['access_token']
GM.xmlHttpRequest({
method: "GET",
url: "https://econ.rec.net/api/stats/roomConsumables",
headers: {
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
"Authorization": acc_token
},
onload: function(response) {
const consumableOutputJSON = JSON.parse(response.responseText)
var consumableEarnedCombinedOut = 0
var bestSellingConsumable = "";
for (var i = 0; i < consumableOutputJSON.length; i++) {
if (consumableOutputJSON[i].NumTokensEarned>bestSellingConsumable) {
bestSellingConsumable = consumableOutputJSON[i].ConsumableName;
}
consumableEarnedCombinedOut += parseInt(consumableOutputJSON[i].NumTokensEarned) + parseInt(consumableOutputJSON[i].NumTokensPending);
}
doPlot(keyEarnedCombinedOut, bestSellingKey, currencyEarnedCombinedOut, bestSellingCurrency, consumableEarnedCombinedOut, bestSellingConsumable)
}
});
}
function doPlot(keyEarnedCombinedOut, bestSellingKey, currencyEarnedCombinedOut, bestSellingCurrency, consumableEarnedCombinedOut, bestSellingConsumable) {
var list = document.getElementsByClassName("jss20 jss59");
var total = list[14].innerText.split(',').join('')
var totalPending = list[16].innerText.split(',').join('')
var totalCombined = parseInt(total) + parseInt(totalPending)
var ITE = list[29].innerText.split(',').join('')
var ITP = list[31].innerText.split(',').join('');
var inventionsCombined = parseInt(ITE) + parseInt(ITP)
var CSTE = list[34].innerText.split(',').join('');
var CSTP = list[36].innerText.split(',').join('');
var shirtsCombined = parseInt(CSTE) + parseInt(CSTP)
var data = [{
values: [inventionsCombined, shirtsCombined, keyEarnedCombinedOut, currencyEarnedCombinedOut, consumableEarnedCombinedOut],
labels: ['Inventions', 'Shirts', 'Keys', 'Currency', 'Consumables' ],
domain: {column: 0},
textinfo: "label+percent",
insidetextorientation: "radial",
hole: .4,
type: 'pie'
}]
var layout = {
title: 'Token Distrubution by Type',
height: 400,
width: 600,
showlegend: false,
grid: {rows: 1, columns: 1}
};
document.getElementById("keyName").innerHTML = bestSellingKey
document.getElementById("currencyName").innerHTML = bestSellingCurrency
document.getElementById("consumableName").innerHTML = bestSellingConsumable
Plotly.newPlot('chartDiv', data, layout)
}