/*This function deletes an account from the database
Written by Caitlin Maillet*/
function deleteAccountFromDB(emailToDelete, secret, deleteAccountFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};//parses the user and the token
  if (!token || !email) {//ensures that email and token are valid user credentials
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }

  $.ajax({//connection to server
    type: "POST",
    url:
      SERVER_URL +
      "/secure/deleteAccount" +
      "?" +
      $.param({ secret_token: token }),//validates secret token
      //email is user email, emailToDelete is the accountto delete, and the secret key to delete
    data: { email, emailToDelete, deletionSecretKey: secret },
    dataType: "json",
    success: function (result, status, xhr) {//if successful, delete account
      deleteAccountFunc(null, result);
    },
    error: function (xhrm, status, error) {//if unsuccessful, display error message
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      deleteAccountFunc(myErr);
    },
  });
}
