
function linkBackViewSent() {
    try {
        var fromWhere = JSON.parse(
                localStorage.getItem("emailToView")
            ).fromWhere;
        if (DEBUG) {
            alert("BACKING. fromWhere: " + fromWhere);
        }
        changeWindowRefForBacking(fromWhere);
        localStorage.removeItem("emailToView"); //Removes side effects
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

function changeWindowRefForBacking(fromWhere) {
    if (fromWhere == FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    } else if (fromWhere == FROM_STUDENT_INBOX) {
        window.location.href = "inbox.html";
    }
}

function linkBackViewInbox() {
    try {
        var fromWhere = JSON.parse(
                localStorage.getItem("emailToView")
            ).fromWhere;
        if (DEBUG) {
            alert("BACKING. fromWhere: " + fromWhere);
        }
        changeWindowRefForBacking(fromWhere);
        localStorage.removeItem("emailToView");
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

const VIEW_DIVS = ["Cc", "Subject", "Body", "From", "To"];


function fillTextBoxes() {
    var name = JSON.parse(localStorage.getItem("emailToView")).collectionName;
    var index = JSON.parse(localStorage.getItem("emailToView")).index;
    getEmailJSONFromServer(
        createViewRequest(name, index)
    );
}


function turnOnHidden(div) {
    for (const curr_div of VIEW_DIVS) {
        if (curr_div == div) {
            document.getElementById(div + "Hidden").style.display = "block";
        } else {
            document.getElementById(curr_div + "Hidden").style.display = "none";
        }
    }
}


function createViewRequest(name, index) {
    return {"collectionName":name, "index":index};
}


function getEmailJSONFromServer(req) {
    $.post(SERVER_URL + '/viewEmail', req, 
        useTheEmailToFillTextBoxes).fail(errorFunction);

    function useTheEmailToFillTextBoxes(data) {
        var email = data.email;
        $("#partnerTextBox").val(email.conversationPartner);
        $("#CcTextBox").val(email.cc);
        $("#SubjectTextBox").val(email.subject);
        $("#BodyTextBox").val(email.emailText);
    }

    function errorFunction (err) {
        alert("server error in viewing an email.");
    }
}


function reply() {
    try {
        setUpLinkBackJSON(fWhere);
        setUpCheckBoxesJSON(true);
        window.location.href = "../ComposeScreens/studentCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere",JSON.stringify(json))
}

function setUpCheckBoxesJSON(load) {
    var json = {"loadCheckBox" : load};
    if (DEBUG) {
        alert(json.loadCheckBox);
    }
    localStorage.setItem("loadCheckBox", JSON.stringify(json))
}
