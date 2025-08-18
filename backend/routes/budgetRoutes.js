const express = require("express");
const Budget = require("../models/Budget");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get current budget for user
router.get("/get", protect, async (req, res) => {
  try {
    const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    const budget = await Budget.findOne({ userId: req.user.id, month });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget" });
  }
});

// Add budget
router.post("/add", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const month = new Date().toISOString().slice(0, 7);

    let budget = await Budget.findOne({ userId: req.user.id, month });
    if (budget) {
      return res.status(400).json({ message: "Budget already exists. Use update instead." });
    }
    budget = await Budget.create({ userId: req.user.id, amount, month });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error adding budget" });
  }
});

// Update budget
router.put("/update", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const month = new Date().toISOString().slice(0, 7);

    let budget = await Budget.findOne({ userId: req.user.id, month });
    if (!budget) {
      return res.status(404).json({ message: "No budget found to update" });
    }

    budget.amount = amount;
    await budget.save();

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error updating budget" });
  }
});

// Delete budget
router.delete("/delete", protect, async (req, res) => {
  try {
    const month = new Date().toISOString().slice(0, 7);
    await Budget.findOneAndDelete({ userId: req.user.id, month });
    res.json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting budget" });
  }
});

module.exports = router;
