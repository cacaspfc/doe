const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const routes = require("./routes.js");

process.setMaxListeners(10);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(
  "mongodb+srv://root:root@cluster0-huzkm.mongodb.net/doeparceiro?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(8000);
