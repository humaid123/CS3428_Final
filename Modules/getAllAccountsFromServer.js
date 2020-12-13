/*
  Function that loads all the accounts from the server.
  Takes two arguments:
    isSpecialist: boolean determining whether the current user is a specialis.
    useGivenAccountsFunc: callback function.

  Isaac Cain (A00391748)
*/
function getAllAccountsFromServer(isSpecialist, useGivenAccountsFunc) {
  /* Validate user email and token. */
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  /* If the validation fails, return user to index. */
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  /* If validation succeeds, communicate with server using AJAX. */
  $.ajax({
    type: "POST",
    url:
      SERVER_URL +
      "/secure/getAllAccountEmails" +
      "?" +
      $.param({ secret_token: token }),
    /* Set the data. */
    data: { email, isSpecialist },
    dataType: "json",
    /* On success, return accounts. */
    success: function (result, status, xhr) {
      useGivenAccountsFunc(null, result);
    },
    /* Else, give error message to user. */
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      useGivenAccountsFunc(myErr);
    },
  });
}
