const express = require("express");
const router = express.Router();

const {
  getLeads,
  createLead,
  updateLeadStatus
} = require("../controllers/leadController");

router.get("/", getLeads);

router.post("/", createLead);

// Update status
router.put("/:id", updateLeadStatus);

module.exports = router;