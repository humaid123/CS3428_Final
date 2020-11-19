function logOutFromBrowser(afterClearingFunc) {
  //clean up localStorage on explicit logout
  localStorage.removeItem("user");
  localStorage.removeItem("fromWhere");
  localStorage.removeItem("loadCheckBox");
  afterClearingFunc();
}
