/*
 * model.js
 * Humaid M. Agowun
 * FIle that creates our mongoose Schema
 * It then exports the model
 */

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

//Schema used by inbox and sentItems keys
const EmailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  from: { type: String, required: true },
  cc: [{ type: String }],
  subject: { type: String },
  body: { type: String },
  isUrgent: { type: Boolean },
  isRead: { type: Boolean },
});

// Schema actually stored in the database
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isSpecialist: { type: Boolean },
  password: { type: String, required: true },
  inbox: [EmailSchema],
  sentItems: [EmailSchema],
});

/*
 * method to check if passowrd is valid
 * Used when logging in a user.
 * Humaid M. Agowun (A00430163)
 */
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const comparison = await bcrypt.compare(password, user.password);
  return comparison;
};

/*
 * Method to change the urgency of an email in the user's inbox or sentItems.
 * Called when user clicks the 'TO DO' button.
 * Humaid M. Agowun (A00430163)
 */
UserSchema.methods.changeUrgency = async function (isInbox, index) {
  const user = this;
  const which = isInbox ? "inbox" : "sentItems";

  let emails = user[which];
  let currentUrgency = emails[index].isUrgent;
  user[which][index].isUrgent = !currentUrgency;
  user.markModified(which); //required to tell mongoose to update nested array

  const err = await user.save().catch((err) => err);
  return err != null ? true : false;
};

/*
 * function to add a new email to the user's inbox array
 * Called when user is receiving an email
 * Humaid M. Agowun (A00430163)
 */
UserSchema.methods.addNewInboxEmail = async function (newEmail) {
  const user = this;

  user.inbox.unshift(newEmail);
  user.markModified("inbox");

  const err = await user.save().catch((err) => err);
  return err != null ? true : false;
};

/*
 * function to add a new email to the user's sentItems array
 * Called when user is sending an email
 * Humaid M. Agowun (A00430163)
 */
UserSchema.methods.addNewSentItem = async function (newEmail) {
  const user = this;

  user.sentItems.unshift(newEmail);
  user.markModified("sentItems");

  const err = await user.save().catch((err) => err);
  return err != null ? true : false;
};

/*
 * function called to remove email from the inbox or sentItems array
 * Called when deleteKEy clicked
 * Humaid M. Agowun (A00430163)
 */
UserSchema.methods.deleteEmail = async function (isInbox, index) {
  const user = this;
  const which = isInbox ? "inbox" : "sentItems";

  user[which].splice(index, 1);
  user.markModified(which);

  const err = await user.save().catch((err) => err);
  return err != null ? true : false;
};

/*
 * function called to viewEmail.
 * returns the email and changes the isRead to true.
 * Humaid M. Agowun (A00430163)
 */
UserSchema.methods.viewEmail = async function (isInbox, index) {
  const user = this;
  const which = isInbox ? "inbox" : "sentItems";

  const email = user[which][index];
  user[which][index].isRead = true;
  user.markModified(which);

  await user.save().catch((err) => err); //need to do something about this error!
  return email;
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
