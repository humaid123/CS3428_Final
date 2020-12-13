//Commenting: Lydia Belachew (A00416825)

/*This function is resposnible for allowing the user to view the
contents of an email. If an error occurs then a message will be displayed*/
function viewEmail(i, isInbox) {
  try {
    var json = { isInbox, index: i };
    localStorage.setItem("emailToView", JSON.stringify(json));
    linkToCorrectViewPage(isInbox);
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

/*This function is responsible for linking to the correct view page.
If the email is from the inbox, then it goes to the viewInbox page.
Otherwise, the page is the viewSent emails page.*/
function linkToCorrectViewPage(isInbox) {
  if (isInbox) {
    window.location.href = "viewInbox.html";
  } else {
    window.location.href = "viewSent.html";
  }
}
