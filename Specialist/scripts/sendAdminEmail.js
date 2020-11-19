


function sendAdminEmail() {
    //Checking if the from field is not empty.
    let from = $("#FromDropDown").val(); 
    if (from == null || from.length == 0) {
        alert('"From" field is blank');
        return; //Cancels the sending of the email.
    }

    let to = $("#ToDropDown").val();
    let cc = $("#CcDropDown").val();
    let subject = $("#SubjectTextBox").val();
    let body = $("#BodyTextBox").val();
    let newEmail = {to, from, cc, subject, body};
    storeNewEmailOnServer(newEmail, (err, result) => {
        if (err) {
            alert("could not send admin email.\nError: " err.message);
        } else {
            linkBackAfterSending();
        }
    });
}
