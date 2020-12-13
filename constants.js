/*
constants.js
Humaid M. Agowun (A00430163)
file used by all othe files in the app.
Defines the constants used.
It also has logOut and showHelp function
*/

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
Humaid M. Agowun

returns N/A
*/
function showHelp() {
  window.open(
    "../Helps/HelpMain.html",
    "MsgWindow",
    "width=1000, height=650, top=20, left=400"
  );
}

/*
function run everytime a log out button 
is clicked.
clears localStorage and links back.
Humaid M. Agowun

returns N/A
*/
function logOut() {
  const ans = confirm("Are you sure you want to log out?");
  if (ans == true) {
    localStorage.clear();
    window.location.href = "../index.html";
  }
}
