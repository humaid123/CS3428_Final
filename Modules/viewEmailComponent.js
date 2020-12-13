

/*This function sends the user back from viewing a sent item to the last page they visited
Written by Caitlin Maillet*/
function linkBackViewSent() {
  try {
    window.history.back();
    localStorage.removeItem("emailToView"); //Removes side effects
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

/*This function sends the user back from viewing an inbox item to the last page they visited
Written by Caitlin Maillet*/
function linkBackViewInbox() {
  try {
    window.history.back();
    localStorage.removeItem("emailToView"); //Removes side effects
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}
/* Constants for each part of the email */
const VIEW_DIVS = ["Cc", "Subject", "Body", "From", "To"];

/*Enables hidden divs that can be clicked to show hints
Written by Caitlin Maillet*/
function turnOnHidden(div) {
  for (const curr_div of VIEW_DIVS) {
    if (curr_div == div) {
      document.getElementById(div + "Hidden").style.height = "0px";
      document.getElementById(div + "Hidden").style.display = "block";
      setTimeout(() => {
        document.getElementById(div + "Hidden").style.height = "150px";
      }, 50);
    } else {
      const elem = document.getElementById(curr_div + "Hidden");
      if (elem) {
        elem.style.height = "0px";
        setTimeout(() => {
          elem.style.display = "none";
        }, 400);
      }
    }
  }
}

/*This function checks if an email exists in the database, and then calls a method to fill in the fields
Written by Caitlin Maillet */
function fillTextBoxes() {
  var isInbox = JSON.parse(localStorage.getItem("emailToView")).isInbox;
  var index = JSON.parse(localStorage.getItem("emailToView")).index;
  viewEmailFromServer(isInbox, index, (err, result) => {
    if (err) {
      alert("could not find email.\nError: " + err.message);
    } else {
      useEmailToFillTextBoxes(result.requestedEmail, isInbox);
    }
  });
}

/*This function fills the text boxes with the info from the correct email
Written by Caitlin Maillet*/
function useEmailToFillTextBoxes(email, isInbox) {
  if (isInbox) {
    $("#partnerTextBox").val(email.from);
  } else {
    $("#partnerTextBox").val(email.to);
  }
  $("#CcTextBox").val(email.cc);
  $("#SubjectTextBox").val(email.subject);
  $("#BodyTextBox").val(email.body);
}

/*When the reply button is clicked, send student to the compose screen
Written by Caitlin Maillet*/
function reply() {
  window.location.href = "../ComposeScreens/studentCompose.html";
}
