/* This function fetches an email from the server and diplays it.
Written by Caitlin Maillet*/
function viewEmailFromServer(isInbox, index, viewEmailFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {}; //parses the user and the token
  if (!token || !email) { //ensures that email and token are valid user credentials
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  $.ajax({ //connection with the server
    type: "POST",
    url:
      SERVER_URL + "/secure/viewEmail" + "?" + $.param({ secret_token: token }), //validates secret token
    data: { email, isInbox, index }, //email is the target email, isInbox checks if email is in inbox or sent items, index of email in inbox or sent items
    dataType: "json",
    success: function (result, status, xhr) {//if it is successful, display email
      viewEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {//if it is unsuccessful, display error message
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      viewEmailFunc(myErr);
    },
  });
}
