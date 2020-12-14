/*
 * File that loads the checkboxes.
 * Isaac Cain
 */

/* Icon style for when not all checkboxes have been ticked. */
const NOT_TICKED = `<i class="fa fa-exclamation-triangle composeIcon" style="red"></i>`;
/* Icon style for when all checkboxes have been ticked. */
const TICKED = `<i class="fa fa-check-square composeIcon" style="red"></i>`;

/*
Each compose page has a <script> tage with the definition of
the COMPOSE_DIVS => this is how we load and check checkboxes.
Each page thus can have different checkboxes.
Remember that hints are built in the page itself
*/

/*
  Function that sets the value for maxHeightHidden in pixels.
  This function executes on loadPage().

  Isaac Cain (A00391748)
*/
let maxHeightHidden; // Declare maxHeightHidden
function loadCheckBoxes() {
  // declare json and its value checkBoxShouldBeLoaded
  const json = JSON.parse(localStorage.getItem("loadCheckBox"));
  const checkBoxShouldBeLoaded = json.loadCheckBox;
  // If checkbox is not loaded:
  if (!checkBoxShouldBeLoaded) {
    maxHeightHidden = "150px"; // set maxHeightHidden to be 150px
    for (const divId in COMPOSE_DIVS) { // set display for checkboxes
      let div = document.getElementById(`${divId}CheckBoxes`);
      div.style.display = "none";
    }
  } else { // If checkbox is loaded
    maxHeightHidden = "300px"; // set maxHeightHidden to be 300px
    for (const divId in COMPOSE_DIVS) {
      console.log(divId); // send the div ID to log
      let div = document.getElementById(`${divId}CheckBoxes`);
      div.innerHTML = createCheckBoxes(divId); // create each checkbox needed.
      // It calls a function that returns HTML for the checkbox, and sets this
      //    using innerHTML.
    }
  }
}
/*
  Function that creates a checkbox.
  Takes as an argument a div ID, and returns HTML for the div.

  Isaac Cain (A00391748)
*/
function createCheckBoxes(divId) {
  // Create some HTML with the proper class, and the proper name, using divId.
  let res = `<p class="checkBoxTitle">CHECK FOR ${divId.toUpperCase()}</p>`;
  res += // set the proper id for the element using divId.
    `<ul class="checkBoxList" id="${divId}CheckBoxList">` +
    // Create the checkbox items for the given checkbox.
    constructCheckBoxItems(divId, COMPOSE_DIVS[divId].checkBoxes) +
    "</ul>";
  return res; // Return the HTML.
}
/*
  Function that creates the HTML for the checkboxes of the div.
  Takes as arguments the div ID and its checkboxes.

  Isaac Cain (A00391748)
*/
function constructCheckBoxItems(divId, checkBoxes) {
  let res = ""; // Initialize what will be returned.
  console.log(divId, checkBoxes); // Send arguments to the log.
  // Iterate over the length of the checkboxes:
  for (let i = 0; i < checkBoxes.length; i++) {
    // Declare a variable for each checkbox belonging to the div.
    let name = divId + "CheckBox" + i;
    // Log the name and tie it to the correct checkbox. 
    console.log(name, checkBoxes[i]);
    // Create the HTML for the correct checkbox.
    res +=
      `<li class="checkboxElement">` +
      `<label class="labelForCheckBox" for="${name}">${checkBoxes[i]}  ` +
      `<input type="checkbox" id="${name}" class="checkBox" name="${name}"></label>` +
      `</li>`;
  }
  return res; // Return the HTML.
}
/*
  Funtion that drops down the hints for a field.
  Takes as an argument a div ID.

  Isaac Cain (A00391748)
*/
let count = 0; // Initialize count to 0.
function turnOnHidden(divId) {
  if (
    count == 0 ||
    document.getElementById(divId + "Hidden").style.display == "none"
  ) {
    document.getElementById(divId + "Hidden").style.height = "0px";
    document.getElementById(divId + "Hidden").style.display = "block";
    setTimeout(() => { // This sets the dropdown to the previously defined height over a period of 50ms.
      document.getElementById(divId + "Hidden").style.height = maxHeightHidden;
    }, 50);
  }
}
/*
  Function that iterates over the checkboxes in a div and 
    closes the checkbox compartment when the Checked Everything Button is clicked
    and every checkbox is ticked.
  Takes as an argument a div ID.

  Isaac Cain (A00391748)
*/
function closeCheckBoxes(divId) {
  let json = COMPOSE_DIVS[divId]; //json is in the Compose page itself so formal and informal have different
  // Iterate over the checkboxes in the div.
  for (let i = 0; i < json.checkBoxes.length; i++) {
    let name = divId + "CheckBox" + i;
    let checkBox = document.getElementById(name);
    if (!checkBox) {
      // if we cannot find a checkbox, none were loaded as we load them from JS
      break;
    }
    // If the checkbox has not been checked, do not close checkbox compartment.
    //   This ensures the compartment will close only when every checkbox is ticked.
    if (!checkBox.checked) {
      closeHiddenCompartment(divId, false);
      return;
    }
  }
  // Close the checkbox compartment.
  closeHiddenCompartment(divId, true);
}
/*
  Function that closes a compartment once all its checkboxes have been ticked.
  Takes as arguments the div ID as well as a boolean.

  Isaac Cain (A00391748)
*/
function closeHiddenCompartment(divId, toTick) {
  document.getElementById(divId + "Hidden").style.height = "0px";
  setTimeout(() => { // Change the style over 400ms, according to the boolean.
    document.getElementById(divId + "Hidden").style.display = "none";
    let correct = document.getElementById(divId + "Correct");
    // If toTick is true, then all checkboxes have been clicked, and set the 
    //   div classname to "allTicked".
    if (toTick) {
      correct.innerHTML = TICKED;
      correct.className = "allTicked";
    } else {
      // Else, the div class is "notAllTicked".
      correct.innerHTML = NOT_TICKED;
      correct.className = "notAllTicked";
    }
  }, 400);
}
