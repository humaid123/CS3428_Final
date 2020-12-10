function linkBackViewSent() {
  try {
    window.history.back();
    localStorage.removeItem("emailToView"); //Removes side effects
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

function linkBackViewInbox() {
  try {
    window.history.back();
    localStorage.removeItem("emailToView");
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

const VIEW_DIVS = ["Cc", "Subject", "Body", "From", "To"];

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

function reply() {
  window.location.href = "../ComposeScreens/studentCompose.html";
}
