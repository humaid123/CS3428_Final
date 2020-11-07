
function cancel() {
    var ans = confirm("Are you sure you want to cancel?");
    if (ans == true) {
        window.history.back();
    }
}
 
function linkBackAfterSending() {
    window.history.back();
}
