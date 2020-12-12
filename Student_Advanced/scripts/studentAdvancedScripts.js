//Commenting: Lydia Belachew (A00416825)

//DIVS is a JSON array of hints for each component of an email
let DIVS = {
  Cc: { hints: ["Are there other people you want to send the email to?"] },
  Subject: { hints: ["What is this email about?"] },
  Body: { hints: ["Here is where you write what you want to say."] },
  Who: {
    hints: ["Says who you wrote this email to OR who sent you this email."],
  },
};

//VIEW_DIVS is an array
const VIEW_DIVS = ["Cc", "Subject", "Body", "Who"];

/*This function is responsible for hiding and showing the hints. Also, does the animation
of the sidebar.*/
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

/*This function calls addInboxEmailsFromCollection() and stores the hints as a list */
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

/*This function calls the addInboxEmailsFromCollection() function. When the page 
frame is less than 1000 it does not display the navigation sidebar. */
function loadInboxEmails() {
  addInboxEmailsFromCollection();
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "none";
  }
}

/*This function calls the addSentEmailsFromCollection() function. When the page
frame is less than 1000 it does not display the naviagtion sidear. */
function loadSentEmails() {
  addSentEmailsFromCollection();
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "none";
  }
}

function linkCompose() {
  window.location.href = "../ComposeScreens/studentCompose.html";
}

//This function displays the sidebar in 50sec
function showOffice() {
  if (window.innerWidth < 1000) {
    document.getElementById("Navigation").style.display = "flex";
  }
  document.getElementById("Navigation").style.width = "0%";
  setTimeout(() => {
    document.getElementById("NavigationContent").style.display = "block";
    document.getElementById("Navigation").style.width = "60%";
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
