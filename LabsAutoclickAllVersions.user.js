// ==UserScript==
// @name     LabsAutoclickAllVersions
// @namespace ScottyG
// @description Inside labresult look for "Versions" All link beside v1, v2, v3... and force the All to display
// @include  *lab/CA/ALL/labDisplay.jsp*
// @include  *dms/inboxManage.do*
// @version  1.1
// @grant    none
// ==/UserScript==
/**
* @author Scott Gingras May 16, 2023
*
* @modifed Oct 26, 2023 added additional @include and deferred code execution until DOM load
*
* When the current lab is opened, it may not be displaying all of the lab results linked under this
* Accession Number.  If multiple "Version" links are displayed like v1 v2 v3 All then
* we want to force the "All" link to be clicked and followed.
* 
  * "&all=true" added to the end of the URL string and then that URL followed in the case that there are Versions
*/

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    initApplication();
  }
}

function initApplication() {
  // Get "Field2" class elements

  const field2 = document.getElementsByClassName("Field2"); // a list of matching elements, *not* the element itself

  // the only way to find the element we are looking for on the page is to go through all "Field2" class elements
  // and search ONLY DIV elements for the text "Patient Details" which indicates we are in the correct div.
  // This is because the "Field2" class is used in many places on the page.
  let divhtml = "";
  let divElement = null;
  let foundDiv = false;
  for (let i = 0; i < field2.length; i++) {
      if (field2[i].tagName === "DIV") {
          divhtml = field2[i].innerHTML;
          if (divhtml.indexOf("Version:") !== -1) {
              console.log("Found DIV with Versions");
              divElement = field2[i];
              foundDiv = true;
              break;
          }
      }
  }

  // Check the innerHTML of this DIV to see if there are "Versions" or not
  if (!foundDiv) {
      console.log("No Versions Found");
  } else {
      // simply appending "&all=true" to the URL for the window will not work
      // instead we must find the actual "All" href element and use that
      // to navigate to the "All" page
      // use divElement to search for all  elements
      // then search for the one with innerHTML of "All"
      // then get the href attribute from that element
      // then navigate to that href
      const aElements = divElement.getElementsByTagName("a");
      let allHref = "";
      for (let i = 0; i < aElements.length; i++) {
          if (aElements[i].innerHTML === "All") {
              allHref = aElements[i].href;
              break;
          }
      }
      let currentHref = window.location.href;
      if (currentHref.indexOf("&all=true") === -1) {
          window.location.href = allHref;
      }
      
  }
}
