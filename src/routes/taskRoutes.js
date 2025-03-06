const taskController = require("../controller/taskController")
const authMiddleware = require("../middlewares/authentication")

const express = require("express")
const router = express.Router()

router.post("/task", authMiddleware, taskController.TaskServices)
router.get("/task/:department", authMiddleware, taskController.getTaskByDepartment)
router.get("/task/:team", authMiddleware, taskController.getTaskByTeam)
router.get("/task/:userId", authMiddleware, taskController.getTaskByUser)

module.exports = router