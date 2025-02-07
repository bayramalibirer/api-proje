const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Gelen veri:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Lütfen tüm alanları doldurun" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(username, email, hashedPassword);
    res.status(201).json({ message: "Kullanıcı oluşturuldu!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Geçersiz kimlik bilgileri1" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Geçersiz kimlik bilgileri" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
