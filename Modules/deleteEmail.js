/* 
  Function that deletes an email.
  Takes as argument the index of the email, and a boolean determining whether
    the email is an inbox email or not.
    
  Isaac Cain (A00193748)
*/
function deleteEmail(i, isInbox) {
  /* Prompt the user to see if they want to delete the email. */
  var ans = confirm("Are you sure you want to delete this email?");
  /* If they answer in the affirmative: */
  if (ans == true) {
    /* Delete the email from the server. */
    deleteEmailFromServer(isInbox, i, (err, result) => {
      /* If that fails: */
      if (err) {
        /* Alert the user. */
        alert("server error in deleting email\nError: " + err.message);
      } else {
        /* Else, reload. */
        window.location.reload();
      }
    });
  }
}
/*
  Function that deletes the email on the server side.
  Takes as arguments:
    isInbox: a boolean determining whether the email is an inbox email or not.
    index: the index of the email.
    deleteEmailFunc: callback function.

  Isaac Cain (A00391748)
*/
function deleteEmailFromServer(isInbox, index, deleteEmailFunc) {
  /* Parse the JSON for user validation. */
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  /* If there are issues with the validation, either the token or the email: */
  if (!token || !email) {
    /* Alert the user. */
    alert("YOU ARE NOT LOGGED IN");
    /* Return them to the index. */
    window.location.href = "../index.html";
    return;
  }
  /* If user validation is successful, communicate with the server using AJAX. */
  $.ajax({
    type: "POST",
    url:
      SERVER_URL +
      "/secure/deleteEmail" +
      "?" +
      $.param({ secret_token: token }),
    /* Set the data. */
    data: { email, isInbox, index },
    dataType: "json",
    /* On success, delete the email. */
    success: function (result, status, xhr) {
      deleteEmailFunc(null, result);
    },
    /* Else: */
    error: function (xhrm, status, error) {
      /* Return error to the user. */
      if (xhrm.status != 400) {
        return alert("unrecognised error status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      deleteEmailFunc(myErr);
    },
  });
}
