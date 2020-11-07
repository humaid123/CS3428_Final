
function viewEmail(i , name) {
    try {
        var json = {"collectionName": name, 
            "index" : i, "fromWhere" : getFromWhere(name)};
        localStorage.setItem("emailToView", JSON.stringify(json));
        linkToCorrectViewPage(name);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}
 
function getFromWhere(name) {
    if (name == STUDENT_INBOX_NAME) return FROM_STUDENT_INBOX;
    else if (name == STUDENT_SENT_ITEMS_NAME) return FROM_STUDENT_SENT_ITEMS;
    else alert("AN ISSUE OCCURED IN getFromWhere().");
}


function linkToCorrectViewPage(name) {
    if (name == STUDENT_SENT_ITEMS_NAME) {
        window.location.href = "viewSent.html";
    } else if (name == STUDENT_INBOX_NAME) {
        window.location.href = "viewInbox.html";
    } else {
        alert("linkToCorrectViewPage malfunction");
    }
}
