require("dotenv").config();

const express = require("express");
const router = express.Router();

const UserModel = require("./model");

router.post("/getEmails", async function (req, res) {
  let { email, isInbox } = req.body;
  if (!email || isInbox == null) {
    return res.status(400).json({ message: "Improper request." });
  }
  isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string
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
});

router.post("/changeUrgency", async function (req, res) {
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
});

router.post("/deleteEmail", async function (req, res) {
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
});

router.post("/storeNewEmail", async function (req, res) {
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

  //find al receivers first
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

  //send to sender
  newEmail.isRead = true;
  let success = await sender.addNewSentItem(newEmail);
  if (!success) {
    return res
      .status(400)
      .send({
        message: "Could not add email to your sent Items, Email not sent.",
      });
  }
  //send to receivers
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
    let str = "";
    for (let i = 0; i < unsentEmails.length; i++) {
      if (i == unsentEmails.length - 1) {
        str += unsentEmails[i];
      } else {
        str += unsentEmails[i] + ", ";
      }
    }
    // we just send a message if we could not add to someone...
    return res
      .status(200)
      .send({ message: "Sent email to everyone except: " + str + "." });
  } else {
    return res.status(200).send({ message: "Email successfully sent." });
  }
});

router.post("/viewEmail", async function (req, res) {
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
    console.log("error in /viewEmail: ", error);
    return res.status(400).json({ message: "Error in getting email to view." });
  }
});

router.post("/deleteAccount", async function (req, res) {
  let { email, deletionSecretKey, emailToDelete } = req.body;
  if (!email || !deletionSecretKey) {
    return res.status(400).send({ message: "Improper request." });
  }
  if (deletionSecretKey != process.env.DELETION_SECRET_KEY) {
    return res.status(400).send({ message: "Wrong secret key for deletion." });
  }
  try {
    await UserModel.deleteOne({ email: emailToDelete });
    return res.status(200).send({ message: "Account deleted." });
  } catch (error) {
    return res.status(400).send({
      message: "Could not delete account due to error: " + error.message + ".",
    });
  }
});

router.post("/getAllAccountEmails", async function (req, res) {
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
      .send({ message: "Could not find all emails for your menu." });
  }
});

module.exports = router;
