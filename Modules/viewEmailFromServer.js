function viewEmailFromServer(isInbox, index, viewEmailFunc) {
  const { email, token } = JSON.parse(localStorage.getItem("user")) || {};
  if (!token || !email) {
    alert("YOU ARE NOT LOGGED IN");
    window.location.href = "../index.html";
    return;
  }
  $.ajax({
    type: "POST",
    url:
      SERVER_URL + "/secure/viewEmail" + "?" + $.param({ secret_token: token }),
    data: { email, isInbox, index },
    dataType: "json",
    success: function (result, status, xhr) {
      viewEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error-status: " + xhrm.status);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      viewEmailFunc(myErr);
    },
  });
}
