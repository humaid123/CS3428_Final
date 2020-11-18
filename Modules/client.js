
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


function loginInServer(email, password, loginFunc) {
    $.ajax({
        type: "POST",
        url: SERVER_URL + "/login",
        data: {email, password},
        dataType: 'json',
        success: function(result, status, xhr) {
            //put result in localStorage.
            const json = {email, token: result.token};
            localStorage.setItem("user", JSON.stringify(json));

            loginFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            loginFunc(myErr);
        }
    });
}

function getEmailsFromServer(isInbox, displayEmailsFunc) {
    const {email, token} = JSON.parse(localStorage.getItem('user'));
    if (!token || !email) {
        alert("YOU ARE NOT LOGGED IN");
        window.location.href = "../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        //this will be put in req.query
        url: SERVER_URL + '/secure/getEmails' + "?" + $.param({secret_token: token}), 
        data: {email, isInbox}, //this will be put in req.body
        dataType: 'json',
        success: function(result, status, xhr) {
            displayEmailsFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            displayEmailsFunc(myErr);
        }
    });
}

function changeUrgencyInServer(isInbox, index, changeUrgencyFunc) {
    const {email, token} = JSON.parse(localStorage.getItem('user'));
    if (!token || !email) {
        alert("YOU ARE NOT LOGGED IN");
        window.location.href = "../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: SERVER_URL + "/secure/changeUrgency" + "?" +  $.param({secret_token: token}),
        data: {email, isInbox, index},
        dataType: 'json',
        success: function(result, status, xhr) {
            changeUrgencyFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            changeUrgencyFunc(myErr);
        }
    });
}

function deleteEmailFromServer(isInbox, index, deleteEmailFunc) {
    const {email, token} = JSON.parse(localStorage.getItem('user'));
    if (!token || !email) {
        alert("YOU ARE NOT LOGGED IN");
        window.location.href = "../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: SERVER_URL + "/secure/deleteEmail" + "?" +  $.param({secret_token: token}),
        data: {email, isInbox, index},
        dataType: 'json',
        success: function(result, status, xhr) {
            deleteEmailFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            deleteEmailFunc(myErr);
        }
    });
}

function storeNewEmailOnServer(newEmail, storeNewEmailFunc) {
    const {email, token} = JSON.parse(localStorage.getItem('user'));
    if (!token || !email) {
        alert("YOU ARE NOT LOGGED IN");
        window.location.href = "../index.html";
        return;
    }
    if (!email.from) { //if no from, we add a from field to the email
        email.from = email;
    }
    $.ajax({
        type: "POST",
        url: SERVER_URL + "/secure/storeNewEmail" + "?" +  $.param({secret_token: token}),
        data: {email, newEmail},
        dataType: 'json',
        success: function(result, status, xhr) {
            storeNewEmailFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            storeNewEmailFunc(myErr);
        }
    });
}

function viewEmailFromServer(isInbox, index, viewEmailFunc) {
    const {email, token} = JSON.parse(localStorage.getItem('user'));
    if (!token || !email) {
        alert("YOU ARE NOT LOGGED IN");
        window.location.href = "../index.html";
        return;
    }
        $.ajax({
        type: "POST",
        url: SERVER_URL + "/secure/viewEmail" + "?" +  $.param({secret_token: token}),
        data: {email, isInbox, index},
        dataType: 'json',
        success: function(result, status, xhr) {
            viewEmailFunc(null, result);
        },
        error: function(xhrm, status, error) {
            if (xhrm.status != 400) {
                return alert("unrecognised error: " + error);
            }
            const myErr = {code: xhrm.status, message: xhrm.responseJSON.message};
            viewEmailFunc(myErr);
        }
    });
}

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

function logOutFromBrowser(afterClearingFunc) {
    //clean up localStorage on explicit logout
    localStorage.removeItem('user');
    localStorage.removeItem('fromWhere');
    localStorage.removeItem('loadCheckBox');
    afterClearingFunc();
}
