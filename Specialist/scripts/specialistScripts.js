let DIVS = {
  Cc: { hints: ["Are there other people you want to send the email to?"] },
  Subject: { hints: ["What is this email about?"] },
  Body: { hints: ["Here is where you write what you want to say."] },
  Who: {
    hints: ["Says who you wrote this email to OR who sent you this email."],
  },
};
const VIEW_DIVS = ["Cc", "Subject", "Body", "Who"];

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
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "flex";
  }
  document.getElementById("Navigation").style.width = "0%";
  setTimeout(() => {
    document.getElementById("NavigationContent").style.display = "block";
    document.getElementById("Navigation").style.width = "50%";
  }, 50);
}
function closeOfficeButtons() {
  document.getElementById("Navigation").style.width = "0%";
  document.getElementById("NavigationContent").style.display = "none";
}
function closeViewEmail() {
  document.getElementById("ViewingEmail").style.width = "0%";
  document.getElementById("ViewingEmail").style.display = "none";
}

function viewEmail(i, isInbox) {
  if (
    document.getElementById("ViewingEmail").style.display == "none" ||
    window.innerWidth < 1000
  ) {
    document.getElementById("ViewingEmail").style.width = "0%";
    document.getElementById("ViewingEmail").style.display = "block";
    setTimeout(() => {
      document.getElementById("ViewingEmail").style.width = "100%";
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
