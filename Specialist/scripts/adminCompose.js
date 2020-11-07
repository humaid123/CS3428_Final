

function loadAdminOptions() {
    if (DEBUG) {
        alert("loading admin options.");
    }
    console.log("to add dropdown");
}

function createOptionsString(array) {
    var result ="";
    for (var i = 0; i < array.length; i++) {
        result += '<option class="optionItem">'+ array[i] + '</option>';
    }
    return result;
}
