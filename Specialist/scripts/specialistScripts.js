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
      document.getElementById(div + "Hidden").style.display = "block";
    } else {
      document.getElementById(curr_div + "Hidden").style.display = "none";
    }
  }
}

function loadPage() {
  addInboxEmailsFromCollection();
  for (const div in DIVS) {
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
function loadInboxEmails() {
  addInboxEmailsFromCollection();
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "none";
  }
}

function loadSentEmails() {
  addSentEmailsFromCollection();
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "none";
  }
}

function linkCompose() {
  window.location.href = "./adminCompose.html";
}
function deleteAccounts() {
  window.location.href = "./deleteAccounts.html";
}
function showOffice() {
  document.getElementById("Navigation").style.display = "flex";
}
function closeOfficeButtons() {
  document.getElementById("Navigation").style.display = "none";
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
