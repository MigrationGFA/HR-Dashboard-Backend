const mongoose = require('mongoose');

const anonymousSuggestionSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: String,
    default: '',
  },
  responseMessage: {
    type: String,
    default: '',
  },
});

const AnonymousSuggestion = mongoose.model('gfaAnonymousSuggestion', anonymousSuggestionSchema);

module.exports = AnonymousSuggestion;