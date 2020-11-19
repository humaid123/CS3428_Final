const PORT = 3555;
const SERVER_URL = "http://140.184.230.209:" + PORT;

// we need to get a token by logging in.
// The token is then stored in local Storage. the token expires after one day.
// When we logout, we can only remove the token from localStorage
// When we make a request, we put the token in req.query with the url itself
// We put the data in req.body with the body field

// LOCAL STRATEGY wants data from req.body
// JWT wants data from query parameters

function getEmailsFromServer(isInbox, displayEmailsFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user"));
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    //window.location.href = "../index.html";
    return;
  }
  $.ajax({
    type: "POST",
    url:
      SERVER_URL + "/secure/getEmails" + "?" + $.param({ secret_token: token }), //this will be put in req.query
    data: { email, isInbox }, //this will be put in req.body
    dataType: "json",
    success: function (result, status, xhr) {
      console.log(result);
      displayEmailsFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert(error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      displayEmailsFunc(myErr);
    },
  });
}

function changeUrgencyInServer(isInbox, index, changeUrgencyFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user"));
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    //window.location.href = "../index.html";
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
      console.log("change urgency success");
      console.log(result);
      changeUrgencyFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert(error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      changeUrgencyFunc(myErr);
      //window.location.href = "../index.html";
    },
  });
}

function deleteEmailFromServer(isInbox, index, deleteEmailFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user"));
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    //window.location.href = "../index.html";
    return;
  }
  $.ajax({
    type: "POST",
    url:
      SERVER_URL +
      "/secure/deleteEmail" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, isInbox, index },
    dataType: "json",
    success: function (result, status, xhr) {
      console.log("deletion success");
      console.log(result);
      deleteEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert(error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      deleteEmailFunc(myErr);
      //window.location.href = "../index.html";
    },
  });
}

function storeNewEmailOnServer(newEmail, storeNewEmailFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user"));
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    //window.location.href = "../index.html";
    return;
  }
  if (!email.from) {
    //if no from, we add a from field to the email
    email.from = email;
  }
  $.ajax({
    type: "POST",
    url:
      SERVER_URL +
      "/secure/storeNewEmail" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, newEmail },
    dataType: "json",
    success: function (result, status, xhr) {
      console.log("new Email stored");
      console.log(result);
      storeNewEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert(error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      storeNewEmailFunc(myErr);
      //window.location.href = "../index.html";
    },
  });
}

function login(email, password, loginFunc) {
  $.ajax({
    type: "POST",
    url: SERVER_URL + "/login",
    data: { email, password },
    dataType: "json",
    success: function (result, status, xhr) {
      loginFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert(error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      loginFunc(myErr);
      //window.location.href = "../index.html";
    },
  });
}

function createAccount(
  email,
  password,
  secret,
  isSpecialist,
  createAccountFunc
) {
  $.ajax({
    type: "POST",
    url: SERVER_URL + "/signup",
    data: { email, password, manipulationSecretKey: secret, isSpecialist },
    dataType: "json",
    success: function (result, status, xhr) {
      createAccountFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert(error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      createAccountFunc(myErr);
      //window.location.href = "../index.html";
    },
  });
}

function viewEmailFromServer(isInbox, index, viewEmailFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user"));
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    //window.location.href = "../index.html";
    return;
  }
  $.ajax({
    type: "POST",
    url:
      SERVER_URL + "/secure/viewEmail" + "?" + $.param({ secret_token: token }),
    data: { email, isInbox, index },
    dataType: "json",
    success: function (result, status, xhr) {
      console.log("viewEmail success");
      console.log(result);
      viewEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert(error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      viewEmailFunc(myErr);
      //window.location.href = "../index.html";
    },
  });
}

function deleteAccountFromDB(emailToDelete, secret, deleteAccountFunc) {
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
      "/secure/deleteAccount" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, emailToDelete, deletionSecretKey: secret },
    dataType: "json",
    success: function (result, status, xhr) {
      deleteAccountFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      deleteAccountFunc(myErr);
    },
  });
}

function logOut() {
  localStorage.removeItem("user");
}

function getAllAccountsFromServer(isSpecialist, useGivenAccountsFunc) {
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
      "/secure/getAllAccountEmails" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, isSpecialist },
    dataType: "json",
    success: function (result, status, xhr) {
      useGivenAccountsFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      useGivenAccountsFunc(myErr);
    },
  });
}
