require('dotenv').config();
const express = require("express");

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

/**
 * ? DMs Discord khaidev.121007 to join allowedOrigins
 */

let allowedOrigins = [
  'http://localhost:3000',
  'https://khaidev.vercel.app',
  'https://lamdev.vercel.app',
  'https://noflexzone.vercel.app'
]

var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const { profile, avatar, banner, badge } = require("./routes/routes");

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API to get Discord user's profile, avatar and banner, use /api/profile/:id, /api/avatar/:id or /api/banner/:id to get the information believe");
});
app.use('/api/profile', profile);
app.use('/api/avatar', avatar);
app.use('/api/banner', banner);
app.use('/api/badge', badge);

app.listen(port, () => {
  console.log(`Listening on Port :: ${port}`);
});