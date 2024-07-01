const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
let URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then((res) => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Connection failed.");
  });

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must have at least 3 characters."],
    required: true
  },
  number: {
    type: String,
    minLength: [8, "Phone number must have at least 8 digits."],
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d*/.test(v)
      },
      message: props => `${props.value} is not a valid phone number.`
    }
  }
});

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Phonebook", phoneBookSchema);
