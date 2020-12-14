/*
  Funtion that sends the student email. 
  Is executed when the user clicks the send button in a student system.

  Isaac Cain (A00391748)
*/
function sendStudentEmail() {
  // Iterate over each compose div.
  for (const divId in COMPOSE_DIVS) {
    let correct = document.getElementById(divId + "Correct");
    // Check if every checkbox is ticked in a div. If not:
    if (correct.className == "notAllTicked") {
      // Do not let the user send the email, and tell them which div needs to be checked.
      alert(
        "Cannot send as you have not checked everything for: " + divId + "."
      );
      return;
    }
  }
  let to = $("#ToDropDown").val(); // Store the To data.
  let cc_string = $("#CcDropDown").val(); // Store the Cc data.
  let subject = $("#SubjectTextBox").val(); // Store the Subject data.
  let greeting = $("#GreetingTextBox").val(); // Store the Greeting data.
  let body = $("#BodyTextBox").val(); // Store the Body data.
  let closure = $("#ClosureTextBox").val(); // Store the Closure data.
  // Note: The division into Greeting, Body and Closure is only for teaching the
  //   student how to write a proper email. Therefore, before the email is sent,
  //   all the data is stored in one place, the Body.
  body = greeting + "\n" + body + "\n" + closure;

  let cc;
  // If Cc isn't empty:
  if (cc_string != "") {
    // Split the Cc'ed words (recipients).
    cc = cc_string.split(/\s+/);
  } else {
    // Store in an array.
    cc = [];
  }
  // Join the data together.
  const newEmail = { to, cc, subject, body };
  // Call storeNewEmailOnServer function (in Modules) on the data.
  storeNewEmailOnServer(newEmail, (err, result) => {
    if (err) {
      // Error check.
      alert("Could not send email.\nServer said: " + err.message);
    } else {
      // If sent correctly, let user know.
      alert(result.message);
      // And link back to the page they were at when they clicked Compose.
      linkBackAfterSending();
    }
  });
}
