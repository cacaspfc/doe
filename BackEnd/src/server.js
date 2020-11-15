require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const routes = require('./routes.js');
const moment = require('moment');

process.setMaxListeners(10);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(
  'mongodb+srv://root:root@cluster0.7npcu.mongodb.net/doeparceiro?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(process.env.PORT || 8000);
