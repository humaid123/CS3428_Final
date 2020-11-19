function changeUrgencyInServer(isInbox, index, changeUrgencyFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user"));
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  $.ajax({
    type: "POST",
    url:
      SERVER_URL +
      "/secure/changeUrgency" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, isInbox, index },
    dataType: "json",
    success: function (result, status, xhr) {
      changeUrgencyFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error: " + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      changeUrgencyFunc(myErr);
    },
  });
}

function clickCheckBox(i, isInbox) {
  changeUrgencyInServer(isInbox, i, (err, result) => {
    if (err) {
      alert("could not change urgency. \nError:" + err.message);
    } else {
      console.log(result);
      changeCheckboxText(i);
      changeRowClasses(i);
      changeTwoButtonsClasses(i);
    }
  });
}

function changeCheckboxText(i) {
  let checkbox = document.getElementById("checkbox" + i);
  if (checkbox.innerHTML == CHECKED) {
    checkbox.innerHTML = NOT_CHECKED;
  } else {
    checkbox.innerHTML = CHECKED;
  }
}

function changeRowClasses(i) {
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
}

function changeTwoButtonsClasses(i) {
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
}
