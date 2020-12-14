//Commenting: Adam Taylor

//Declaring global variables and constants
let DIVS = {
  Cc: { hints: ["Are there other people you want to send the email to?"] },
  Subject: { hints: ["What is this email about?"] },
  Body: { hints: ["Here is where you write what you want to say."] },
  Who: {
    hints: ["Says who you wrote this email to OR who sent you this email."],
  },
};
const VIEW_DIVS = ["Cc", "Subject", "Body", "Who"];

/**
 * Hides the specified div element.
 * @param {*} div value of div's id attribute.
 */
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

/**
 * Loads the page.
 */
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

/**
 * Displays the list of recieved emails.
 */
function loadInboxEmails() {
  addInboxEmailsFromCollection();
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "none";
  }
}

/**
 * Displays the list of sent emails.
 */
function loadSentEmails() {
  addSentEmailsFromCollection();
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "none";
  }
}

/**
 * Displays compose page.
 */
function linkCompose() {
  window.location.href = "./adminCompose.html";
}

/**
 * Display delete accounts page.
 */
function deleteAccounts() {
  window.location.href = "./deleteAccounts.html";
}

/**
 * Displays the office.
 */
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

/**
 * Closes/hides the office display when it's close button is clicked.
 */
function closeOfficeButtons() {
  document.getElementById("Navigation").style.width = "0%";
  document.getElementById("NavigationContent").style.display = "none";
}

/**
 * Closes the viewEmail object.
 */
function closeViewEmail() {
  document.getElementById("ViewingEmail").style.width = "0%";
  document.getElementById("ViewingEmail").style.display = "none";
}

/**
 * Displays the viewEmail object and call viewEmailFromServer to
 * display information from email.
 * @param {*} i index value of email
 * @param {*} isInbox "from" or "to"
 */
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

/**
 * Changes the unread status of the email to read.
 * @param {*} i index value of email
 */
function changeEmailToReadClasses(i) {
  let email = document.getElementById("email" + i);
  let classNames = email.className;
  email.className = classNames.replace("unread", "read");

  let emailTwoButtons = document.getElementById("emailTwoButtons" + i);
  let buttonClassNames = emailTwoButtons.className;
  emailTwoButtons.className = buttonClassNames.replace("unread", "read");
}

/**
 * Fills out the fields of the text boxes with the email's corresponding data.
 * @param {*} email email to be viewed
 * @param {*} isInbox "from" or "to"
 */
function fillTextBoxes(email, isInbox) {
  const partner = isInbox ? "from" : "to";
  $("#WhoTextBox").val(email[partner]);
  $("#CcTextBox").val(email.cc);
  $("#SubjectTextBox").val(email.subject);
  $("#BodyTextBox").val(email.body);
}
