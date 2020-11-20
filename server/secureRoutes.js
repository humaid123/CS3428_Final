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
    return res.status(400).json({ message: "incorrect request" });
  }
  if (!newEmail.from) newEmail.from = email;
  if (!newEmail.isUrgent) newEmail.isUrgent = false;
  try {
    if (!newEmail.isRead) newEmail.isRead = true;
    let user = await UserModel.findOne({ email });
    let success = await user.addNewSentItem(newEmail);
    if (!success) throw new Error({ message: "cannot add to sender" });

    newEmail.isRead = false;
    const toEmail = newEmail.to;
    user = await UserModel.findOne({ email: toEmail });
    success = await user.addNewInboxEmail(newEmail);
    if (!success) throw new Error({ message: "cannot add to main receiver" });

    const ccEmails = newEmail.cc;
    if (ccEmails) {
      //if empty array, this is not read
      for (const ccEmail of ccEmails) {
        user = await UserModel.findOne({ email: ccEmail });
        success = await user.addNewInboxEmail(newEmail);
        if (!success) throw new Error({ message: "cannot add to a cced" });
      }
    }
    res.status(200).send({ message: "new Email sent successful" });
  } catch (thrownErr) {
    res.status(400).send({ message: thrownErr.message });
  }
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
