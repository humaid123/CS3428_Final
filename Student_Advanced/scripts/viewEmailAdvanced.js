//Commenting: Lydia Belachew 

/*This function is responsible for displaying the email. Displays the view email in 50sec.
If the email can not be viewed, then an error message is displayed.  */
function viewEmail(i, isInbox) {
  if (document.getElementById('ViewingEmail').style.display == "none" || window.innerWidth < 1000) {
    document.getElementById("ViewingEmail").style.width = "0%";
    document.getElementById('ViewingEmail').style.display = "block";
    setTimeout(() => {
      document.getElementById('ViewingEmail').style.width = "100%";
    }, 50);
  }
  viewEmailFromServer(isInbox, i, (err, result) => {
    if (err) {
      alert("could not fetch email.\nError: " + err.message);
    } else {
      changeEmailToReadClasses(i);
      fillTextBoxes(result.requestedEmail, isInbox);
    }
  });
}

/*This function is repsonisble for chnaging an email from unread to read. */
function changeEmailToReadClasses(i) {
  let email = document.getElementById("email" + i);
  let classNames = email.className;
  email.className = classNames.replace("unread", "read");

  let emailTwoButtons = document.getElementById("emailTwoButtons" + i);
  let buttonClassNames = emailTwoButtons.className;
  emailTwoButtons.className = buttonClassNames.replace("unread", "read");
}

function fillTextBoxes(email, isInbox) {
  const partner = isInbox ? "from" : "to";
  $("#WhoTextBox").val(email[partner]);
  $("#CcTextBox").val(email.cc);
  $("#SubjectTextBox").val(email.subject);
  $("#BodyTextBox").val(email.body);
}
