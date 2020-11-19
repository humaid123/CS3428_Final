function storeNewEmailOnServer(newEmail, storeNewEmailFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  if (!email.from) {
    //if no from, we add a from field to the email
    email.from = email;
  }
  $.ajax({
    type: "POST",
    url:
      SERVER_URL +
      "/secure/storeNewEmail" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, newEmail },
    dataType: "json",
    success: function (result, status, xhr) {
      storeNewEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      storeNewEmailFunc(myErr);
    },
  });
}
