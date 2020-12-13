/*This function stores a new Email on the server
Written by Caitlin Maillet*/
function storeNewEmailOnServer(newEmail, storeNewEmailFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};//parses the user and the token
  if (!token || !email) {//ensures that email and token are valid user credentials
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  if (!email.from) {
    //if no from, we add a from field to the email
    email.from = email;
  }
  $.ajax({//connection to server
    type: "POST",
    url:
      SERVER_URL +
      "/secure/storeNewEmail" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, newEmail },
    dataType: "json",
    success: function (result, status, xhr) {//if successful, email is stored
      storeNewEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {//if it is unsuccessful, display error message
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      storeNewEmailFunc(myErr);
    },
  });
}
