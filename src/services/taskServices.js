const Task = require("../models/Task")
const User = require("../models/User")

exports.taskServices = async (body) => {
  const {
    name,
    assignerId,
    assigneeId,
    duration,
    startingDate,
    endDate,
    shortDescription,
  } = body

  const task = await Task.findOne({assignerId})
  if(task) {
    throw new Error("task already exist")
  }
  if (
    !name ||
    !assignerId ||
    !assigneeId ||
    !duration ||
    !startingDate ||
    !endDate ||
    !shortDescription
  ) {
    throw new Error('All fields are required');
  }

  const assigneeUser = await User.findById(assigneeId);
  if (!assigneeUser) {
    throw new Error('Assignee user not found');
  }

   const newTask = new Task({
    name,
    assignerId,
    assigneeId,
    duration,
    startingDate,
    endDate,
    shortDescription,
    team: assigneeUser.team,
    department: assigneeUser.department,
  });

  await newTask.save();
  return newTask
}