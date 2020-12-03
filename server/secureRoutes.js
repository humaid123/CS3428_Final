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

  returns N/A
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
        return res
          .status(400)
          .json({ message: "Could not find your account." });
      }

      let emails = isInbox ? user.inbox : user.sentItems;
      return res.status(200).json({ emails });
    } catch (error) {
      return res.status(400).json({ message: "Could not fetch your emails." });
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

  returns N/A
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
        return res
          .status(400)
          .json({ message: "Could not find your account." });
      }

      const success = await user.changeUrgency(isInbox, index);
      if (success) {
        return res.status(200).json({ message: "Urgency changed." });
      }
      return res.status(400).json({ message: "Urgency change failed." });
    } catch (error) {
      return res.status(400).json({ message: "Unknown Urgency error." });
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

  returns N/A
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
        return res
          .status(400)
          .json({ message: "Could not find your account." });
      }

      const success = await user.deleteEmail(isInbox, index);
      if (success) {
        return res.status(200).json({ message: "Email Deleted." });
      }
      return res.status(400).json({ message: "Email deletion failed." });
    } catch (error) {
      return res.status(400).json({ message: "Unknown deleting email error." });
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

  returns N/A
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
      return res.status(400).send({ message: "Could not find your account." });
    }

    let { error, emailReceivers } = await getAllReceivers(newEmail);
    if (error != "") {
      return res.status(400).send({ message: error });
    }

    newEmail.isRead = true; //in the sent items, it is marked as read.
    let success = await sender.addNewSentItem(newEmail);
    if (!success) {
      return res.status(400).send({
        message: "Could not add email to your sent Items, Email not sent.",
      });
    }

    newEmail.isRead = false; //in the inboxes, it is marked as unread.
    let unsentEmails = await sendEmailToAllReceivers(emailReceivers, newEmail);
    if (unsentEmails.length != 0) {
      return res
        .status(200) //we still sent email to some people though some did not receive it...
        .send({ message: createUnsentString(unsentEmails) });
    } else {
      return res.status(200).send({ message: "Email successfully sent." });
    }
  }
);

/*
Given a newEmail to be stored. the function finds all the receivers
that is the to and all the cced person from the database.
Humaid M. Agowun (A00430163)

newEmail = the new email to be stored

returns {error, emailReceiver} json.
the error is "" is no error.
*/
async function getAllReceivers(newEmail) {
  const emailReceivers = [];
  let receiver = await UserModel.findOne({ email: newEmail.to });
  if (receiver) {
    emailReceivers.push(receiver);
  } else {
    return {
      error: "Could not find receiver: " + newEmail.to + ".",
      emailReceivers,
    };
  }
  if (newEmail.cc) {
    //it is not an empty array, so we can iterate.
    for (const ccEmail of newEmail.cc) {
      let ccedPerson = await UserModel.findOne({ email: ccEmail });
      if (ccedPerson) {
        emailReceivers.push(ccedPerson);
      } else {
        return {
          error: "Could not find cced person: " + ccEmail + ".",
          emailReceivers,
        };
      }
    }
  }
  return { error: "", emailReceivers };
}

/*
adds the new email into all the inboxes of the receivers.
Humaid M. Agowun

emailReceivers = the to and cced persons database user instances
newEmail = the new email sent.

returns an array of the the emails of people which did not 
receive it. Empty array if all received the email.
*/
async function sendEmailToAllReceivers(emailReceivers, newEmail) {
  let unsentEmails = [];
  for (const emailReceiver of emailReceivers) {
    success = await emailReceiver.addNewInboxEmail(newEmail);
    if (!success) {
      //we dont cancel => we try to add to as many people as possible
      unsentEmail.push(emailReceiver.email);
    }
  }
  return unsentEmails;
}

/*
function that creates a string denoting all unsent emails.
Humaid M. Agowun

unsentEmails = list of email addresses where email were not sent

return a string of for the error message of the unsent emails.
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
  return "Sent email to everyone except: " + str + ".";
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

  returns N/A
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
        return res
          .status(400)
          .send({ message: "Could not find your account." });
      }

      const { error, requestedEmail } = await user.viewEmail(isInbox, index);
      if (error != "") {
        return res.status(400).send({ message: error });
      }
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

  returns N/A
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
          "Could not delete account.\nServer Error: " +
          (error.message || "Unknown deleting account error") +
          ".",
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

  returns N/A
  */
  async function (req, res) {
    let { email, isSpecialist } = req.body;
    if (!email || !isSpecialist) {
      return res.status(400).send({ message: "Improper request." });
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
        .send({ message: "Could not fill in your menu(s)." });
    }
  }
);

module.exports = router;
