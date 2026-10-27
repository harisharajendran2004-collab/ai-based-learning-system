
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Skillora Backend!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Skillora server is running"
  });
});

app.listen(PORT, () => {
  console.log(`Skillora backend running on http://localhost:${PORT}`);
});