const express = require('express')
const mongoose = require('mongoose')
const routes = require('./Router')
const app = express()
const uri = 'mongodb+srv://morenobellini15:Rsym5940228@cluster0.m6juikz.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('connected to mongodb');
  }
  catch (err) {
    console.error(err);
  }
}
connect();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server started on port 5000"));
app.use(express.json())
app.use('', routes)
