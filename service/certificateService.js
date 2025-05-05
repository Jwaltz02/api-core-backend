const Certificate = require("../models/certificate");

exports.createCertificatesBulk = async (certificatesData) => {
    try {
        const certificateEntries = Object.values(certificatesData);

        // Validate each certificate entry
        const requiredFields = ["name", "role", "email", "team"];

        for (const [index, cert] of certificateEntries.entries()) {
            for (const field of requiredFields) {
                if (!cert[field] || typeof cert[field] !== "string" || cert[field].trim() === "") {
                    throw new Error(`Field "${field}" is missing or invalid in entry at index ${index}`);
                }
            }
        }

        // Create and insert all certificates
        const insertedCertificates = await Certificate.insertMany(certificateEntries);

        return { message: "Certificates uploaded successfully", data: insertedCertificates };

    } catch (error) {
        console.error("Error uploading certificates:", error.message);
        throw new Error(error.message);
    }
};