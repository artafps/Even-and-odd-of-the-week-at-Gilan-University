const mongoose = require("mongoose");

const { schema } = require("./Validation/startValid");

const userSchema = new mongoose.Schema({
  Tid: {
    type: String,
    unique: true,
  },
  global: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.startValid = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("start", userSchema);
