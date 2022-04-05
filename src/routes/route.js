const express = require('express');
const router = express.Router();
const urlController=require("../controllers/maincontroller")

router.post("/url/shorten",urlController.createUrl)
router.get("/:urlCode",urlController.getUrlcode)




module.exports = router;