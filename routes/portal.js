const express = require('express');
const router = express.Router({mergeParams:true})
const portalController =require('../controllers/portalController')
router.route("/")
.get(portalController.getPortal)

router.route("/coins")
.get(portalController.getCoin)

module.exports = router;