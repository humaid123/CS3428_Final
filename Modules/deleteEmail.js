
function createDeleteKey(name, i) {
    return `<div class="deleteKeyDiv">`
                + `<a class="deleteKey" onclick="deleteEmail('${name}', ${i})"><i class="fa fa-trash" aria-hidden="true"></i>DELETE</a>`
                 + `</div>`;
} 

function deleteEmail(name, i) {
    var ans = confirm("Are you sure you want to delete this email?");

    if (ans == true) {
        $.post(SERVER_URL + '/deleteEmail', 
            createNameIndexReq(name, i), 
            runOnSuccessFulDeletion).fail(runOnDeleteFail);
        reloadPage(name);
    }

    function runOnSuccessFulDeletion(data) {
        if (DEBUG) {
            alert(data.message);
        }
    }

    function runOnDeleteFail(err) {
        alert("could not delete email");
    }
}

function reloadPage(name) {
    if (name === ADMIN_INBOX_NAME) {
        window.location.href = "adminInbox.html";
    } else if (name === ADMIN_SENT_ITEMS_NAME) {
        window.location.href = "adminSentItems.html";
    } else if (name == STUDENT_INBOX_NAME) {
        window.location.href = "inbox.html";
    } else if (name == STUDENT_SENT_ITEMS_NAME) {
        window.location.href = "sentItems.html";
    }
}
