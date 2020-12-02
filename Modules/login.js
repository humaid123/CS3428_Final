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
