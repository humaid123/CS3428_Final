//Commenting: Adam Taylor

/**
 * Function shows a dropdown list of accounts that emails can be sent to.
 */
function loadAdminOptions() {
  getAllAccountsFromServer(true, (err, result) => {
    if (err) {
      alert("error in loading the dropdown");
    } else {
      loadTheOptions(result.accounts);
    }
  });
}
/**
 * Loads the dropdown's option items.
 * @param {*} accounts the accounts to be added to the dropdown
 */
function loadTheOptions(accounts) {
  let res = "";
  for (const account of accounts) {
    res += `<option class="optionItem">${account}</option>`;
  }
  $("#LIST").html(res);
}
