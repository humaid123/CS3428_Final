


function linkStudentSent() {
    window.location.href = "sentItems.html";
}

function linkStudentCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);
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

function loadStudentInbox() {
    try {
        addInboxEmailsFromCollection();
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}


function linkInbox() {
    window.location.href = "inbox.html";
}


function loadStudentSent() {
    try {
        addSentEmailsFromCollection();
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}
