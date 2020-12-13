/*
  Function that gets the emails from the server in order to display them.
  Takes as arguments a boolean and a function.
    The boolean checks if the emails being requested are from 
    the inbox or the sent items.

  Isaac Cain (A00391748)
*/
function getEmailsFromServer(isInbox, displayEmailsFunc) {
  /* First, validate the user. */
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  /* If either the token or the email fail, return the user to the index. */
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  /* On successful validation, communicate with the server. */
  $.ajax({
    type: "POST",
    //this will be put in req.query
    /* Check the token validity. */
    url:
      SERVER_URL + "/secure/getEmails" + "?" + $.param({ secret_token: token }),
    /* Get the data for an email. Use the boolean, since this will determine
         whether the request is for inbox or sent items. */
    data: { email, isInbox }, //this will be put in req.body
    dataType: "json",
    /* On success, display the emails. */
    success: function (result, status, xhr) {
      displayEmailsFunc(null, result);
    },
    /* Else, send error message. */
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      displayEmailsFunc(myErr);
    },
  });
}
/*
  Function that loads the inbox emails.
  It calls the previous function with the isInbox boolean set to true.

  Isaac Cain (A00391748)
*/
function addInboxEmailsFromCollection() {
  getEmailsFromServer(true, (err, result) => {
    /* If the functions has an error, alert the user. */
    if (err) {
      alert("Could not find emails.\nError: " + err.message);
    } else {
      /* Else, display the emails returned by the server. 
         Calls displayEmails with the loaded emails, and with "inbox". */
      displayEmails(result, "inbox");
    }
  });
}
/*
  Function that loads the sent emails from the server.
  It calls the getEmailsFromServer function with the isInbox boolean set to false.

  Isaac Cain (A00391748)
*/
function addSentEmailsFromCollection() {
  getEmailsFromServer(false, (err, result) => {
    /* If the functions has an error, alert the user. */
    if (err) {
      alert("Could not find emails.\nError: " + err.message);
    } else {
      /* Else, display the emails returned by the server. 
         Calls displayEmails with the loaded emails, and with "sent". */
      displayEmails(result, "sent");
    }
  });
}
/*
  Function that displays the emails.
  Takes as arguments data and where.
    data: the loaded emails from the server. Loaded by getEmailsFromServer.
    where: where the emails should be loaded to.
*/
function displayEmails(data, where) {
  /* Get the emails using the given data. */
  var emails = data.emails;
  /* Set the boolean to whether the given argument "where" is equal to "inbox". */
  var isInbox = where == "inbox";
  /* Initialize res to nothing. */
  var res = "";
  /* Initialize a count for number of unread emails to 0. */
  let numUnread = 0;
  /* Iterate over all emails. */
  for (var i = 0; i < emails.length; i++) {
    /* Add to res the function createNewRow on the current email, 
    including whether it is an inbox email or not. */
    res += createNewRow(i, isInbox, emails[i]);
    /* If the current email is not read, increase the number of unread. */
    if (!emails[i].isRead) {
      numUnread++;
    }
  }
  /* Send the res to the emails div. */
  $("div.emails").html(res);
  /* If the user is in the inbox: */
  if (where == "inbox") {
    /* Alert the user how many unread emails they have. */
    const str = numUnread != 1 ? "emails" : "email";
    alert(`You have ${numUnread} unread ${str}.`);
  }
  /* Alert the user how many unread emails they have in the HTML. */
  $("div.numUnread").html("NUMBER OF UNREAD EMAILS: " + numUnread);
}
/*
  Function that creates a new row in the list of emails for an email.
  Takes as arguments the index of the email, whether it is an 
    inbox email, and the email itself.

  Isaac Cain (A00391748)
*/
function createNewRow(i, isInbox, email) {
  /* Set otherClass to either "read" or "unread", 
      depending on whether the email is read or not. */
  let otherClass = email.isRead ? "read" : "unread";
  /* If the email is urgent, add that to the class. */
  if (email.isUrgent) {
    otherClass += "Urgent";
  }
  /* Return the following HTML for the email: */
  return (
    /* Main div for the email itself, with proper class: */
    `<div id="email${i}" class="emailRow ${otherClass + "Row"}">` +
    /* The buttons for the email. */
    createEmailTwoButtons(i, isInbox, email, otherClass) +
    /* div for the flags: */
    `<div class="flags">` +
    /* div for the checkbox: */
    "<div>" +
    createCheckBox(email.isUrgent, i, isInbox) +
    "</div>" +
    /* div for the delete key: */
    "<div>" +
    createDeleteKey(isInbox, i) +
    "</div>" +
    `</div>` +
    /* The read tag. */
    createReadTag(email.isRead) +
    "</div>"
  );
}
/*
  Function that creates a tag for whether the email is read or not.
   Takes as an argument a boolean determining whether the email is read.
  
  Isaac Cain (A00391748)
*/
function createReadTag(isRead) {
  /* If the email is read: */
  if (isRead) {
    /* Return the following div: */
    return "<div>       </div>";
  } else {
    /* Else, return the following div: */
    return '<div class="toRead">TO READ</div>';
  }
}
/*
  Function that creates the buttons for the email.
  Takes as arguments:
    i: the index of the email.
    isInbox: boolean determining if the email is an inbox email or not.
    email: the data of the email.
    otherClass: the email's class.

  Isaac Cain (A00391748)
*/
function createEmailTwoButtons(i, isInbox, email, otherClass) {
  /* Define partner as either "from" or "to". This is used to access the data
       of the email. If the email is an inbox email, then partner is the sender,
       and therefore is set to "from". Else it is in sent emails, and is set to "to". */
  const partner = isInbox ? "from" : "to";
  /* Return the following HTML: */
  return (
    /* When clicking the button, viewEmail is called on the index and isInbox boolean. */
    `<div class="clickToView" onclick="viewEmail(${i}, ${isInbox})" >` +
    /* The id is based on the index of the email. 
       The class it determined by the argument. */
    `<div id="emailTwoButtons${i}" class="twoButtons ${
      otherClass + "TwoButtons"
    }">` +
    `<a class="whoButton ${otherClass + "WhoButton"}">` +
    /* This section returns either "from" or "to", and calls toUpperCase on it. */
    `<i style="font-weight: normal; color:grey">${partner.toUpperCase()}:</i>${
      email[partner]
    }` +
    `</a>` +
    /* This section adds the Subject. */
    `<a class="subjectButton ${otherClass + "WhoButton"}"><i>SUBJECT:</i>${
      email.subject
    }</a>` +
    "</div>" +
    /* This prompts the user to view the email. */
    '<div class="viewPrompt">VIEW</div></div>'
  );
}
/*
  Function that creates the delete key for the email.
  Takes as arguments the isInbox boolean, and the index of the email.

  Isaac Cain (A00391748)
*/
function createDeleteKey(isInbox, i) {
  return (
    `<div class="deleteKeyDiv">` +
    /* The id is determined by the index. When the button is clicked on, it calls
         deleteEmail on the index and isInbox boolean. */
    `<a class="deleteKey" id="deleteKey${i}" onclick="deleteEmail(${i}, ${isInbox})">` +
    `<i class="fa fa-trash" aria-hidden="true"></i>DELETE` +
    `</a>` +
    `</div>`
  );
}
/*
  Function that creates a checkbox for the email.
  Takes as arguments the boolean isUrgent, the index of the email, and the boolean isInbox.

  Isaac Cain (A00391748)
*/
function createCheckBox(isUrgent, i, isInbox) {
  /* If the email is urgent: */
  if (isUrgent) {
    /* Give the id based on the index. When the checkbox is clicked, call clickCheckBox on
         the index and the isInbox boolean. */
    return (
      `<div class="checkBoxDiv" id="CheckBox${i}" onclick="clickCheckBox(${i}, ${isInbox})">` +
      /* Set the class correctly to CHECKED. */
      CHECKED +
      `</div>`
    );
  } else {
    /* Else, if the email is not urgent. */
    return (
      /* Same as above. */
      `<div class="checkBoxDiv" id="CheckBox${i}" onclick="clickCheckBox(${i}, ${isInbox})">` +
      /* But set the class to NOT_CHECKED. */
      NOT_CHECKED +
      `</div>`
    );
  }
}
