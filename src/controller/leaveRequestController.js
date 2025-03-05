const leaveRequestServices = require("../services/leaveRequestServices")

exports.leaveRequest = async (req, res) => {
  try {
    const result = await leaveRequestServices.LeaveRequest(req.body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}