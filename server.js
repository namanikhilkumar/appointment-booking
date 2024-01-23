const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const users = [];
const bookedSlots = [];

app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// User registration endpoint
app.post('/register', (req, res) => {
  const { name, username, password } = req.body;
  users.push({ name, username, password });
  res.json({ message: 'Registration successful' });
});

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get available slots endpoint
app.get('/slots', (req, res) => {
  const availableSlots = ['Slot 1', 'Slot 2', 'Slot 3'];
  res.json({ slots: availableSlots });
});

// Book slot endpoint
app.post('/book', (req, res) => {
  const { username, slot } = req.body;
  bookedSlots.push({ username, slot });
  res.json({ message: 'Slot booked successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
