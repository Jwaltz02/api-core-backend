const Training = require('../models/Training'); // Make sure this file exists!

const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);

    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    res.status(200).json({ message: 'Training deleted successfully' });
  } catch (err) {
    console.error('Delete Training Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  deleteTraining, // ✅ Exported properly
};
