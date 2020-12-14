/*
  Function that loads the dropdown menus for To and CC.
  Executes on loadPage().

  Isaac Cain (A00391748)
*/
function loadDropdown() {
  // Calls getAllAccountsFromServer (in the Modules folder).
  //   This loads all email accounts stored in the server and returns them.
  getAllAccountsFromServer(false, (err, result) => {
    if (err) {
      // Error checking.
      return alert(
        "error occured in getting all accounts.\nError: " + err.message
      );
    }
    // Calls loadDataList to load them to the user.
    loadDatalist(result.accounts);
  });
}
/*
  Function that loads a list of email accounts to a dropdown list.
  Takes as an argument a list of emails.
  Returns HTML to be set in the compose HTML file.

  Isaac Cain (A00391748)
*/
function loadDatalist(accounts) {
  let res = ""; // Declare the HTML that will be returned.
  // Loop over all the accounts.
  for (const account of accounts) {
    // Add to what will be returned the account as an option item.
    res += `<option class="optionItem">${account}</option>`;
  }
  // Give the accounts as option items to the list.
  $("#LIST").html(res);
}
