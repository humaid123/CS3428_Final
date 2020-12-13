/*
  Function that logs the user in.
  Takes the following as arguments:
    email: the user's email account.
    password: the user's password.
    isSpecialist: boolean determining whether the user is a specialist or not.
    loginFunc: function that logs in.

  Isaac Cain (A00391748)
*/
function loginInServer(email, password, isSpecialist, loginFunc) {
  $.ajax({
    type: "POST",
    url: SERVER_URL + "/login",
    /* Set the data: the address, the password, and the boolean. */
    data: { email, password, isSpecialist },
    dataType: "json",
    success: function (result, status, xhr) {
      /* On success, put the result in local storage. */
      const json = { email, token: result.token };
      localStorage.setItem("user", JSON.stringify(json));
      /* Return success. */
      loginFunc(null, result);
    },
    /* Else: */
    error: function (xhrm, status, error) {
      /* Return error. */
      if (xhrm.status != 400) {
        return alert("unrecognised error: " + error + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      loginFunc(myErr);
    },
  });
}
