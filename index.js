require('dotenv').config();
const express = require("express");

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// let allowedOrigins = [
//   'https://localhost:3000',
//   'http://localhost:3000',
// ]

app.use(cors());
app.use(express.json());

// Routes
const { profile, avatar, banner, badge } = require("./routes/routes");

// Default route
app.get("/", (req, res) => {
  res.send("Bienvenido a la API para obtener el perfil, avatar y banner de un usuario de Discord, usa /api/profile/:id, /api/avatar/:id o /api/banner/:id para obtener la información");
});
app.use('/api/profile', profile);
app.use('/api/avatar', avatar);
app.use('/api/banner', banner);
app.use('/api/badge', badge);

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});