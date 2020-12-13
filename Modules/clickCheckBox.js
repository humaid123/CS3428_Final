/*
  Function for changing the urgency of an email on the server side.
  Takes the following arguments:
    isInbox: a boolean
    index: the index of the email
    changeUrgencyFunc: the function that changes the urgency

  Isaac Cain (A00391748)
*/
function changeUrgencyInServer(isInbox, index, changeUrgencyFunc) {
  /* Attempt to validate user credentials. */
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  /* If either token or email address fail, then return user to the index. */
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  $.ajax({
    type: "POST",
    /* Validate the token. */
    url:
      SERVER_URL +
      "/secure/changeUrgency" +
      "?" +
      $.param({ secret_token: token }),
    /* Set the data of the email the urgency will be changed on. */
    data: { email, isInbox, index },
    dataType: "json",
    /* If successful, change the urgency. */
    success: function (result, status, xhr) {
      changeUrgencyFunc(null, result);
    },
    /* Else, return error message. */
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      changeUrgencyFunc(myErr);
    },
  });
}
/*
  Function that changes the urgency of an email. It calls the previous function
    that acts on the server, and it also changes the urgency on the client end.
  Takes as arguments the index i of the email, and a boolean isInbox.

  Isaac Cain (A00391748)
*/
function clickCheckBox(i, isInbox) {
  /* Call changeUrgencyInServer: */
  changeUrgencyInServer(isInbox, i, (err, result) => {
    /* If it fails, alert the user. */
    if (err) {
      alert("could not change urgency. \nError:" + err.message);
    } else {
      /* If no error on the server side, then change the classes with 
          the functions changeRowClasses and changeTwoButtonsClasses.
          The function changeCheckboxText is used to know what it should
          be changed to. It returns a boolean corresponding to whether the
          email was checked or not. */
      const wasUrgent = changeCheckboxText(i);
      changeRowClasses(i, wasUrgent);
      changeTwoButtonsClasses(i, wasUrgent);
    }
  });
}
/*
  Function to change the HTML to be either checked, or not checked.
  Takes as an argument the index of the email.
  Returns a boolean corresponding to whether the email was checked as urgent.

  Isaac Cain (A00391748)
*/
function changeCheckboxText(i) {
  /* Select the checkbox of the email. */
  let checkbox = document.getElementById("CheckBox" + i);
  /* If the email's HTML corresponds to CHECKED, then change it to NOT_CHECKED. */
  if (checkbox.innerHTML == CHECKED) {
    checkbox.innerHTML = NOT_CHECKED;
    /* Since the email was set to CHECKED, return true. */
    return true;
  } else {
    /* Else, the email's HTML was NOT_CHECKED, so change it to CHECKED. */
    checkbox.innerHTML = CHECKED;
    /* Return false, since email was not checked as urgent. */
    return false;
  }
}
/*
  Function that changes the class of the row.
  Takes as an argument the index of the email, 
    and the boolean from changeCheckboxText.

  Isaac Cain (A00391748)
*/
function changeRowClasses(i, wasUrgent) {
  /* Get the email using the index. */
  let email = document.getElementById("email" + i);
  /* Get the class name. */
  let classNames = email.className;
  /* Declare a new classname. */
  let newClassNames;
  /* If the email was checked as urgent: */
  if (wasUrgent) {
    /* Replace the "Urgent" class with an empty class. */
    newClassNames = classNames.replace("Urgent", "");
  } else {
    /* Else, if the email was not checked as urgent:
        replace the "read" class with "readUrgent". */
    newClassNames = classNames.replace("read", "readUrgent");
  }
  /* Set the email's className as the newClassNames. */
  email.className = newClassNames;
}
/*
  Function that changes the class of the buttons.
  Takes as an argument the index of the email, 
    and the boolean from changeCheckboxText.

  Isaac Cain (A00391748)
*/
function changeTwoButtonsClasses(i, wasUrgent) {
  /* Get the email buttons using the index. */
  let emailTwoButtons = document.getElementById("emailTwoButtons" + i);
  /* Get the class names. */
  classNames = emailTwoButtons.className;
  /* Declare the new classnames. */
  let newClassNames;
  /* If the email was checked as urgent: */
  if (wasUrgent) {
    /* Replace the "Urgent" class with an empty class. */
    newClassNames = classNames.replace("Urgent", "");
  } else {
    /* Else, ifthe email was not checked as urgent:
        replace the "read" class with "readUrgent". */
    newClassNames = classNames.replace("read", "readUrgent");
  }
  /* Set the email's className as the newClassNames. */
  emailTwoButtons.className = newClassNames;
}
