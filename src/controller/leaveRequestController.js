const leaveRequestServices = require("../services/leaveRequestServices")
const Leave = require("../models/leaveRequest")
exports.leaveRequest = async (req, res) => {
  try {
    const result = await leaveRequestServices.LeaveRequest(req.body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


exports.approveLeave = async (req, res) => {
  const { leaveId } = req.params;

  try {
    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status: "approved" },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: "Leave approved successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "Error approving leave", error });
  }
};

exports.rejectLeave = async (req, res) => {
  const { leaveId } = req.params;

  try {
    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status: "rejected", },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: "Leave rejected successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting leave", error });
  }
};
