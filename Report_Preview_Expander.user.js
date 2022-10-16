// ==UserScript==
// @name        Report Preview Expander
// @namespace   Stanscript
// @description Expands Report Preview window
// @include     *dms/inboxManage.do?method=prepareForIndexPage&providerNo*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
//========Buttons============
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'AUTO-EXPAND';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:10px;position:fixed;top:20px;left:190px;color:green;');
input1.setAttribute('title', 'for use in Preview mode');
document.body.appendChild(input1);
function ButtonFunction1() {
  $('#docViews') .scrollTop(20000);
  setTimeout(function () {
    $('#docViews') .scrollTop(40000);
  }, 1000);
  setTimeout(function () {
    $('#docViews') .scrollTop(60000);
  }, 1500);
  setTimeout(function () {
    $('#docViews') .scrollTop(80000);
  }, 2000);
   setTimeout(function () {
    $('#docViews') .scrollTop(0);
  }, 2500);
  
}
