const taskController = require("../controller/taskController")
const {authenticatedUser} = require("../middlewares/authentication")

const express = require("express")
const router = express.Router()

router.post("/task", authenticatedUser, taskController.TaskServices)
router.get("/task/:department", authenticatedUser, taskController.getTaskByDepartment)
router.get("/task/:team", authenticatedUser, taskController.getTaskByTeam)
router.get("/task/:userId", authenticatedUser, taskController.getTaskByUser)

module.exports = router