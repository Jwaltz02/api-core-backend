const express = require("express");
const router = express.Router();
const CertificateController = require("../controllers/certificateController");
const verifySession = require("../middlewares/authenticationMiddleware");

// Bulk upload route for certificates
router.post("/addBulkCertificate", verifySession, CertificateController.uploadBulkCertificates);

module.exports = router;