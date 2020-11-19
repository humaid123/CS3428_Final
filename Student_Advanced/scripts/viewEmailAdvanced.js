function viewEmail(i, isInbox) {
  document.getElementById("ViewingEmail").style.display = "block";
  viewEmailFromServer(isInbox, i, (err, result) => {
    if (err) {
      alert("could not fetch email.\nError: " + err.message);
    } else {
      changeEmailToReadClasses(i);
      fillTextBoxes(result.requestedEmail, isInbox);
    }
  });
}

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
