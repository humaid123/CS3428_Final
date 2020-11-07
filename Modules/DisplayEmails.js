
function addInboxEmailsFromCollection(collectionName) {
    var req = {"collectionName": collectionName};
    if (DEBUG) {
        alert("inbox collectionName: " + req.collectionName);
    }
    $.post(SERVER_URL + '/displayEmailRows', req,
        displayInboxEmails).fail(runOnAdditionError);
}

 
function displayInboxEmails(data) {
    displayEmails(data, "inbox");
}

function addSentEmailsFromCollection(name) {
    var req = {"collectionName":name};
    if (DEBUG) {
        alert("sent collectionName: " + req.collectionName);
    }
    $.post(SERVER_URL + '/displayEmailRows', req,
        displaySentEmails).fail(runOnAdditionError);
}

function displaySentEmails(data) {
    displayEmails(data, "sent");
}

function displayEmails(data, where) {
    var emails = data.JSONInCollection.emails;
    var name = data.collectionName;
    if (DEBUG) {
        alert("display inbox reached.\nname: " + data.collectionName);
    }
    var res = "";
    let numUnread = 0;
    for (var i = 0; i < emails.length; i++) {
        res += createNewRow(i, name, emails[i], where);
        if (emails[i].read == "unread") {
            numUnread++;
        }
    }
    $("div.emails").html(res);
    alert("You have " + numUnread + " unread emails.");
    $("div.numUnread").html("NUMBER OF UNREAD EMAILS: " + numUnread);
}


function createNewRow(i, name, email, where) {
    let otherClass;
    if (email.read == "read") {
        otherClass = "read"
    } else {
        otherClass = "unread";
    }
    if (email.urgency == "urgent") {
        otherClass += "Urgent";
    }
    let partner = (where == "inbox") ? "FROM" : "TO";

    return `<div id="email${i}" class="emailRow ${otherClass + 'Row'}">` 
            + createEmailTwoButtons(i,name, email, partner, otherClass)
            + `<div class="flags">`
                + "<div>" + createCheckBox(email.urgency, i, name) + "</div>"
                + "<div>" + createDeleteKey(name, i) + "</div>"
            + `</div>`
            + createReadTag(email.read)
         + '</div>';
}

function createReadTag(read) {
    if (read == "read") {
        return "<div>       </div>";
    } else {
        return '<div class="toRead">TO READ</div>';
    }
}

function runOnAdditionError(err) {
    alert("There was a server error in adding the emails to this page.");
}

function createEmailTwoButtons(i, name, email, partner, otherClass) {
    return `<div class="clickToView" onclick="viewEmail(${i}, '${name}')" >`  
        + `<div id="emailTwoButtons${i}" class="twoButtons ${otherClass + 'TwoButtons'}">`  
                + `<a class="whoButton ${otherClass + 'WhoButton'}"><i style="font-weight: normal; color:grey">${partner}:</i>${email.conversationPartner}</a>`
                + `<a class="subjectButton ${otherClass + 'WhoButton'}"><i>SUBJECT:</i>${email.subject}</a>`
            + "</div>"
    + '<div class="viewPrompt">VIEW</div></div>';
}

function createDeleteKey(name, i) {
    return `<div class="deleteKeyDiv">`
                + `<a class="deleteKey" onclick="deleteEmail('${name}', ${i})"><i class="fa fa-trash" aria-hidden="true"></i>DELETE</a>`
                 + `</div>`;
} 

function createCheckBox(urgency, i, name) {
    if (urgency == "urgent") {
        return `<div class="checkBoxDiv" id="checkbox${i}" onclick="clickCheckBox(${i}, '${name}')">`
        + CHECKED
        + `</div>`;                 
    } else {
        return `<div class="checkBoxDiv" id="checkbox${i}" onclick="clickCheckBox(${i}, '${name}')">`
        + NOT_CHECKED
        + `</div>`; 
    }
}
