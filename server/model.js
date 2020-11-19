
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmailSchema = new Schema({
    to: {type: String, required: true},
    from: {type: String, required: true},
    cc: [{type: String}],
    subject: {type: String},
    body: {type: String},
    isUrgent: {type: Boolean},
    isRead: {type: Boolean}
});

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true}, 
    isSpecialist: {type: Boolean},
    password: {type: String, required: true},
});
UserSchema.add({
    inbox: [EmailSchema],
    sentItems: [EmailSchema]
});

console.log(UserSchema);

UserSchema.pre(
    'save', 
    async function(next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        console.log(hash);
        this.password = hash;
        next();
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    console.log("isValidPassword", password, user.password);
    const comparison = await bcrypt.compare(password, user.password);
    console.log(comparison);
    return comparison;
}

UserSchema.methods.changeUrgency = async function(isInbox, index) {
    const user = this;
    const which = (isInbox) ? "inbox" : "sentItems";
    let emails = user[which];
    let isUrgent = emails[index].isUrgent;
    user[which][index].isUrgent = !isUrgent;
    user.markModified(which);
    const err = await user.save().catch(err => err);
    return (err != null) ? true : false; 
}

UserSchema.methods.changeRead = async function(isInbox, index) {
    const user = this;
    const which = (isInbox) ? "inbox" : "sentItems";
    let emails = user[which];
    let isRead = emails[index].isRead;
    user[which][index].isRead = !isRead;
    user.markModified(which);
    const err = await user.save().catch(err => err);
    return (err != null) ? true : false; 
}

UserSchema.methods.addNewInboxEmail = async function(newEmail) {
    const user = this;
    user.inbox.unshift(newEmail);
    user.markModified("inbox");
    const err = await user.save().catch(err => err);
    return (err != null) ? true : false; 
}

UserSchema.methods.addNewSentItem = async function(newEmail) {
    const user = this;
    user.sentItems.unshift(newEmail);
    user.markModified("sentItems");
    const err = await user.save().catch(err => err);
    return (err != null)  ? true : false; 
}

UserSchema.methods.deleteEmail = async function(isInbox, index) {
    const user = this;
    const which = (isInbox) ? "inbox" : "sentItems";
    user[which].splice(index, 1);
    user.markModified(which);
    const err = await user.save().catch(err => err);
    return (err != null) ? true : false;
}

UserSchema.methods.viewEmail = async function(isInbox, index) {
    const user = this;
    const which = (isInbox) ? "inbox" : "sentItems";
    const email = user[which][index];
    user[which][index].isRead = true;
    user.markModified(which);
    const err = await user.save().catch(err => err);
    if (err) {
         console.log("error in saving for view Email: ", err);
    }
    console.log("requested email: ", email);
    return email;
}
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
