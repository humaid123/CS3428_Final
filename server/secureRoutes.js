require("dotenv").config();

const express = require("express");
const router = express.Router();

const UserModel = require("./model");

router.post("/getEmails", async function (req, res) {
  let { email, isInbox } = req.body;
  if (!email || isInbox == null) {
    return res.status(400).json({ message: "improper request" });
  }
  isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "could not find user" });
    }

    let emails = isInbox ? user.inbox : user.sentItems;
    return res.status(200).json({ emails });
  } catch (error) {
    return res.status(400).json({ message: "error in fetching emails" });
  }
});

router.post("/changeUrgency", async function (req, res) {
  let { email, isInbox, index } = req.body;
  if (!email || !isInbox || !index) {
    return res.status(400).json({ message: "improper request" });
  }
  isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "could not find user" });
    }
    const success = await user.changeUrgency(isInbox, index);
    if (success) {
      return res.status(200).json({ message: "urgency success" });
    } else {
      return res.status(400).json({ message: "urgency failure" });
    }
  } catch (error) {
    return res.status(400).json({ message: "error in changing urgency" });
  }
});

router.post("/deleteEmail", async function (req, res) {
  let { email, isInbox, index } = req.body;
  if (!email || !isInbox || !index) {
    return res.status(400).json({ message: "incorrect request" });
  }
  isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "could not find user" });
    }
    const success = await user.deleteEmail(isInbox, index);
    if (success) {
      return res.status(200).json({ message: "deletion success" });
    } else {
      return res.status(400).json({ message: "deletion failure" });
    }
  } catch (error) {
    return res.status(400).json({ message: "error in deleting email" });
  }
});

router.post("/storeNewEmail", async function (req, res) {
  let { email, newEmail } = req.body;
  if (!email || !newEmail) {
    return res.status(400).json({ message: "Incorrect request" });
  }
  if (!newEmail.from) newEmail.from = email;
  newEmail.isUrgent = false;

  let sender = await UserModel.findOne({ email });
  if (!sender) {
    return res.status(400).send({ message: "Could not find sendee" });
  }

  //find al receivers first
  let emailReceivers = [];
  let receiver = await UserModel.findOne({ email: newEmail.to });
  if (receiver) {
    emailReceivers.push(receiver);
  } else {
    throw res
      .status(400)
      .send({ message: "Could not find receiver: " + newEmail.to });
  }
  if (newEmail.cc) {
    for (const ccEmail of newEmail.cc) {
      let ccedPerson = await UserModel.findOne({ email: ccEmail });
      if (ccedPerson) {
        emailReceivers.push(user);
      } else {
        return res
          .status(400)
          .send({ message: "could not find a cced person: " + ccEmail });
      }
    }
  }

  //send to sender
  newEmail.isRead = true;
  let success = await sendee.addNewInboxEmail(newEmail);
  if (!success) {
    return res
      .status(400)
      .send({ message: "Could not find your user account." });
  }
  //send to receivers
  newEmail.isRead = false;
  let unsentEmails = [];
  for (const emailReceiver of emailReceivers) {
    let success = await emailReceiver.addNewSentItem(newEmail);
    if (!success) {
      unsentEmail.push(emailReceiver.email);
    }
  }
  if (unsentEmails) {
    //not empty, so some one did not get the email, respond
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
      .send({ message: "sent message to everyone except: " + str + "." });
  }

  return res.status(200).send({ message: "message successfully sent." });
});

router.post("/viewEmail", async function (req, res) {
  let { email, isInbox, index } = req.body;
  if (!email || !isInbox || !index) {
    return res.status(400).json({ message: "incorrect request" });
  }
  isInbox = isInbox == "true"; //change to boolean, sometimes it comes off as string
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "could not find user" });
    }

    const requestedEmail = await user.viewEmail(isInbox, index);
    return res.status(200).send({ requestedEmail });
  } catch (error) {
    console.log("error in /viewEmail: ", error);
    return res.status(400).json({ message: "error in viewing email" });
  }
});

router.post("/deleteAccount", async function (req, res) {
  let { email, deletionSecretKey, emailToDelete } = req.body;
  if (!email || !deletionSecretKey) {
    return res.status(400).send({ message: "improper request" });
  }
  if (deletionSecretKey != process.env.DELETION_SECRET_KEY) {
    return res.status(400).send({ message: "wrong secret key" });
  }
  try {
    await UserModel.deleteOne({ email: emailToDelete });
    return res.status(200).send({ message: "account deleted" });
  } catch (error) {
    return res.status(400).send({
      message: "could not delete",
      error_message: error.message,
    });
  }
});

router.post("/getAllAccountEmails", async function (req, res) {
  let { email, isSpecialist } = req.body;
  if (!email || !isSpecialist) {
    return res.status(400).send({ message: "improper request" });
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
    return res.status(400).send({ message: "could not find all accounts." });
  }
});

module.exports = router;
