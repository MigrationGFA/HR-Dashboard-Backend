const helpCenter = require('../models/helpCenter');

exports.createSupportTicket = async (body) => {
  const {userId, reason, message, department} = body;

  const requiredFields = [
    'userId',
    'reason',
    'message',
    'department'
    ];
    
    // Check for missing fields
    for (const field of requiredFields) {
    if (!body[field]) {
    return { status: 400, data: { message: `${field} is required` } };
    }
  }
  const supportTicket = await helpCenter.findOne({userId})
  if(supportTicket) {
    return {error: 'Support ticket already exists'}
  }
    
  const newSupportTicket = new helpCenter({userId, reason, message, department});
  await newSupportTicket.save();
}

exports.getAllTickets= async (status) => {
  const query = status ? { status } : {};
  return await helpCenter.find(query).sort({ createdAt: -1 });
}

exports.getSupportTicket = async (userId) => {
  const supportTicket = await helpCenter.find({ userId });
  if (!supportTicket) {
    return { status: 404, data: { message: 'Support ticket not found' } };
  }
}

exports.replyToTicket = async (ticketId, response) => {
  const supportTicket =  await helpCenter.findByIdAndUpdate(
    ticketId,
    { response, status: "completed" },
    { new: true }
  );
  if (!supportTicket) {
    return { status: 404, data: { message: 'Support ticket not found' } };
  }
}
