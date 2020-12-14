/* linkBackCompose.js
 *
 * File that contains two functions.
 * The first returns the user to the page where they choose a compose style.
 * The second returns user to page they were at when they clicked
 *    the Compose button.
 * Isaac Cain (A00391748)
 */

/*
  Funtion that prompts the user with a message to ensure they want to cancel.
    If the user confirms, they are taken to the previous page.
    This function appears in studentComposeFormal.html and studentComposeInformal.html.
    It will take them back to studentCompose.html, so they can choose another
      compose style.
  Isaac Cain(a00391748)
 */
function cancel() {
  var ans = confirm("Are you sure you want to cancel?");
  if (ans == true) {
    window.history.back();
  }
}
/*
  Function that returns the user to the page they were at when they clicked Compose.
    It is called once an email it sent.
    It goes back two pages. Going back one page would return the user to the 
      Choosing Compose Style page.
  Isaac Cain (A00391748)
 */
function linkBackAfterSending() {
  window.history.go(-2); // Go back two pages.
}
