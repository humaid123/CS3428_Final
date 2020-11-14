function linkStudentSent() {
    window.location.href = "sentItems.html";
}


function linkStudentCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);
        setUpCheckBoxesJSON(false);
        window.location.href = "../ComposeScreens/studentCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}


function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    if (DEBUG) {
        alert(json.fromWhere);
    }
    localStorage.setItem("fromWhere", JSON.stringify(json))
}

function setUpCheckBoxesJSON(load) {
    var json = {"loadCheckBox" : load};
    if (DEBUG) {
        alert(json.loadCheckBox);
    }
    localStorage.setItem("loadCheckBox", JSON.stringify(json))
}

function loadStudentInbox() {
    try {
        addInboxEmailsFromCollection(STUDENT_INBOX_NAME);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}


function linkInbox() {
    window.location.href = "inbox.html";
}


function loadStudentSent() {
    try {
        addSentEmailsFromCollection(STUDENT_SENT_ITEMS_NAME);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}
