/*Local Storage keys: 
"help" - This keeps the last page visited in local storage in the event the student refreshes, or changes difficulty
"difficulty" - Keeps what difficulty they have selected
"style" - Keeps what style of email they're writing
*/
      
      /* This function sets up the initial page so that users can select what type of email and what difficulty setting they need help with.
      Written by Caitlin Maillet
      */
      function displayOptions() {
        document.getElementById("content").innerHTML =
          '<div style = \"text-align: center\"><h1>Are you writing a formal or informal email?</h1>' +
          '<button class = \"openSideBarbtn\" onclick = \"saveFormal()\">Formal</button>' +
          '<button class = \"openSideBarbtn\" onclick = \"saveInformal()\">Informal</button>' + 
          '<h1>What difficulty are you using?</h1>'+
          '<button class = \"openSideBarbtn\" onclick = \"saveBeg()\">Beginner</button>'+
          '<button class = \"openSideBarbtn\" onclick = \"saveInt()\">Intermediate</button>'+
          '<button class = \"openSideBarbtn\" onclick = \"saveAdv()\">Advanced</button>'+
          '<br><br><div id = \"selectionType\"><h4>You have not selected an email type.</h4></div>' + 
          '<div id = \"selectionDiff\"><h4>You have not selected a difficulty.</h4>'+
          '</div><br><button class = \"okayBtn\" onclick = \"navigate()\">Okay</button></div>';
      }

      /*This function navigates to the page the user initially wanted help with when selected in "HelpMain.html". 
      Written by Caitlin Maillet
      */
      function navigate(){
          if(localStorage.getItem("help") == "compose"){
              displayComposeHelp();
          }
          if(localStorage.getItem("help") == "systemHelp"){
              displaySystemHelp();
          }
          if(localStorage.getItem("help")== "viewEmail"){
              displayViewingEmailHelp();
          }
      }
      /*Saves beginner difficulty to local storage when selected by the user on the initial page.
      Written by Caitlin Maillet
      */
      function saveBeg(){
          localStorage.setItem("difficulty", "beginner");
          document.getElementById("selectionDiff").innerHTML = 
          "<h4>You have selected beginner difficulty.</h4>"
      }
    /*Saves intermediate difficulty to local storage when selected by the user on the initial page.
      Written by Caitlin Maillet
      */
      function saveInt(){
          localStorage.setItem("difficulty", "intermediate");
          document.getElementById("selectionDiff").innerHTML = 
          "<h4>You have selected intermediate difficulty.</h4>"
      }
    /*Saves advanced difficulty to local storage when selected by the user on the initial page.
      Written by Caitlin Maillet
      */
      function saveAdv(){
          localStorage.setItem("difficulty", "advanced");
          document.getElementById("selectionDiff").innerHTML = 
          "<h4>You have selected advanced difficulty.</h4>"
      }
      /*Saves informal style to local storage when selected by the user on the initial page
      Written by Caitlin Maillet
      */
      function saveInformal() {
        localStorage.setItem("style", "informal");
        document.getElementById("selectionType").innerHTML = 
        "<h4>You have selected informal emailing help.</h4>"
      }
    /*Saves informal style to local storage when selected by the user on the initial page
      Written by Caitlin Maillet
      */
      function saveFormal() {
        localStorage.setItem("style", "formal");
        document.getElementById("selectionType").innerHTML = 
        "<h4>You have selected formal emailing help.</h4>"
      }
      
      /*Function saves if user selects inbox/sent items as the part of the system they need help with, then sends user to HelpCompose.html.
      Written by Caitlin Maillet
      */
      function saveInboxScreens(){
        localStorage.setItem("help", "inboxSent");
        window.location.href = "HelpCompose.html";
    }
          
    
    /*Function saves if user selects compose as the part of the system they need help with, then sends user to HelpCompose.html.
      Written by Caitlin Maillet
      */
    function saveCompose(){
        localStorage.setItem("help", "compose");
        window.location.href = "HelpCompose.html";
    }     
    
    /*Function saves if user selects changingScreens  as the part of the system they need help with, then sends user to HelpCompose.html.
    Written by Caitlin Maillet
    */
    function saveChanging(){
        localStorage.setItem("help", "systemHelp");
        window.location.href = "HelpCompose.html";
    }

      /*Function saves if user selects viewing email as the part of the system they need help with, then sends user to HelpCompose.html.
      Written by Caitlin Maillet
      */
    function saveViewEmail(){
        localStorage.setItem("help", "viewEmail");
        window.location.href = "HelpCompose.html";
    }

      /*This function displays a menu of choices for which part of composing the user needs help with, and redirects to that section.
      Written by Caitlin Maillet
      */
      function displayComposeHelp(){
        closeSideBar();
          document.getElementById("content").innerHTML=
          '<div style = \"text-align: center\"><h3>What part of composing emails do you need help with?</h3>'+
          '<button class = \"openSideBarbtn\" onclick = \"displayToHelp()\">To field</button><br>'+
          '<button class = \"openSideBarbtn\" onclick = \"displayCcHelp()\">Cc field</button><br>'+
          '<button class = \"openSideBarbtn\" onclick = \"displaySubjectHelp()\">Subject field</button><br>'+
          '<button class = \"openSideBarbtn\" onclick = \"displayGreetingHelp()\">Greeting</button><br>'+
          '<button class = \"openSideBarbtn\" onclick = \"displayBodyHelp()\">Body</button><br>'+
          '<button class = \"openSideBarbtn\" onclick = \"displayClosureHelp()\">Closure</button></div>';
      }
      /* This function displays "To" help. This is the same for both formal and informal
      Written by Lydia Belachew
      */
      function displayToHelp() {
        closeSideBar();
        document.getElementById("content").innerHTML =
        "<h2>To Help</h2><p>In the \"To\" input field, you should write the email address of the person, or people you want to send an email to." + 
        "It is important to verify the spelling of the email address so that it is sent to the right person.</p>" + 
        "<p>You can either by type the person's email in the \"To\" box :</p><img src = \"images/ToBox.png\"><br><br>" +
        "<p>Or by selecting them from the drop down menu</p><img src = \"images/to_Dropdown.png\"><br>";
        localStorage.setItem("help", "compose");//sets the last page visited to compose
      }
      /*This function displays "CC" help. This is the same for both formal and informal,
      Written by Lydia Belachew
      */
      function displayCcHelp() {
        closeSideBar();
        document.getElementById("content").innerHTML =
          "<h2>Cc Help</h2><p>Cc stands for Carbon Copy. When you Cc someone to an email, you are sending them a copy of the email.</p>" +
          "<p>You should add someone in as a Cc if the email is not meant for them, but if it contains information they should know about.</p>"+
          "<p>For example, you could Cc your supervisor to let them know an action has been taken or to provide a record of communications.</p>"+
          "<p>It is important to not Cc too often, as it could become annoying and cumbersome to the person you are Cc-ing.</p><br>"+
          "<p>You CC someone in the same way you add someone to the To box. Either by typing in the CC box:</p><img src = \"images/CCBox.png\"><br><br>" +
          "<p>Or by selecting them from the drop down menu:</p><img src = \"images/CCDropdown.png\"><br>";
        localStorage.setItem("help", "compose");//sets the last page visited to compose
      }
      /*This function displays "Subject" help. This is the same for both formal and informal.
      Written by Lydia Belachew
      */
      function displaySubjectHelp() {
        closeSideBar();
        document.getElementById("content").innerHTML =
        "<h2>Subject Help</h2><p>In the \"Subject\" input field, you should write a few words describing what your email talks about.</p>" + 
        "<p>For example, if you are emailing a professor about a test, you should include the course code for the class in the subject line, since the professor " +
        "may not know all of their students by name.</p>" + 
        "<p>You can type the subject of your email in the \"Subject\" box :</p><img src = \"images/SubjectBox.png\"><br><br>";
        localStorage.setItem("help", "compose");//sets the last page visited to compose
      }

      /*This function displays "Greeting" help depending on whether the email writing style is formal or informal
      Written by Lydia Belachew
      */
      function displayGreetingHelp() {
        closeSideBar();
        //if writing style is informal, display informal help
        if (localStorage.getItem("style") == "informal") { 
          document.getElementById("content").innerHTML =
            "<h1>Informal Greeting Help</h1><p>Because this is an informal email, meaning you have a friendly, personal relationship with " + 
            "the recipient, you can afford to be morecasual in your greeting. <br>Here are some examples:</p><p>Hi [Name],</p>" +
            "<p>Hello, </p><p>Hello [Name],</p><p>Hi everyone, <strong><em>(Use this when addressing multiple people)</em></strong></p>" +
            "<p>Hello everyone, <strong><em>(Use this when addressing multiple people)</em></strong></p><p>Hey,</p><p>Hey [Name],</p>" +
            "<br>You type your greeting in the \"Greeting\" section of the compose page: <br>" + 
            "<img src = \"images/greetingBox.png\">";
        }
        //if writing style is formal, display formal help
        if (localStorage.getItem("style") == "formal") {
          document.getElementById("content").innerHTML = "<h1> Formal Greeting Help</h1>" +
            "<p>Since a formal email is usually sent to someone you don't know well or to someone who is in authority, you have to be more serious with"+
            "your greeting.<br>Here are some examples:</p>" + 
            "<p>Dear [Name],</p><p>Dear Professor [Name],</p><p>Good morning/afternoon/evening, </p>" +
            "<p>Greetings,</p><p>Hello everyone, <strong><em>(Use this when addressing multiple people)</em></strong></p>" +
            "<br>You type your greeting in the \"Greeting\" section of the compose page: <br>" + 
            "<img src = \"images/greetingBox.png\">";
        }
        localStorage.setItem("help", "compose");//sets the last visited page to compose
      }

      /*This function displays "Body" help depending on whether the email writing style is formal or informal
      Written by Caitlin Maillet
      */
      function displayBodyHelp() {
        closeSideBar();
        //if writing style is informal, display informal help
        if (localStorage.getItem("style") == "informal") {
          document.getElementById("content").innerHTML =
            "<h2>What is the Body?</h2><p>The body of an email message contains the actual content.</p><img src=\"images/bodyBox.png\">" +
            "<h2>What should the Body contain?</h2><p>The first paragraph should set the tone and reason for the email. " +
            "Then elaborate on your concerns, questions <br>or response. Write in a way that is easy to understand while also making sure " + 
            "to not lose your point by providing unnecessary information. <br>When responding make sure you answer any questions that the " +
            "recipient has asked. Only give information that is required.<br><br>You also add links, images and attachments.</p>";
        }
        //if writing style is formal, display formal help
        if (localStorage.getItem("style") == "formal") {
          document.getElementById("content").innerHTML =
            "<h1>Formal Body Help</h1>" +
            "<h2>What is the Body?</h2>" +
            "<p>The body of an email message contains the actual content.</p>" +
            "<br><h3>Body</h3><p>The first paragraph should set the tone and reason for the email. Then elaborate on your concerns, questions"+
            "<br>or response. Write in a way that is easy to understand while also making sure to not lose your point by providing unnecessary information."+ 
            "<br>When responding make sure you answer any questions that the recipinet has asked. Only give information that is required."+
            "<br><br>You also add links, images and attachments.</p><p>You type your body in this field:</p><img src=\"images/bodyBox.png\">";
        }
        localStorage.setItem("help", "compose");//sets the last visited page to compose
      }

      /*This function displays the "Closure" help, this is the same for formal and informal
      Written by Lydia Belachew
      */
      function displayClosureHelp() {
        closeSideBar();
          document.getElementById("content").innerHTML =
            "<h3>Conclusion Help</h3><p>This is the closing of your email. Think of it as an ending of a conversation. You will need a closing " + 
            "line, this is line should show graditude for the recipient for reading<br>your email and a statement that will either motivate " + 
            "the recipient to respond or shows you anticipate a response. Here is a simple example of a closing: </p><p>Thank you,<br><br>[Your Name]</p>";
        localStorage.setItem("help", "compose");//sets the last visited page to compose
      }
      /*This function displays the help for viewing emails.
      Written by Lydia Belachew
      */
      function displayViewingEmailHelp() {
        closeSideBar();
        document.getElementById("content").innerHTML =
          "<h2>To</h2><p>This field tells you the recipient of the email. You can also email multiple people.</p><img src=\"images/ViewEmail.PNG\"width=\"800px\" />" +
          "<h2>From</h2><p>This field tells the recipient who the email is from.</p><h2>Subject</h2><p>This is a briefly tells the recipient of the " +
          "email what the generalemail is about.</p><h2>To Do</h2><p>When an email has not been read, it will be a yellow color. There will also be a \"To Do\"" +
          " button that reminds the <br>user to open the email. Another indication will be the red flag, next to the button, this draws the users eyes " +
          "to the unread email.</p><img src=\"images/BasicToDo.PNG\"width=\"800px\"/><h2>Done</h2><p>When you have read an email, click on the \"To Do\" button. " +
          "This will change to \"Done\".The color of the email will also<br> change from yellow to white. These changes will help you know which emails you " +
          "have already read.</p><img src=\"images/ExDone.PNG\" width=\"800px\" /><h2>Delete</h2><p>When selected, this button deletes the email.</p>";
        localStorage.setItem("help", "viewEmail");//sets the last visited page to viewing email
      }

      /*This function displays system help based on whether the diffuculty is beginner, intermediate, or advanced.
      Written by Lydia Belachew
      */
      function displaySystemHelp() {
        closeSideBar();
        //if difficulty is beginner, display beginner help
          if(localStorage.getItem("difficulty") == "beginner"){
            document.getElementById("content").innerHTML = 
            "<h1 style=\"text-align: center\">CHANGING SCREENS FOR BEGINNER LEVEL</h1><h2>Main page (Inbox)</h2><p>This the first page a user" + 
            " sees when accesing their email. The user willsee a message <br />displaying the number of unread emails. Emails that have not been opened are yellow," + 
            " while the ones that were are white.<br />At the bottom of the page are four buttons: Sent items, Compose, Help desk and Log out. </p>" +
            "<img src=\"images/BasicMainPageTop.png\"width=\"1000px\" /><img src=\"images/BasicMainPageBottom.png\" width=\"1000px\"/><h2>Sent Items</h2>" + 
            "<p>When user selects the button Sent Items, the page displays all the emails that the user has emailed.</p><img src=\"images/BasicSentItems.png\"width=\"1000px\"/>" +
            "<h2 id=>Compose</h2><p>Select this button when you are ready to email someone.</p><h3>Formal or Informal?</h3><p>After selecting the Compose " +
            "button the user is brought over to another page where the user is questioned the email will be formal or informal.<br>Hovering the mouse over either " +
            "of the two options gives a brief example of who that email would be for.<br>Formal emails are for people you do not have a personal relationship with. " + 
            "Examples would include:<ul><li>Professors or Teachers</li><li>Managers or anyone with a higher position than you at a workplace</li></ul>" +
            "<br>Informal emails are for people you are close with. Such as, friends, family, classmates, and your peers</p><imgsrc=\"images/BasicFormalOrInformal.png\"" +
            "width=\"1000px\"/><h2>Help Desk</h2><p>When this button is selected a new window is opened listing the various you may need help in.<br>Select an of the options " + 
            "that you are confused about.</p><img src=\"images/BasicHelpDesk.png\" width=\"1000px\"/><h2>Log out</h2><p>When this button is selected a message " +
            "box appears, clarifying if your are sure you want to log out.<br> Hit \"OK\" or \"Cancel\". If you select \"OK\" then you will be taken back to the login page." +
            "<br>Otherwise, you will remain on the current page. </p>";
          }
          //if difficulty is intermediate, display intermediate help
          if(localStorage.getItem("difficulty") == "intermediate"){
              document.getElementById("content").innerHTML = 
              "<h1 style=\"text-align: center\">CHANGING SCREENS FOR INTERMEDIATE LEVEL</h1><h2>Main page (Inbox)</h2><p>This the first page a user sees when accesing their " + 
              "email. The user will see a message <br />displaying " + 
              "the number of unread emails. Emails that have not been opened are yellow, while the ones that were are white.<br/>At the top left corner of the page " +
              "is an Office button. Selecting this button will open a navigation sidebar. The sidebar has the following list: Inbox, Compose, Help Desk, Log out and " +
              " Close a button.The Close button closes the sidebar. <br></p><img src=\"images/IntermMainPage.png\" width=\"600px\"/>" +
              "<img src=\"images/IntermMainPageSideBar.png\" width=\"600px\" /><h2>Sent Items</h2><p>When user selects the button Sent Items, the page displays " +
              "all the emails that the user has emailed.</p><img src=\"images/IntermSentItems.png\" width=\"800px\"/><h2>Compose</h2><p>Select this button when you " +
            "are ready to email someone.</p><h3>Formal or Informal?</h3><p>After selecting the Compose button the user is brought over to another page where the " +
            "user is questioned the email will be formal or informal.<br>Hovering the mouse over either of the two options gives a brief example of who that email " + 
            "would be for.<br>Formal emails are for people you do not have a personal relationship with. Examples would include:<ul><li>Professors or Teachers</li>" + 
            "<li>Managers or anyone with a higher position than you at a workplace</li></ul><br>Informal emails are for people you are close with. Such as, friends, " +
            "family, classmates, and your peers</p><img src=\"images/BasicFormalOrInformal.png\" width=\"800px\"/><h2>Help Desk</h2>" +
            "<p>When this button is selected a new window is opened listing the various you may need help in.<br>Select an of the options that you are confused "+
            "about.</p><img src=\"images/BasicHelpDesk.png\" width=\"800px\"/><h2>Log out</h2><p>When this button is selected a message box appears, clarifying if " +
            "your are sure you want to log out.<br> Hit \"OK\" or \"Cancel\". If you select \"OK\" then you will be taken back to the login page.<br>Otherwise, you will " +
            "remain on the current page. </p>";
          }
          //if difficulty is advanced, display advanced help
          if(localStorage.getItem("difficulty") == "advanced"){
            document.getElementById("content").innerHTML = 
           "<h1 style=\"text-align: center\">General System Help - Advanced System</h1><h2>Main page (Inbox)</h2><p>This the first page a user sees when accesing their" + 
            " email. The user willsee a message displaying the " +
            "number of unread emails.<br>Emails that have not been opened are yellow, while the ones that were are white. At the top left corner of the page is " + 
            "an Office button,<br> the Compose button, and the Help desk button. Selecting the Office button will open the navigation sidebar. The sidebar has the " +
            "following list:<br>Inbox, Sent Items, Log out and a Close button. The Close button closes the sidebar. </p><img src=\"images/AdvancedMainPage.png\" width=\"1000px\" />" +
            "<h2>Sent Items</h2><p>When user selects the button Sent Items, the page displays all the emails that the user has emailed.</p>" + 
            "<img src=\"images/AdvancedSentItems.png\" width=\"1000px\"/><h2>Compose</h2><p>Select this button when you are ready to email someone.</p>" +
            "<h3>Formal or Informal?</h3><p>After selecting the Compose button the user is brought over to another page where the user is questioned the email will " +
            "be formal or informal.<br>Hovering the mouse over either of the two options gives a brief example of who that email would be for.<br>Formal emails are " +
            "for people you do not have a personal relationship  with. Examples would include:<ul><li>Professors or Teachers</li><li>Managers or anyone with a " + 
            "higher position than you at a workplace</li></ul><br>Informal emails are for people you are close with. Such as, friends, family, classmates, and your " +
            "peers</p><img src=\"images/BasicFormalOrInformal.png\" width=\"1000px\"/><h2>Help Desk</h2><p>When this button is selected a new window is opened " +
            "listing the various you may need help in.<br>Select an of the options that you are confused about.</p><img src=\"images/BasicHelpDesk.png\" width=\"1000px\"/>" +
            "<h2>Log out</h2><p>When this button is selected a message box appears, clarifying if your are sure you want to log out.<br> Hit \"OK\" or \"Cancel\"." + 
            " If you select \"OK\" then you will be taken back to the login page.<br>Otherwise, you will remain on the current page. </p>" ;
          }
        localStorage.setItem("help", "systemHelp");//set last page visited to System Help
      }

      /* Function opens the sidebar by setting the width of sidebar and the page margin to 250px 
      Written by Caitlin Maillet*/
      function openSideBar() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }

      /* Function closes the sidebar by setting the width of sidebar and the page margin to 250px 
      Written by Lydia Belachew*/
      function closeSideBar() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
      }