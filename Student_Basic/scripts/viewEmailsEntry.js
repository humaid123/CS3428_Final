
function viewEmail(i , isInbox) {
    try {
        var json = {isInbox, 
            "index" : i, "fromWhere" : getFromWhere(isInbox)};
        localStorage.setItem("emailToView", JSON.stringify(json));
        linkToCorrectViewPage(isInbox);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}
 
function getFromWhere(isInbox) {
    if (isInbox) {
        return FROM_STUDENT_INBOX;
    } else {
        return FROM_STUDENT_SENT_ITEMS;
    }
}


function linkToCorrectViewPage(isInbox) {
    if (isInbox) {
        window.location.href = "viewInbox.html";
    } else {
        window.location.href = "viewSent.html";
    }
}
