// the secre is currently MANIPULATE <= we need to put that in a .env file

// You need the secret to create an account. After account is created.
// You can login with the email and password

// When user logs in, we fetch a token from server.
// We store the user email and token in localStorage to make other API calls
// the token expires after 5hrs.
// When we logout, we can only remove the token from localStorage
// When we make a request, we put the token in req.query with the url itself
// We put the data in req.body with the body field

// LOCAL STRATEGY wants data from req.body
// JWT wants data from query parameters

function loginInServer(email, password, isSpecialist, loginFunc) {
  $.ajax({
    type: "POST",
    url: SERVER_URL + "/login",
    data: { email, password, isSpecialist },
    dataType: "json",
    success: function (result, status, xhr) {
      //put result in localStorage.
      const json = { email, token: result.token };
      localStorage.setItem("user", JSON.stringify(json));

      loginFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error: " + error + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      loginFunc(myErr);
    },
  });
}
