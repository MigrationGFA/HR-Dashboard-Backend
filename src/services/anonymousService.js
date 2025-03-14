const Anonymous = require("../models/Anonymous")

exports.AnonymousSuggestion = async (body) => {
  const { department, suggestion, additionalDetails } = body;

  if (!department || !suggestion) {
    throw new Error('Department and suggestion are required');
  }

  const newSuggestion = new Anonymous({
    department,
    suggestion,
    additionalDetails: additionalDetails || '',
  });

  await newSuggestion.save();
  return newSuggestion;
}

exports.responseMessage = async (body, params) => {
  const { id } = params;
  const { responseMessage } = body;

  if (!responseMessage) {
    throw new Error('Response message is required');
  }

  const suggestion = await Anonymous.findByIdAndUpdate(
    id,
    { responseMessage },
    { new: true }
  );

  if (!suggestion) {
    throw new Error('Suggestion not found');
  }

  return suggestion;

}
