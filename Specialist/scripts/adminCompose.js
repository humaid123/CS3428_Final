function loadAdminOptions() {
  getAllAccountsFromServer(true, (err, result) => {
    if (err) {
      alert("error in loading the dropdown");
    } else {
      loadTheOptions(result.accounts);
    }
  });
}

function loadTheOptions(accounts) {
  let res = "";
  for (const account of accounts) {
    res += `<option class="optionItem">${account}</option>`;
  }
  $("#LIST").html(res);
}
