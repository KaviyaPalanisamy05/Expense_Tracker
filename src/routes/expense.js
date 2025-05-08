const express = require('express');
const { createExpense } = require('../models/expenseModel');
const { deleteExpense } = require('../models/expenseModel');
const { updateExpense } = require('../models/expenseModel');
const { pageExpense } = require('../models/expenseModel');
const { createUser } = require('../models/expenseModel');
const { loginUser } = require('../models/expenseModel');
const router = express.Router();

router.post('/', async (req,res) => {
    // console.log({body: req.body});
    const {title,amount,category,date,notes} =req.body;
    const expense=await createExpense(title,amount,category,date,notes);
    res.send(expense)
});

router.delete('/:id',async(req,res)=>{
    const _id =req.params.id;
    const resp = await deleteExpense(_id);
    res.send(resp);
});
router.put('/:id',async(req,res)=>{
    const {title,description} =req.body;
    const _id =req.params.id;
    const Expense=await updateExpense(_id,title,description);
    res.send(Expense);
});
router.get('/',async(req,res)=>{
    const page = req.query.page;
    const limit = req.query.limit;
    const Expense=await pageExpense(page,limit);
    res.send(Expense);
});

// User Authentication
router.post('/account', async (req,res) => {
    // console.log({body: req.body});
    const {username,pass} =req.body;
    const user=await createUser(username,pass);
    res.send(user)
});

router.post('/login', async (req,res) => {
    // console.log({body: req.body});
    const {username,pass} =req.body;
    const user=await loginUser(username,pass);
    if(user){
    res.send("Login Successful");
    }
    else{
        res.send("User Not Found");
    }
});

module.exports = router;
