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

function loadInboxEmails() {
  addInboxEmailsFromCollection();
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
  addSentEmailsFromCollection();
}

function linkCompose() {
  window.location.href = "../ComposeScreens/studentCompose.html";
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
