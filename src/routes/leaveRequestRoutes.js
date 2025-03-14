const leaveRequestContoller = require("../controller/leaveRequestController")
const {authenticatedUser, hrAuthentication} = require("../middlewares/authentication")

const express = require("express")
const router = express.Router()

router.post("/leave-request", authenticatedUser, leaveRequestContoller.leaveRequest)
router.patch("/approve-leave/:leaveId", authenticatedUser, hrAuthentication, leaveRequestContoller.approveLeave)
router.patch("/reject-leave/:leaveId", authenticatedUser, hrAuthentication, leaveRequestContoller.rejectLeave)

module.exports = router