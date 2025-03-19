const express = require('express');
const helpCenterController = require('../controller/helpCenterController');
const {authenticatedUser} = require('../middlewares/authentication');
const router = express.Router();

router.post('/createSupportTicket', authenticatedUser, helpCenterController.createTicket);
router.get('/getSupportTicket', authenticatedUser, helpCenterController.getSupportTickets);
router.get('/getTicketsByUser/:userId', authenticatedUser, helpCenterController.getSupportTicket);
router.put('/replyToTicket/:ticketId', authenticatedUser, helpCenterController.updateSupportTicket);

module.exports = router;