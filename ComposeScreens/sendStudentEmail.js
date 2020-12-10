function sendStudentEmail() {
  for (const divId in COMPOSE_DIVS) {
    let correct = document.getElementById(divId + "Correct");
    if (correct.className == "notAllTicked") {
      alert(
        "Cannot send as you have not checked everything for: " + divId + "."
      );
      return;
    }
  }
  let to = $("#ToDropDown").val();
  let cc_string = $("#CcDropDown").val();
  let subject = $("#SubjectTextBox").val();
  let greeting = $("#GreetingTextBox").val();
  let body = $("#BodyTextBox").val();
  let closure = $("#ClosureTextBox").val();
  body = greeting + "\n" + body + "\n" + closure;

  let cc;
  if (cc_string != "") {
    cc = cc_string.split(/\s+/);
  } else {
    cc = [];
  }

  const newEmail = { to, cc, subject, body };
  storeNewEmailOnServer(newEmail, (err, result) => {
    if (err) {
      alert("Could not send email.\nServer said: " + err.message);
    } else {
      alert(result.message);
      linkBackAfterSending();
    }
  });
}
