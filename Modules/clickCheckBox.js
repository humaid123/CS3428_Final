
function clickCheckBox(i, name) {
    $.post(SERVER_URL + '/clickCheckBox', 
        createNameIndexReq(name, i), 
        runOnCheckBoxSuccess).fail(runOnCheckBoxError);

    let checkbox = document.getElementById("checkbox" + i);
    if (checkbox.innerHTML == CHECKED) {
        checkbox.innerHTML = NOT_CHECKED;
    } else {
        checkbox.innerHTML = CHECKED;
    }

    let email = document.getElementById("email" + i);
    let classNames = email.className.split(" ");
    let newClassNames = classNames[0] + " ";
    if (classNames[1] == "readUrgentRow") {
        newClassNames += "readRow";
    } else if (classNames[1] == "unreadUrgentRow") {
        newClassNames += "unreadRow";
    } else if (classNames[1] == "readRow") {
        newClassNames += "readUrgentRow";
    } else if (classNames[1] == "unreadRow") {
        newClassNames += "unreadUrgentRow";
    }
    email.className = newClassNames;


    let emailTwoButtons = document.getElementById("emailTwoButtons" + i);
    classNames = emailTwoButtons.className.split(" ");
    newClassNames = classNames[0] + " ";
    if (classNames[1] == "readUrgentTwoButtons") {
        newClassNames += "readTwoButtons";
    } else if (classNames[1] == "unreadUrgentTwoButtons") {
        newClassNames += "unreadTwoButtons";
    } else if (classNames[1] == "readTwoButtons") {
        newClassNames += "readUrgentTwoButtons";
    } else if (classNames[1] == "unreadTwoButtons") {
        newClassNames += "unreadUrgentTwoButtons";
    }
    emailTwoButtons.className = newClassNames;
    function runOnCheckBoxSuccess(data) {
        if (DEBUG) alert(data.message);
    }

    function runOnCheckBoxError(err) {
        alert("Server error in clicking checkbox");
    }
}
