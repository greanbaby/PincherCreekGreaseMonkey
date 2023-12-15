// ==UserScript==
// @name     LABS_ALL
// @namespace ScottyG
// @description Add button for lab preview to open all
// @include  *dms/inboxManage.do* 
// @version  0.4
// @grant    none
// ==/UserScript==

/**
* @author Scott Gingras Dec.5 2023
*/

// GLOBALS: 
const button = document.createElement( 'button' ),
    origin = window.location.origin,
    labsOpened = [],
    juno = "/juno"

// Wait for page load 
document.onreadystatechange = function () {
    if ( document.readyState == "complete" ) {
        crankUp()
    }
}

/** crankUp()
 * This is the main function creating the button 
 */ 
function crankUp() {
    addButton()
}

/** addButton()
 * This function will add a button to the browser window
 * which will open all lab versions in a new tab
 */
function addButton() {
    button.id = 'scottygbutton'
    button.style.position = 'fixed'
    button.style.top = '99px'
    button.style.right = '30'
    button.style.width = '18%'
    button.style.height = '30px'
    button.style.backgroundColor = 'rgba(0,0,0,0.5)'
    button.style.zIndex = '9999'
    button.style.color = 'white'
    button.style.padding = '4px'
    button.style.overflow = 'auto'
    button.innerHTML = 'LABS_ALL'
    document.body.appendChild( button )
    button.addEventListener( 'click', labOpenAll )
}

function labOpenAll() {
    // Get "Field2" class elements which contain the lab version links
    const field2 = document.getElementsByClassName( "Field2" )

    // exit function if no "Field2" class elements are found
    if ( field2.length === 0 ) {
        alert( 'No labs found' )
        return
    }

    let divhtml = "",
        divElement = null

    for ( let i = 0; i < field2.length; i++ ) {
        if ( field2[i].tagName === "DIV" ) {
            divhtml = field2[ i ].innerHTML
            if ( divhtml.indexOf( "Version:" ) !== -1 ) {
        
                // alert( "L A B   V E R S I O N S   D E T E C T E D" );

                divElement = field2[ i ]
                const aElements = divElement.getElementsByTagName( "a" )

                // open every lab version in a new tab with the All link
                for ( let i = 0; i < aElements.length; i++ ) {

                    if ( aElements[ i ].innerHTML === "All" ) {

                        // get the text of the onClick attribute
                        const onClick = aElements[ i ].getAttribute( "onClick" ),

                        // get the position of the first single quote
                            firstQuote = onClick.indexOf( "'" ),
                        
                        // get the position of the second single quote
                            secondQuote = onClick.indexOf( "'", firstQuote + 1 ),
                        
                        // get the substring between the quotes
                            url = onClick.substring( firstQuote + 3, secondQuote ),
                        
                        // fullUrl = origin + url
                            fullUrl = origin + juno + url

                        // if fullUrl is not already in the labsOpened array
                        // then open it in a new tab and add it to the array
                        if ( labsOpened.includes( fullUrl ) ) {
                            // do nothing
                        } else {
                            labsOpened.push( fullUrl )
                            window.open( fullUrl, "_blank" )
                        }
                    }
                }
            }
        }
    }
}
