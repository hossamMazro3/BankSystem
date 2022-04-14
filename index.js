const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const customers = require("./route/customer")

const app = express();

mongoose.connect(
    "mongodb://localhost:27017/Bank",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err, db) => {
      if (err) throw err;
      else {
        console.log("connection establish successfully");
      }
    }
  );
mongoose.Promise = global.Promise;

app.use( express.static(path.resolve(__dirname, "assets")));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/',customers);

app.listen(process.env.PORT||3000, () => {
  console.log("the server is running");
});
