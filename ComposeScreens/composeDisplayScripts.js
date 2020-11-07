const NOT_TICKED = `<i class="fa fa-exclamation-triangle composeIcon" style="red"></i>`;
const TICKED = `<i class="fa fa-check-square composeIcon" style="red"></i>`;

const COMPOSE_DIVS = {
    "To": {"checkBoxes": []}, 
    "Cc": {"checkBoxes": []}, 
    "Subject": {"checkBoxes": []}, 
    "Greeting": {"checkBoxes": []},
    "Body": {"checkBoxes": []}, 
    "Closure": {"checkBoxes": []}
};

function loadCheckBoxes() {
    const checkBoxShouldBeLoaded = JSON.parse(
        localStorage.getItem("loadCheckBox")
    ).loadCheckBox;

    if (!checkBoxShouldBeLoaded) {
        for (const divId in COMPOSE_DIVS) {
            let div = document.getElementById(`${divId}CheckBoxes`);
            div.style.display= "none";
        }
    } else {
        for (const divId in COMPOSE_DIVS) {
            let div = document.getElementById(`${divId}CheckBoxes`);
            div.innerHTML = createCheckBoxes(divId);
        }
    }
    localStorage.removeItem("loadCheckBox"); //clean up
}

function createCheckBoxes(divId) {
    let res = `<p>CHECKBOXES FOR ${divId.toUpperCase()}</p>`;
    res += `<ul class="checkBoxList">` 
                + constructCheckBoxItems(divId, COMPOSE_DIVS[divId])
    + '</ul>';
    return res;
}

function constructCheckBoxItems(divId, checkBoxes) {
    let res = "";

    for (let i = 0; i < checkBoxes.length; i++) {
        let name = divId + "CheckBox" + i;
        res += `<li class="checkboxElement">`
                + `<label class="labelForCheckBox" for="${name}">${checkBoxes[i]}  `
                + `<input type="checkbox" id="${name}" class="checkBox" name="${name}"></label>`
            + `</li>`;
    }
    return res;
}

    
function turnOnHidden(divId) {
        document.getElementById(divId + "Hidden").style.display = "block";
}
function closeCheckBoxes(divId) {
        let json = COMPOSE_DIVS[divId];
        for (let i = 0; i < json.checkBoxes.length; i++) {
            let name = divId + "CheckBox" + i;
            console.log(name);
            let checkBox = document.getElementById(name);
            if (!checkBox.checked) {
                let correct = document.getElementById(divId + "Correct");
                correct.innerHTML = NOT_TICKED;
                correct.className = "notAllTicked";
                document.getElementById(divId + "Hidden").style.display = "none";
                return;
            }
        }
        let correct = document.getElementById(divId + "Correct");
        correct.innerHTML = TICKED;
        correct.className = "allTicked";
        document.getElementById(divId + "Hidden").style.display = "none";
}
