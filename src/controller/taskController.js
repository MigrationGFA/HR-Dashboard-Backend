const taskServices = require("../services/taskServices")
const Task = require("../models/Task")

exports.TaskServices = async (req, res) => {
  try {
    const result = await taskServices.taskServices(req.body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

exports.getTaskByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ assigneeId: userId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getTaskByTeam = async (req, res) => {
  const { team } = req.params;

  try {
    const tasks = await Task.find({ team });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getTaskByDepartment = async (req, res) => {
  const { department } = req.params;

  try {
    const tasks = await Task.find({ department });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}