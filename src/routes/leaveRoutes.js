const leaveRequestContoller = require("../controller/leaveRequestController")
const authMiddleware = require("../middlewares/authentication")

const express = require("express")
const router = express.Router()

router.post("/leave-request", authMiddleware, leaveRequestContoller.leaveRequest)

module.exports = router