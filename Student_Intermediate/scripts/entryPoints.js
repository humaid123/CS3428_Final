
function showNavigation() {
  document.getElementById("Navigation").style.display = "flex";
  document.getElementById('Navigation').style.width = "0%";
  setTimeout(() => {
    document.getElementById('NavigationContent').style.display = "block";
    document.getElementById('Navigation').style.width = "50%";
  }, 50);
}
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

function loadStudentSent() {
  try {
    addSentEmailsFromCollection();
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}
