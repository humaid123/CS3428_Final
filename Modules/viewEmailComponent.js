function linkBackViewSent() {
  try {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (DEBUG) {
      alert("BACKING. fromWhere: " + fromWhere);
    }
    changeWindowRefForBacking(fromWhere);
    localStorage.removeItem("emailToView"); //Removes side effects
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

function changeWindowRefForBacking(fromWhere) {
  if (fromWhere == FROM_STUDENT_SENT_ITEMS) {
    window.location.href = "sentItems.html";
  } else if (fromWhere == FROM_STUDENT_INBOX) {
    window.location.href = "inbox.html";
  }
}

function linkBackViewInbox() {
  try {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (DEBUG) {
      alert("BACKING. fromWhere: " + fromWhere);
    }
    changeWindowRefForBacking(fromWhere);
    localStorage.removeItem("emailToView");
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

const VIEW_DIVS = ["Cc", "Subject", "Body", "From", "To"];

function turnOnHidden(div) {
  for (const curr_div of VIEW_DIVS) {
    if (curr_div == div) {
      document.getElementById(div + "Hidden").style.display = "block";
    } else {
      document.getElementById(curr_div + "Hidden").style.display = "none";
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
  try {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    setUpLinkBackJSON(fromWhere);
    window.location.href = "../ComposeScreens/studentCompose.html";
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

function setUpLinkBackJSON(fWhere) {
  var json = { fromWhere: fWhere };
  localStorage.setItem("fromWhere", JSON.stringify(json));
}
