function linkStudentCompose(fWhere) {
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
    if (DEBUG) {
        alert(json.fromWhere);
    }
    localStorage.setItem("fromWhere", JSON.stringify(json))
}

function setUpCheckBoxesJSON(load) {
    var json = {"loadCheckBox" : load};
    if (DEBUG) {
        alert(json.loadCheckBox);
    }
    localStorage.setItem("loadCheckBox", JSON.stringify(json))
}
