const router = require("express").Router();
const path = require("path");

const ExtensionController = require('../controllers/ExtensionController');

router.get("/run_script/extension/patient/:id", ExtensionController.runScriptByPatientId);

router.get("/run_script/extension/observation/:id", ExtensionController.runScriptByObservationId);

module.exports = router;