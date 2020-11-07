/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * constants.js:
 * js file that is used by almost all files. They allow code to be 
 * made more readable and changes to constants to be made from only
 * one place.
 */

//Debug flag to help debugging
const DEBUG = false;

//constant to connect to server.
const PORT = 3115;
const SERVER_URL = "http://140.184.230.209:" + PORT;

//Constants for fromWhere. Required to set up viewing an email
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;
const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

//Constants for the collection names.
const STUDENT_INBOX_NAME = "studentInbox";
const ADMIN_INBOX_NAME = "adminInbox";

const STUDENT_SENT_ITEMS_NAME = "studentSent";
const ADMIN_SENT_ITEMS_NAME = "adminSent";

//Constants for student Email. THE STUDENT dont have a FROM!!!
const STUDENT_EMAIL = "place Holder For Student Email";

const SPECS = "width=1000, height=500, top=300, left=500";

const CHECKED = `<i class="fa fa-flag" style="color:red;" aria-hidden="true"></i>TO DO`;
const NOT_CHECKED = `<i class="fa fa-flag-o" aria-hidden="true"></i> DONE`;


function createNameIndexReq(name, i) {
    return {"collectionName":name, "index":i};
}

function showHelp() {
    window.open("../Helps/HelpMain.html", "MsgWindow", SPECS)
}
