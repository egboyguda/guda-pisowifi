const express = require('express');
const router = express.Router({mergeParams:true})
const portalController =require('../controllers/portalController')
router.route("/")
.get(portalController.getPortal)
.post(portalController.authClient)

module.exports = router;