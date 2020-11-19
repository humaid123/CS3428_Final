function linkStudentCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);
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

