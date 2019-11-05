const express = require("express");
const router = express.Router();

// Load input validation
const validateTodoInput = require("../../validation/todo");

// Load Todo model
const Todo = require("../../models/Todo");


// @route GET api/todos/:userId
// @desc Get todos by user
router.get("/:userId", (req, res) => {
  Todo.find({ userId: req.params.userId })
    .then(todos => res.json(todos))
});


// @route POST api/todos
// @desc Create todo
router.post("/", (req, res) => {
  // Form validation
  const { errors, isValid } = validateTodoInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newTodo = new Todo({
    name: req.body.name,
    userId: req.body.userId,
  });

  newTodo.save()
  .then(user => res.json(user))
  .catch(err => console.log(err));
});


// @route PATCH api/todos/:id
// @desc update todo
router.patch("/:id", (req, res) => {
  Todo.findOne({ _id: req.params.id })
  .then(todo => {
    todo.completed = req.body.completed
    todo.save().then(todo => res.json(todo))
  })
  .catch(err => res.status(500).json({ error: err }));
});


// @route DELETE api/todos
// @desc update todo
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).json({ error: err });
  })
  .then(() => res.sendStatus(200) )
  .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
