require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log("Request body:");
    console.log(req.body);
  }
  next();
});

// Routes
app.use("/api/courses", require("./src/routes/courseRoute"));
app.use("/api/users", require("./src/routes/userRoute"));

mongoose
  .connect(
    "mongodb+srv://test_user:test_password@cluster0.snvqjh4.mongodb.net/discuss?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`Listening on port 3000 and Connected to MongoDB`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
