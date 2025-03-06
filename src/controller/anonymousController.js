const anonymousServices = require("../services/anonymousServices")
const Anonymous = require("../models/Anonymous")

exports.anonymousSuggestion = async (req, res) => {
  try {
    const result = await anonymousServices.AnonymousSuggestion(req.body)
    res.status(200).json({message: "suggestion sent successfully", result})
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

exports.ResponseMessage = async (req, res) => {
  try {
    const result = await anonymousServices.responseMessage(req.body, req.params)
    res.status(200).json({message: "response sent successfully", result})
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

exports.AnonymousSuggestionByDepartment =  async (req, res) => {
  const { department } = req.params;

  try {
    const suggestions = await Anonymous.find({ department });
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAllSuggestion =  async (req, res) => {

  try {
    const suggestions = await Anonymous.find();
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}