/*
constants.js
Humaid M. Agowun (A00430163)
file used by all othe files in the app.
Defines the constants used.
*/

//Debug flag to help debugging
const DEBUG = false;

//constant to connect to server.
const PORT = 3555;
const SERVER_URL = "http://140.184.230.209:" + PORT;

// constants used for TO DO vs DONE of the checkBox.
const CHECKED = `<i class="fa fa-flag" style="color:red;" aria-hidden="true"></i>TO DO`;
const NOT_CHECKED = `<i class="fa fa-flag-o" aria-hidden="true"></i> DONE`;

//functions that appear on almost all pages

/*
function run everytime a help desk button 
is clicked.
opens the help subsystem.
*/
function showHelp() {
  window.open(
    "../Helps/HelpMain.html",
    "MsgWindow",
    "width=1000, height=500, top=200, left=400"
  );
}

/*
function run everytime a log out button 
is clicked.
clears localStorage and links back.
*/
function logOut() {
  alert("Logging out.\nGood Bye.");
  localStorage.clear();
  window.location.href = "../index.html";
}
