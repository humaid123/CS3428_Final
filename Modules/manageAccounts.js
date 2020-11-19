function deleteAccountFromDB(emailToDelete, secret, deleteAccountFunc) {
    const {email, token} = JSON.parse(localStorage.getItem('user'));
    if (!token || !email) {
        alert("YOU ARE NOT LOGGED IN");
        window.location.href = "../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: SERVER_URL + "/secure/deleteAccount" + "?" +  $.param({secret_token: token}),
        data: {email, emailToDelete, manipulationSecretKey: secret},
        dataType: 'json',
        success: function(result, status, xhr) {
            deleteAccountFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            deleteAccountFunc(myErr);
        }
    });
}


function createAccountInServer(email, password, secret, isSpecialist, createAccountFunc) {
    $.ajax({
        type: "POST",
        url: SERVER_URL + "/signup",
        data: {email, password, manipulationSecretKey : secret, isSpecialist},
        dataType: 'json',
        success: function(result, status, xhr) {
            createAccountFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            createAccountFunc(myErr);
        }
    });
}
