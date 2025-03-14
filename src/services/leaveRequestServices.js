const leaveRequest = require("../models/leaveRequest");

exports.LeaveRequest = async (body) => {
  const { userId, type, from, to, shortDescription, reportingOfficerId } = body;

  const leave = await leaveRequest.findOne({ userId });
  if (leave) {
    throw new Error("LeaveRequest Already exist");
  }

  if (isNaN(new Date(from))) {
    return res.status(400).json({ message: "Invalid FromDate format." });
  }

  if (isNaN(new Date(to))) {
    return res.status(400).json({ message: "Invalid toDate format." });
  }

  const newLeave = new leaveRequest({
    userId,
    type,
    from: new Date(from),
    to: new Date(to),
    shortDescription,
    reportingOfficerId,
  });
  await newLeave.save();
  return newLeave;
};