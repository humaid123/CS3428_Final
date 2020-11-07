function loadInboxEmails() {
        addInboxEmailsFromCollection(ADMIN_INBOX_NAME);
        for (const div in DIVS) {
        console.log(div);
        hints = DIVS[div].hints;
        res = "";
        for (hint of hints) {
            res += `<li>${hint}</li>`; 
        }
        let list = document.getElementById(div + "HintList")
        if (list != null) {
            list.innerHTML = res;
        }
    }
    }
    function loadSentEmails() {
        addSentEmailsFromCollection(ADMIN_SENT_ITEMS_NAME);
    }
    function linkCompose() {
        window.location.href = "adminCompose.html";
    }
    function showHelp() {
        window.open("../Helps/MainHelp.html", "MsgWindow", SPECS)
    }
function showOffice() {
    document.getElementById("Navigation").style.display = "flex";
}
function closeOfficeButtons() {
    document.getElementById("Navigation").style.display = "none";
}
    let DIVS = {
         "Cc": {hints: ["Are there other people you want to send the email to?"]},
        "Subject": {hints: ["What is this email about?"]}, 
        "Body": {hints: ["Here is where you write what you want to say."]},
        "Who": {hints: ["Says who you wrote this email to OR who sent you this email."]}
    };
function turnOnHidden(div) {
    for (const curr_div in DIVS) {
        if (curr_div == div) {
            console.log(div);
            document.getElementById(div + "Hidden").style.display = "block";
        } else {
            document.getElementById(curr_div + "Hidden").style.display = "none";
        }
    }
}
function closeViewEmail() {
    document.getElementById("ViewingEmail").style.display = "none";
}

function viewEmail(i, name) {
    getEmailJSONFromServer(
        createViewRequest(name, i)
    );
        document.getElementById("ViewingEmail").style.display = "block";
    let email = document.getElementById("email" + i);
    let classNames = email.className.split(" ");
    if (classNames[1] == "unreadUrgentRow") {
        email.className = classNames[0] + " readUrgentRow";
    } else {
        email.className = classNames[0] + " readRow";
    }

    let emailTwoButtons = document.getElementById("emailTwoButtons" + i);
    let buttonClassNames = emailTwoButtons.className.split(" ");
    if (buttonClassNames[1] == "unreadUrgentTwoButtons") {
        emailTwoButtons.ClassName = buttonClassNames[0] + " readUrgentTwoButtons";
    } else {
        emailTwoButtons.ClassName = buttonClassNames[0] + " readTwoButtons";
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
        $("#WhoTextBox").val(email.conversationPartner);
        $("#CcTextBox").val(email.cc);
        $("#SubjectTextBox").val(email.subject);
        $("#BodyTextBox").val(email.emailText);
    }

    function errorFunction (err) {
        alert("server error in viewing an email.");
    }
}
