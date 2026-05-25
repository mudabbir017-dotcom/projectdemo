const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Load Firebase service account
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<YOUR-DATABASE-NAME>.firebaseio.com"
});

const db = admin.database();
const usersRef = db.ref('users');

const app = express();
app.use(bodyParser.json());

/**
 * CREATE User
 */
app.post('/users', async (req, res) => {
  try {
    const { id, name, email, age } = req.body;

    await usersRef.child(id).set({
      name,
      email,
      age
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * READ All Users
 */
app.get('/users', async (req, res) => {
  try {
    const snapshot = await usersRef.once('value');
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * READ Single User
 */
app.get('/users/:id', async (req, res) => {
  try {
    const snapshot = await usersRef.child(req.params.id).once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * UPDATE User
 */
app.put('/users/:id', async (req, res) => {
  try {
    await usersRef.child(req.params.id).update(req.body);
    res.json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE User
 */
app.delete('/users/:id', async (req, res) => {
  try {
    await usersRef.child(req.params.id).remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * REALTIME LISTENER (optional)
 */
usersRef.on('value', (snapshot) => {
  console.log("Realtime DB change:", snapshot.val());
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});