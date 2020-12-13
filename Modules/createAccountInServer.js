/*
  Function that creates an account on the server side.
  Takes as arguments:
    email: the email address of the account.
    password: the password for the account.
    secret: a password that allows the user to create the account.
    isSpecialist: a boolean to set whether the account is a specialist account.
    createAccountFunc: the function that creates the account.

  Isaac Cain (A00391748)
*/
function createAccountInServer(
  email,
  password,
  secret,
  isSpecialist,
  createAccountFunc
) {
  /* Communicate with the server  using AJAX. */
  $.ajax({
    type: "POST",
    url: SERVER_URL + "/signup",
    /* Set the data in a JSON */
    data: { email, password, manipulationSecretKey: secret, isSpecialist },
    dataType: "json",
    /* On success, create the account. */
    success: function (result, status, xhr) {
      createAccountFunc(null, result);
    },
    /* Else, return an error to the user. */
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      createAccountFunc(myErr);
    },
  });
}
