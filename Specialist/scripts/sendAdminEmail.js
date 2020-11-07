/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * sendAdminEmail.js:
 * js file that is used by the admin compose screens to send an email.
 * It contains the function for the SEND button.
 */

/*
 * Function that is run when the send button is pressed in the admin compose
 * screen. 
 *
 * no inputs
 *
 * returns N/A
 */ 
function sendAdminEmail() {
    //Checking if the from field is not empty.
    let from = $("#FromDropDown").val(); 
    if (from == null || from.length == 0) {
        alert('"From" field is blank');
        return; //Cancels the sending of the email.
    }

    let to = $("#ToDropDown").val();
    let cc = $("#CcDropDown").val();
    let subject = $("#SubjectTextBox").val();
    let body = $("#BodyTextBox").val();
    
    storeAdminEmailOnServer(to, from, cc, subject, body);
    linkBackAfterSending();
}
/*
 * Function that sends the email to the server and stores it in the database.
 *
 * to = the email's to 
 * from = the email's from
 * cc = the email's cc
 * subject = the email's subject
 * body = the email's body 
 *
 * returns N/A
 */ 
function storeAdminEmailOnServer(to, from, cc, subject, body) {
    var reqInboxJSON = createNameEmailReq(
        STUDENT_INBOX_NAME, 
        createEmailJSON(from, cc, subject, body, "unread", "not urgent")
    );
    var reqSentItemsJSON = createNameEmailReq(
        ADMIN_SENT_ITEMS_NAME, 
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
