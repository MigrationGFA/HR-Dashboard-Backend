const helpCenterServices = require('../services/helpCenterServices');

exports.createTicket = async (req, res) => {
  try {
    const response = await helpCenterServices.createSupportTicket(req.body);
    return res.status(201).json({message: 'Support ticket created successfully'});
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: error.message});
  }
}

exports.getSupportTickets = async (req, res) => {
  try {
    const response = await helpCenterServices.getAllTickets();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

exports.getSupportTicket = async (req, res) => {
  try {
    const response = await helpCenterServices.getSupportTicket(req.params.userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

exports.updateSupportTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { response } = req.body;
    const updatedTicket = await helpCenterServices.replyToTicket(ticketId, response);
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json(updatedTicket);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}