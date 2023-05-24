// ==UserScript==
// @name     FIT Test Prevention Button
// @namespace ScottyG
// @description Adds FIT Prevention button to lab screen when viewing FIT Test Lab Result
// @include  *lab/CA/ALL/labDisplay.jsp*
// @include  *dms/MultiPageDocDisplay.jsp?segmentID*
// @include  *dms/showDocument.jsp?inWindow*
// @version  1.1
// @grant    none
// ==/UserScript==
/**
 * @author Scott Gingras Feb. 2, 2023
 * btnRemind - Only display button if this is a Fecal Immunochemical Test
 */
/**
 * updated Mar 7 2023 to read Demographic differently if not read in URL
 */

const tblDiscs = document.getElementById( 'tblDiscs' ).innerHTML;
if ( tblDiscs.indexOf( 'testName=Fecal Immunochemical Test' ) > -1 ) {
    let btnRemind = document.createElement( 'input' );
    btnRemind.onclick = fncRemindButton;
    btnRemind.setAttribute( 'style', 'font-size:14px; position:absolute; top:50px; right:322px; background-color: aqua;' );
    btnRemind.type = 'button';
    btnRemind.value = 'FIT Prevention';
    document.body.appendChild( btnRemind );
}

/**
 * urlStart - the start of the URL to generate links
 *     for example: "https://location.host.com/pincher/"
 *
 * strPatientDemographicNumber - String containing the patient's demographic num
 */
const a = ( window.location.pathname.split( '/', 2 ) ),
      b = ( a.slice( 1 ) ),
      urlStart = ( 'https://' + location.host + '/' + b + '/' );

let strPatientDemographicNumber = fncPatientDemographicNumberFromURL();


/**
 * If we did not read the demographic number from the URL then attempt to get it off the page
 */
if ( !strPatientDemographicNumber ) {
  const startLoc = tblDiscs.indexOf( 'testName=Fecal Immunochemical Test&amp;demo=' );
  const strEnding = tblDiscs.slice( startLoc + 44 );
  // find first position of &amp;
  // use that as the 2nd param for SLICE (with 0 as first param)
  const ampPosition = strEnding.indexOf( '&amp;' );
  strPatientDemographicNumber = strEnding.slice( 0, ampPosition );
}


/**
 * fncRemindButton - Generate reminder
 * @see btnRemind
 */
function fncRemindButton() {
    if ( strPatientDemographicNumber ) {
        
    const typePrevention = 'FIT';
    window.open( urlStart + 
                'oscarPrevention/AddPreventionData.jsp?prevention=' + typePrevention + 
                '&demographic_no=' + strPatientDemographicNumber, '_blank', 'width=800, height=500' );
    }
}

/**
 * fncPatientDemographicNumberFromURL - Read Patient Demographic Number from URL
 * @returns strPatientDemographicNumber
 */
function fncPatientDemographicNumberFromURL() {    
    const qryString = window.location.search,    
        urlParams = new URLSearchParams( qryString );
    return urlParams.get( 'demographicId' );
}
