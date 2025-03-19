const anonymousController = require("../controller/anonymouscontroller")
const {authenticatedUser} = require("../middlewares/authentication")

const express = require("express")
const router = express.Router()


router.get('/suggestion/:department',authenticatedUser, anonymousController.AnonymousSuggestionByDepartment);
router.post("/anonymous-suggestion", authenticatedUser, anonymousController.anonymousSuggestion);
router.patch("/suggestion/:id", authenticatedUser, anonymousController.ResponseMessage )
router.get('/suggestion',authenticatedUser, anonymousController.getAllSuggestion);

module.exports = router
