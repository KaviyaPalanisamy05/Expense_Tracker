const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: Date,
  notes: String
}, {
  timestamps: true
});
const expenseModel = mongoose.model(`expense`, expenseSchema);


const userSchema = new mongoose.Schema({
  username: String,
  pass: String,
}, {
  timestamps: true
});
const userModel = mongoose.model(`account`, userSchema);


async function createExpense(title, amount, category, date, notes) {
  const expense = await expenseModel.create(
    {
      title,
      amount,
      category,
      date,
      notes
    });
  return expense;
}

async function deleteExpense(_id) {
  const deleteResp = await expenseModel.deleteOne({ _id });
  return deleteResp;
}

async function updateExpense(_id,title,description){
  const updated = await expenseModel.updateOne({
    _id,
  },{
    title,
    description
  });
  return updated;
}

async function pageExpense(page,limit){
  const skip = (page - 1) * limit;
  const Expenses = await expenseModel.find().skip(skip).limit(limit);
  return Expenses;
}

//User Authentication
async function createUser(username, pass) {
  const user = await userModel.create(
    {
      username,
      pass,
    });
  return user;
}

async function loginUser(user, passwd) {
  const check = await userModel.find({
    username: user,
    pass : passwd
  })
  if (check.length > 0){
    return true;
  }
  else{
    return false;
  }
}


module.exports = {
  createExpense,
  deleteExpense,
  updateExpense,
  pageExpense,
  createUser,
  loginUser
}
