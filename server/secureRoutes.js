/*
 * secureRoutes.js
 * Humaid M. Agowun (A00430163)
 * routes for when the user has a token and
 * token has been authenticated.
 */
require("dotenv").config();

const router = require("express").Router();
const UserModel = require("./model");

router.post(
  "/getEmails",
  /*
  function that deals to post on '/getEmails'
  get the email array needed for the list of emails 
  in the inbox and sentItems screens
  
  Humaid M. Agowun (A00430163)
  
  req = express request object
  res = express response object
  */
  async function (req, res) {
    let { email, isInbox } = req.body;
    if (!email || isInbox == null) {
      return res.status(400).json({ message: "Improper request." });
    }

    isInbox = isInbox == "true"; //need == in case it comes off as string
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Could not find user." });
      }

      let emails = isInbox ? user.inbox : user.sentItems;
      return res.status(200).json({ emails });
    } catch (error) {
      return res.status(400).json({ message: "Error in fetching emails." });
    }
  }
);

router.post(
  "/changeUrgency",
  /*
  function that deals with request to '/changeUrgency'
  used when user clicks on TO DO/DONE button
  changes the urgency in the database

  Humaid M. Agowun (A00430163)
  
  req = express request object
  res = express response object
  */
  async function (req, res) {
    let { email, isInbox, index } = req.body;
    if (!email || !isInbox || !index) {
      return res.status(400).json({ message: "Improper request." });
    }
    isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Could not find user." });
      }

      const success = await user.changeUrgency(isInbox, index);
      if (success) {
        return res.status(200).json({ message: "Urgency changed." });
      } else {
        return res.status(400).json({ message: "Urgency change failed." });
      }
    } catch (error) {
      return res.status(400).json({ message: "Error in changing urgency." });
    }
  }
);

router.post(
  "/deleteEmail",
  /*
  function that deals with request to '/deleteEmail'
  used when user clicks delete key to delete an email
  Delete the email in the database
  Humaid M. Agowun (A00430163)
  req = express request object
  res = express response object
  */
  async function (req, res) {
    let { email, isInbox, index } = req.body;
    if (!email || !isInbox || !index) {
      return res.status(400).json({ message: "Improper request." });
    }
    isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Could not find user." });
      }

      const success = await user.deleteEmail(isInbox, index);
      if (success) {
        return res.status(200).json({ message: "Email Deleted." });
      } else {
        return res.status(400).json({ message: "Email deletion failed." });
      }
    } catch (error) {
      return res.status(400).json({ message: "Error in deleting email." });
    }
  }
);

router.post(
  "/storeNewEmail",
  /*
  function that deals with post to '/storeNewEmail' 
  used when sending a new email.
  Adds the email to the sender's sentItems and then
  to the receiver and cced persons' inbox
  Code could not be shortened as requires res
  for pretty much everything.
  
  Humaid M. Agowun (A00430163)
  
  req = express request object
  res = express response object
  */
  async function (req, res) {
    let { email, newEmail } = req.body;
    if (!email || !newEmail) {
      return res.status(400).json({ message: "Improper request." });
    }
    if (!newEmail.from) newEmail.from = email;
    newEmail.isUrgent = false;

    let sender = await UserModel.findOne({ email });
    if (!sender) {
      return res.status(400).send({ message: "Could not find sender." });
    }

    //find all receivers first, so we can say improper email from the start
    let emailReceivers = [];
    let receiver = await UserModel.findOne({ email: newEmail.to });
    if (receiver) {
      emailReceivers.push(receiver);
    } else {
      throw res
        .status(400)
        .send({ message: "Could not find receiver: " + newEmail.to + "." });
    }
    if (newEmail.cc) {
      for (const ccEmail of newEmail.cc) {
        let ccedPerson = await UserModel.findOne({ email: ccEmail });
        if (ccedPerson) {
          emailReceivers.push(ccedPerson);
        } else {
          return res
            .status(400)
            .send({ message: "Could not find cced person: " + ccEmail + "." });
        }
      }
    }

    //add to sender sent items
    newEmail.isRead = true;
    let success = await sender.addNewSentItem(newEmail);
    if (!success) {
      return res.status(400).send({
        message: "Could not add email to your sent Items, Email not sent.",
      });
    }
    //send to all receivers' inbox
    newEmail.isRead = false;
    let unsentEmails = [];
    for (const emailReceiver of emailReceivers) {
      success = await emailReceiver.addNewInboxEmail(newEmail);
      if (!success) {
        //we dont cancel => we try to add to as many people as possible
        unsentEmail.push(emailReceiver.email);
      }
    }
    if (unsentEmails.length != 0) {
      //not empty, so some one did not get the email
      let str = createUnsentString(unsentEmails);
      // we just send a message if we could not add to someone...
      return res
        .status(200)
        .send({ message: "Sent email to everyone except: " + str + "." });
    } else {
      return res.status(200).send({ message: "Email successfully sent." });
    }
  }
);

/*
function that creates a string denoting all unsent emails.
unsentEmails = list of email addresses where email were not sent
return a string of unsent emails.
*/
function createUnsentString(unsentEmails) {
  let str = "";
  for (let i = 0; i < unsentEmails.length; i++) {
    if (i == unsentEmails.length - 1) {
      str += unsentEmails[i];
    } else {
      str += unsentEmails[i] + ", ";
    }
  }
  return str;
}

router.post(
  "/viewEmail",
  /*
  function that deals with post to '/viewEmail'
  used when user wishes to see an email
  returns the email the user wants to see and
  updates read status in database.
  
  Humaid M. Agowun (A00430163)
  
  req = express request object
  res = express response object
  */
  async function (req, res) {
    let { email, isInbox, index } = req.body;
    if (!email || !isInbox || !index) {
      return res.status(400).json({ message: "Incorrect request." });
    }
    isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).send({ message: "Could not find user." });
      }

      const requestedEmail = await user.viewEmail(isInbox, index);
      return res.status(200).send({ requestedEmail });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error in getting email to view." });
    }
  }
);

router.post(
  "/deleteAccount",
  /*
  function that deals with posts to '/deleteAccount'
  used when specialists wants to delete an account
  Removes the account from the database.
  
  Humaid M. Agowun (A00430163)
  
  req = express request object
  res = express response object
  */
  async function (req, res) {
    let { email, deletionSecretKey, emailToDelete } = req.body;
    if (!email || !deletionSecretKey) {
      return res.status(400).send({ message: "Improper request." });
    }
    if (deletionSecretKey != process.env.DELETION_SECRET_KEY) {
      return res
        .status(400)
        .send({ message: "Wrong secret key for deletion." });
    }
    try {
      await UserModel.deleteOne({ email: emailToDelete });
      return res.status(200).send({ message: "Account deleted." });
    } catch (error) {
      return res.status(400).send({
        message:
          "Could not delete account due to error: " + error.message + ".",
      });
    }
  }
);

router.post(
  "/getAllAccountEmails",
  /*
  function that deals with posts to '/getAccountEmails'
  route used to get dropdown accounts for composing an email
  and to get the accounts for the specialist to delete them.
  
  Humaid M. Agowun (A00430163)
  
  req = express request object
  res = express response object
  */
  async function (req, res) {
    let { email, isSpecialist } = req.body;
    if (!email || !isSpecialist) {
      return res.status(400).send({ message: "Improper request" });
    }
    isSpecialist = isSpecialist == "true"; //make sure it is a boolean, need == and not ===
    try {
      let accounts = await UserModel.find({}, "email isSpecialist");

      if (!isSpecialist) {
        accounts = accounts.filter((acc) => acc.isSpecialist); //return only specialists if student
      }

      const toReturn = accounts.map((acc) => acc.email); //return only emails
      res.status(200).json({ accounts: toReturn });
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Could not fill in your selection menus." });
    }
  }
);

module.exports = router;
