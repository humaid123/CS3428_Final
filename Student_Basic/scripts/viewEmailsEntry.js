function viewEmail(i, isInbox) {
  try {
    var json = { isInbox, index: i };
    localStorage.setItem("emailToView", JSON.stringify(json));
    linkToCorrectViewPage(isInbox);
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

function linkToCorrectViewPage(isInbox) {
  if (isInbox) {
    window.location.href = "viewInbox.html";
  } else {
    window.location.href = "viewSent.html";
  }
}
