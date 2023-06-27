const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mds:mds@mds.s2xayhf.mongodb.net/mds", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Unable to connect with DB.", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;