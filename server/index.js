const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
var dotenv = require('dotenv')

dotenv.config();
connectToMongo();

const app = express()
const port = process.env.PORT || 5004

app.use(cors())
app.use(express.json());


app.listen(port, () => {
  console.log(`Get Pet app listening to http://localhost:${port}`)
})