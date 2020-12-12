/*Commenting: Lydia Belachew (A00416825) */

/*This functions displays the navigation sidebar of the in 50sec*/
function showNavigation() {
  document.getElementById("Navigation").style.display = "flex";
  document.getElementById('Navigation').style.width = "0%";
  setTimeout(() => {
    document.getElementById('NavigationContent').style.display = "block";
    document.getElementById('Navigation').style.width = "50%";
  }, 50);
}

//This function is responsible for closing the navigation sidebar
function closeNavigation() {
  document.getElementById('Navigation').style.width = "0%";
  document.getElementById('NavigationContent').style.display = "none";
}
function linkStudentSent() {
  window.location.href = "sentItems.html";
}

function linkStudentCompose() {
  window.location.href = "../ComposeScreens/studentCompose.html";
}

/*This function loads the student inbox with emails from collection. An error message will appeear if it fails
to load the emails. */
function loadStudentInbox() {
  try {
    addInboxEmailsFromCollection();
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

function linkInbox() {
  window.location.href = "inbox.html";
}

/*This function loads the student inbox with sent emails from collection. An error message will appeear if it 
fails to load the sent emails. */
function loadStudentSent() {
  try {
    addSentEmailsFromCollection();
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}
