function deleteEmail(i, isInbox) {
  var ans = confirm("Are you sure you want to delete this email?");

  if (ans == true) {
    deleteEmailFromServer(isInbox, i, (err, result) => {
      if (err) {
        alert("server error in deleting email\nError: " + err.message);
      } else {
        window.location.reload();
      }
    });
  }
}

function deleteEmailFromServer(isInbox, index, deleteEmailFunc) {
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
      "/secure/deleteEmail" +
      "?" +
      $.param({ secret_token: token }),
    data: { email, isInbox, index },
    dataType: "json",
    success: function (result, status, xhr) {
      deleteEmailFunc(null, result);
    },
    error: function (xhrm, status, error) {
      if (xhrm.status != 400) {
        return alert("unrecognised error status: " + xhrm.status + "-" + error);
      }
      const myErr = { code: xhrm.status, message: xhrm.responseJSON.message };
      deleteEmailFunc(myErr);
    },
  });
}
