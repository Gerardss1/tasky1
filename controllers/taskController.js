const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const { completed } = req.query;

  let filter = { user: req.user };

  if (completed !== undefined) {
    filter.completed = completed === 'true';
  }

  const tasks = await Task.find(filter);
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ msg: 'El título es obligatorio' });
  }

  const task = await Task.create({
    title,
    user: req.user
  });

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ msg: 'No encontrada' });

  task.completed = !task.completed;
  await task.save();

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Tarea eliminada' });
};