function changeUrgencyInServer(isInbox, index, changeUrgencyFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
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
        return alert("unrecognised error-status: " + xhrm.status);
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
      const wasUrgent = changeCheckboxText(i);
      changeRowClasses(i, wasUrgent);
      changeTwoButtonsClasses(i, wasUrgent);
    }
  });
}

function changeCheckboxText(i) {
  let checkbox = document.getElementById("checkbox" + i);
  if (checkbox.innerHTML == CHECKED) {
    checkbox.innerHTML = NOT_CHECKED;
    return true; //it was checked so it was urgent
  } else {
    checkbox.innerHTML = CHECKED;
    return false;
  }
}

function changeRowClasses(i, wasUrgent) {
  let email = document.getElementById("email" + i);
  let classNames = email.className;
  let newClassNames;
  if (wasUrgent) {
    newClassNames = classNames.replace("Urgent", "");
  } else {
    newClassNames = classNames.replace("read", "readUrgent");
  }
  email.className = newClassNames;
}

function changeTwoButtonsClasses(i, wasUrgent) {
  let emailTwoButtons = document.getElementById("emailTwoButtons" + i);
  classNames = emailTwoButtons.className;
  let newClassNames;
  if (wasUrgent) {
    newClassNames = classNames.replace("Urgent", "");
  } else {
    newClassNames = classNames.replace("read", "readUrgent");
  }
  emailTwoButtons.className = newClassNames;
}
