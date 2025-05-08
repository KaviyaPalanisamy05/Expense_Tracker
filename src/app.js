const express = require('express');
require("./db/mongo")
const app = express();
const path = require('path');

app.use(express.json());
app.use('/expenses', require('./routes/expense'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running in Port ${PORT}`);
});
