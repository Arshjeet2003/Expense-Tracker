const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
var dotenv = require('dotenv')

dotenv.config();
connectToMongo();

const app = express()
const port = process.env.PORT || 9000;

app.use(cors())
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/transactions',require('./routes/transactions'));
app.use('/api/friends',require('./routes/friends'));
app.use('/api/groups',require('./routes/groups'));
app.use('/api/financialGoals',require('./routes/financialGoals'));
app.use('/api/stocks',require('./routes/stocks'));

app.listen(port, () => {
  console.log(`Expense Tracker listening to http://localhost:${port}`)
})