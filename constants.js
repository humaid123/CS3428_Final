//Debug flag to help debugging
const DEBUG = false;

//constant to connect to server.
const PORT = 3555;
const SERVER_URL = "http://140.184.230.209:" + PORT;

//Constants for fromWhere. Required to set up viewing an email
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;
const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

const SPECS = "width=1000, height=500, top=300, left=500";

const CHECKED = `<i class="fa fa-flag" style="color:red;" aria-hidden="true"></i>TO DO`;
const NOT_CHECKED = `<i class="fa fa-flag-o" aria-hidden="true"></i> DONE`;

//functions that appear on almost all pages
function showHelp() {
  window.open("../Helps/HelpMain.html", "MsgWindow", SPECS);
}
function logOut() {
  alert("Logging out.\nGood Bye");
  localStorage.clear();
  window.location.href = "../index.html";
}
