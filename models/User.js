const db = require("../config/db");

class User {
  static async createUser(username, email, passwordHash) {
    if (!username || !email || !passwordHash) {
      throw new Error("Geçersiz kullanıcı verisi");
    }

    const [result] = await db.execute(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, passwordHash]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }
  static async findById(id) {
    const [rows] = await db.execute(
      "SELECT id, username, email FROM user WHERE id = ?",
      [id]
    );
    return rows[0]; 
  }
}

module.exports = User;
