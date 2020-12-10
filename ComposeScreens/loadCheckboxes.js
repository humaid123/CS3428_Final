const NOT_TICKED = `<i class="fa fa-exclamation-triangle composeIcon" style="red"></i>`;
const TICKED = `<i class="fa fa-check-square composeIcon" style="red"></i>`;

/*
Each compose page has a <script> tage with the definition of
the COMPOSE_DIVS => this is how we load and check checkboxes.
Each page thus can have different checkboxes.
Remember that hints are built in the page itself
*/

let maxHeightHidden;
function loadCheckBoxes() {
  const json = JSON.parse(localStorage.getItem("loadCheckBox"));
  const checkBoxShouldBeLoaded = json.loadCheckBox;

  if (!checkBoxShouldBeLoaded) {
    maxHeightHidden = "150px";
    for (const divId in COMPOSE_DIVS) {
      let div = document.getElementById(`${divId}CheckBoxes`);
      div.style.display = "none";
    }
  } else {
    maxHeightHidden = "300px";
    for (const divId in COMPOSE_DIVS) {
      console.log(divId);
      let div = document.getElementById(`${divId}CheckBoxes`);
      div.innerHTML = createCheckBoxes(divId);
    }
  }
}

function createCheckBoxes(divId) {
  let res = `<p class="checkBoxTitle">CHECK FOR ${divId.toUpperCase()}</p>`;
  res +=
    `<ul class="checkBoxList">` +
    constructCheckBoxItems(divId, COMPOSE_DIVS[divId].checkBoxes) +
    "</ul>";
  return res;
}

function constructCheckBoxItems(divId, checkBoxes) {
  let res = "";
  console.log(divId, checkBoxes);

  for (let i = 0; i < checkBoxes.length; i++) {
    let name = divId + "CheckBox" + i;
    console.log(name, checkBoxes[i]);
    res +=
      `<li class="checkboxElement">` +
      `<label class="labelForCheckBox" for="${name}">${checkBoxes[i]}  ` +
      `<input type="checkbox" id="${name}" class="checkBox" name="${name}"></label>` +
      `</li>`;
  }
  return res;
}
let count = 0;
function turnOnHidden(divId) {
  if (
    count == 0 ||
    document.getElementById(divId + "Hidden").style.display == "none"
  ) {
    document.getElementById(divId + "Hidden").style.height = "0px";
    document.getElementById(divId + "Hidden").style.display = "block";
    setTimeout(() => {
      document.getElementById(divId + "Hidden").style.height = maxHeightHidden;
    }, 50);
  }
}

function closeCheckBoxes(divId) {
  let json = COMPOSE_DIVS[divId]; //json is in the Compose page itself so formal and informal have different
  for (let i = 0; i < json.checkBoxes.length; i++) {
    let name = divId + "CheckBox" + i;
    let checkBox = document.getElementById(name);
    if (!checkBox) {
      // if we cannot find a checkbox, none were loaded as we load them from JS
      break;
    }
    if (!checkBox.checked) {
      closeHiddenCompartment(divId, false);
      return;
    }
  }
  closeHiddenCompartment(divId, true);
}

function closeHiddenCompartment(divId, toTick) {
  document.getElementById(divId + "Hidden").style.height = "0px";
  setTimeout(() => {
    document.getElementById(divId + "Hidden").style.display = "none";
    let correct = document.getElementById(divId + "Correct");
    if (toTick) {
      correct.innerHTML = TICKED;
      correct.className = "allTicked";
    } else {
      correct.innerHTML = NOT_TICKED;
      correct.className = "notAllTicked";
    }
  }, 550);
}
