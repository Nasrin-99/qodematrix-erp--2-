import express from "express";

const router = express.Router();

// ================= GET ALL =================
router.get("/subscriptions", async (req, res) => {
  try {
    const data = [
      {
        id: 1,
        name: "Basic Plan",
        price: 100,
        features: ["Feature 1", "Feature 2"]
      },
      {
        id: 2,
        name: "Premium Plan",
        price: 500,
        features: ["Feature A", "Feature B"]
      }
    ];

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= CREATE =================
router.post("/subscriptions", (req, res) => {
  res.json({ message: "Created" });
});

// ================= UPDATE =================
router.put("/subscriptions/:id", (req, res) => {
  res.json({ message: "Updated" });
});

// ================= DELETE =================
router.delete("/subscriptions/:id", (req, res) => {
  res.json({ message: "Deleted" });
});

export default router;