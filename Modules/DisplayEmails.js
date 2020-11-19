function getEmailsFromServer(isInbox, displayEmailsFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  $.ajax({
    type: "POST",
    //this will be put in req.query
    url:
      SERVER_URL + "/secure/getEmails" + "?" + $.param({ secret_token: token }),
    data: { email, isInbox }, //this will be put in req.body
    dataType: "json",
    success: function (result, status, xhr) {
      displayEmailsFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      displayEmailsFunc(myErr);
    },
  });
}

function addInboxEmailsFromCollection() {
  getEmailsFromServer(true, (err, result) => {
    if (err) {
      alert("Could not find emails.\nError: " + err.message);
    } else {
      displayEmails(result, "inbox");
    }
  });
}

function addSentEmailsFromCollection(name) {
  getEmailsFromServer(false, (err, result) => {
    if (err) {
      alert("Could not find emails.\nError: " + err.message);
    } else {
      displayEmails(result, "sent");
    }
  });
}

function displaySentEmails(data) {
  displayEmails(data, "sent");
}

function displayEmails(data, where) {
  var emails = data.emails;
  var isInbox = where == "inbox";
  var res = "";
  let numUnread = 0;
  for (var i = 0; i < emails.length; i++) {
    res += createNewRow(i, isInbox, emails[i]);
    if (!emails[i].isRead) {
      numUnread++;
    }
  }
  $("div.emails").html(res);
  if (where == "inbox") alert("You have " + numUnread + " unread emails.");
  $("div.numUnread").html("NUMBER OF UNREAD EMAILS: " + numUnread);
}

function createNewRow(i, isInbox, email) {
  let otherClass = email.isRead ? "read" : "unread";
  console.log(email.isRead, typeof email.isRead);
  if (email.isUrgent) {
    otherClass += "Urgent";
  }
  return (
    `<div id="email${i}" class="emailRow ${otherClass + "Row"}">` +
    createEmailTwoButtons(i, isInbox, email, otherClass) +
    `<div class="flags">` +
    "<div>" +
    createCheckBox(email.isUrgent, i, isInbox) +
    "</div>" +
    "<div>" +
    createDeleteKey(isInbox, i) +
    "</div>" +
    `</div>` +
    createReadTag(email.isRead) +
    "</div>"
  );
}

function createReadTag(isRead) {
  if (isRead) {
    return "<div>       </div>";
  } else {
    return '<div class="toRead">TO READ</div>';
  }
}

function createEmailTwoButtons(i, isInbox, email, otherClass) {
  const partner = isInbox ? "from" : "to";
  return (
    `<div class="clickToView" onclick="viewEmail(${i}, ${isInbox})" >` +
    `<div id="emailTwoButtons${i}" class="twoButtons ${
      otherClass + "TwoButtons"
    }">` +
    `<a class="whoButton ${otherClass + "WhoButton"}">` +
    `<i style="font-weight: normal; color:grey">${partner.toUpperCase()}:</i>${
      email[partner]
    }` +
    `</a>` +
    `<a class="subjectButton ${otherClass + "WhoButton"}"><i>SUBJECT:</i>${
      email.subject
    }</a>` +
    "</div>" +
    '<div class="viewPrompt">VIEW</div></div>'
  );
}

function createDeleteKey(isInbox, i) {
  return (
    `<div class="deleteKeyDiv">` +
    `<a class="deleteKey" onclick="deleteEmail(${i}, ${isInbox})">` +
    `<i class="fa fa-trash" aria-hidden="true"></i>DELETE` +
    `</a>` +
    `</div>`
  );
}

function createCheckBox(isUrgent, i, isInbox) {
  if (isUrgent) {
    return (
      `<div class="checkBoxDiv" id="checkbox${i}" onclick="clickCheckBox(${i}, ${isInbox})">` +
      CHECKED +
      `</div>`
    );
  } else {
    return (
      `<div class="checkBoxDiv" id="checkbox${i}" onclick="clickCheckBox(${i}, ${isInbox})">` +
      NOT_CHECKED +
      `</div>`
    );
  }
}
