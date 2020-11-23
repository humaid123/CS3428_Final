function loadDropdown() {
  getAllAccountsFromServer(false, (err, result) => {
    if (err) {
      return alert(
        "error occured in getting all accounts.\nError: " + err.message
      );
    }
    loadDatalist(result.accounts);
  });
}

function loadDatalist(accounts) {
  let res = "";
  for (const account of accounts) {
    res += `<option class="optionItem">${account}</option>`;
  }
  $("#LIST").html(res);
}
