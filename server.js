const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config(); // .env dosyasını yükle

const app = express();
app.use(express.json()); // JSON verilerini işleyebilmek için

app.use("/api", authRoutes); // Auth rotalarını bağla

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
