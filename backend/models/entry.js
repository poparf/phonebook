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
  name: String,
  number: String,
});

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Phonebook", phoneBookSchema);
