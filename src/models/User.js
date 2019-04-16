const mongoose = require("mongoose");

// The user model that represents the fields stored in a single user JSON object.
var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 100,
    required: true
  },
  lastName: {
    type: String,
    maxlength: 100,
    required: true
  },
  email: {
    type: String,
    maxlength: 100,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
