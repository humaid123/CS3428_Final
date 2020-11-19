
function viewEmail(i, inInbox) {
    document.getElementById("ViewingEmail").style.display = "block";
    viewEmailFromServer(isInbox, i, (err, result) => {
        if (err) {
            alert("could not fetch email.\nError: " + err.message);
        } else {
            changeEmailToReadClasses(i);
            fillTextBoxes(result.email, isInbox);
        }
    })
} 

function changeEmailToReadClasses(i) {
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

function fillTextBoxes(email, isInbox) {
    const partner = (isInbox) ? "from" : "to";
    $("#WhoTextBox").val(email[partner]);
    $("#CcTextBox").val(email.cc);
    $("#SubjectTextBox").val(email.subject);
    $("#BodyTextBox").val(email.emailText);
}
