
function sendStudentEmail() {
    for (const divId in DIVS) {
        let correct = document.getElementById(divId + "Correct");
        if (correct.className == "notAllTicked") {
            alert("cannot send as you have not checked everything for: " + divId);
            return;
        }
    }
    let to = $("#ToDropDown").val();
    let cc = $("#CcDropDown").val();
    let subject = $("#SubjectTextBox").val();
    let greeting = $("#GreetingTextBox").val();
    let body = $("#BodyTextBox").val();
    let closure = $("#ClosureTextBox").val();
    body = greeting + "\n" + body + "\n" + closure;
    console.log({email: {to, cc, subject, body}});

    storeStudentEmailOnServer(to, cc, subject, body);
    linkBackAfterSending();
}

 
function storeStudentEmailOnServer(to, cc, subject, body) {
    var reqInboxJSON = createNameEmailReq(
        ADMIN_INBOX_NAME,
        createEmailJSON(STUDENT_EMAIL, cc, subject, body, "unread", "not urgent")
    );
    var reqSentItemsJSON = createNameEmailReq(
        STUDENT_SENT_ITEMS_NAME,
        createEmailJSON(to, cc, subject, body, "read", "not urgent")
    );
    callPostForSendingEmails(reqInboxJSON, reqSentItemsJSON);
}
function createNameEmailReq(name, emailJSON) {
    return {"collectionName":name, "newEmail":emailJSON};
}

 
function callPostForSendingEmails(reqInboxJSON, reqSentItemsJSON) {
    if (DEBUG) {
        alert("reqInboxJSON.collectionName: " + reqInboxJSON.collectionName
            + "\nreqSentItemsJSON.collectionName: " 
            + reqSentItemsJSON.collectionName);
    }
    $.post(SERVER_URL + '/storeEmailToInboxJSON', reqInboxJSON,
        runAfterStoringInbox).fail(runIfFailStoring);
    $.post(SERVER_URL + '/storeEmailToSentJSON', reqSentItemsJSON,
        runAfterStoringSent).fail(runIfFailStoring);

    function runAfterStoringInbox(data) {
        if (DEBUG) alert(data.message);
    }

    function runAfterStoringSent(data) {
        if (DEBUG) alert(data.message);
    }

    function runIfFailStoring(err) {
        if (DEBUG) alert("error in storing an email");
    }
}


function createEmailJSON (partner, cc, subject, emailText, 
    read, urgency) {
    return {"conversationPartner" : partner, "cc" : cc, 
            "subject" : subject, "emailText" : emailText, 
            "read" : read, "urgency" : urgency};
}
