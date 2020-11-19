function deleteAccountFromDB(emailToDelete, secret, deleteAccountFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }

  $.ajax({
    type: "POST",
    url:
      SERVER_URL +
      "/secure/deleteAccount" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, emailToDelete, deletionSecretKey: secret },
    dataType: "json",
    success: function (result, status, xhr) {
      deleteAccountFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      deleteAccountFunc(myErr);
    },
  });
}
