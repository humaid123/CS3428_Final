function loadInboxEmails() {
  addInboxEmailsFromCollection(ADMIN_INBOX_NAME);
  for (const div in DIVS) {
    console.log(div);
    hints = DIVS[div].hints;
    res = "";
    for (hint of hints) {
      res += `<li>${hint}</li>`;
    }
    let list = document.getElementById(div + "HintList");
    if (list != null) {
      list.innerHTML = res;
    }
  }
}
function loadSentEmails() {
  addSentEmailsFromCollection(ADMIN_SENT_ITEMS_NAME);
}
function linkCompose() {
  window.location.href = "adminCompose.html";
}
function showHelp() {
  window.open("../Helps/MainHelp.html", "MsgWindow", SPECS);
}
function showOffice() {
  document.getElementById("Navigation").style.display = "flex";
}
function closeOfficeButtons() {
  document.getElementById("Navigation").style.display = "none";
}
let DIVS = {
  Cc: { hints: ["Are there other people you want to send the email to?"] },
  Subject: { hints: ["What is this email about?"] },
  Body: { hints: ["Here is where you write what you want to say."] },
  Who: {
    hints: ["Says who you wrote this email to OR who sent you this email."],
  },
};
function turnOnHidden(div) {
  for (const curr_div in DIVS) {
    if (curr_div == div) {
      console.log(div);
      document.getElementById(div + "Hidden").style.display = "block";
    } else {
      document.getElementById(curr_div + "Hidden").style.display = "none";
    }
  }
}
function closeViewEmail() {
  document.getElementById("ViewingEmail").style.display = "none";
}

function viewEmail(i, isInbox) {
  document.getElementById("ViewingEmail").style.display = "block";
  viewEmailFromServer(isInbox, i, (err, result) => {
    if (err) {
      alert("could not fetch email.\nError: " + err.message);
    } else {
      changeEmailToReadClasses(i);
      console.log(result);
      fillTextBoxes(result.requestedEmail, isInbox);
    }
  });
}

function changeEmailToReadClasses(i) {
  let email = document.getElementById("email" + i);
  let classNames = email.className.split(" ");
  if (classNames[1] == "unreadUrgentRow") {
    email.className = classNames[0] + " readUrgentRow";
  } else {
    email.className = classNames[0] + " readRow";
  }

  let emailTwoButtons = document.getElementById("emailTwoButtons" + i);
  let buttonClassNames = emailTwoButtons.className.split(" ");
  if (buttonClassNames[1] == "unreadUrgentTwoButtons") {
    emailTwoButtons.ClassName = buttonClassNames[0] + " readUrgentTwoButtons";
  } else {
    emailTwoButtons.ClassName = buttonClassNames[0] + " readTwoButtons";
  }
}

function fillTextBoxes(email, isInbox) {
  console.log("reached fill text boxes: ", email);
  const partner = isInbox ? "from" : "to";
  $("#WhoTextBox").val(email[partner]);
  $("#CcTextBox").val(email.cc);
  $("#SubjectTextBox").val(email.subject);
  $("#BodyTextBox").val(email.body);
}
