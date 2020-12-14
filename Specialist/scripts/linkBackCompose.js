//Commenting: Adam Taylor
/**
 * Function prompts user to confirm cancelation.
 */
function cancel() {
  var ans = confirm("Are you sure you want to cancel?");
  if (ans == true) {
    window.history.back();
  }
}
/**
 * Function returns user to previous page after sending message..
 */
function linkBackAfterSending() {
  window.history.back();
}
