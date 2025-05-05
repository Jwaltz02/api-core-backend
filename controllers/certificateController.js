const CertificateService = require("../service/certificateService");

exports.uploadBulkCertificates = async (req, res) => {
  try {
    const response = await CertificateService.createCertificatesBulk(req.body);
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error uploading certificates:", error.message);
    return res.status(500).json({ error: "Failed to upload certificates. " + error.message });
  }
};