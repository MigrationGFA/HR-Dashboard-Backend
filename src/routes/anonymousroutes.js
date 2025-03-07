const anonymousController = require("../controller/anonymouscontroller")
const authMiddleware = require("../middlewares/authentication")

const express = require("express")
const router = express.Router()


router.get('/suggestion/:department',authMiddleware, anonymousController.AnonymousSuggestionByDepartment);
router.post("/anonymous-suggestion", authMiddleware, anonymousController.anonymousSuggestion);
router.patch("/suggestion/:id", authMiddleware, anonymousController.ResponseMessage )
router.get('/suggestion',authMiddleware, anonymousController.getAllSuggestion);

module.exports = router