const Lead = require("../models/Lead");

// Get all leads
exports.getLeads = async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
};

// Create lead
exports.createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
};

// Update lead status
exports.updateLeadStatus = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};