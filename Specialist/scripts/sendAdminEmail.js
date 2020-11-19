function sendAdminEmail() {
  //Checking if the from field is not empty.
  let from = $("#FromDropDown").val();
  if (from == null || from.length == 0) {
    alert('"From" field is blank');
    return; //Cancels the sending of the email.
  }

  let to = $("#ToDropDown").val();
  let cc_string = $("#CcDropDown").val();
  let subject = $("#SubjectTextBox").val();
  let body = $("#BodyTextBox").val();
  let cc;
  if (cc_string) {
    cc = cc_string.split(" ");
  } else {
    cc = [];
  }

  let newEmail = { to, from, cc, subject, body };
  console.log(newEmail);
  storeNewEmailOnServer(newEmail, (err, result) => {
    if (err) {
      alert("could not send admin email.\nError: " + err.message);
    } else {
      linkBackAfterSending();
    }
  });
}
