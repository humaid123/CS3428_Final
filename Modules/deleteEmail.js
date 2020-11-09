
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
        window.location.reload();
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
