function createAccountInServer(
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
        return alert("unrecognised error-status: " + xhrm.status);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      createAccountFunc(myErr);
    },
  });
}
