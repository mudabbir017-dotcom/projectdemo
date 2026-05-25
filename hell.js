const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "mysecretkey";

// Dummy user (for demo)
const USER = {
  id: 1,
  username: "hasan",
  password: "1234"
};

// 🔐 LOGIN ROUTE → Generates JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    const token = jwt.sign(
      { id: USER.id, username: USER.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// 🔒 Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  });
}

// 🔐 PROTECTED ROUTE
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});