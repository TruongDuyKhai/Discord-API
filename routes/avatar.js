const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:id", (req, res) => {
    const userId = req.params.id;

    axios({
      method: "GET",
      url: `https://discord.com/api/v9/users/${userId}/profile`,
      headers: {
        "authorization": process.env.TOKEN,
      },
    })
      .then(response => {
        const avatarId = response.data.user.avatar;
  
        if (!avatarId) {
          res.status(404).send("El usuario no tiene banner");
          return;
        }
  
        axios({
          method: "GET",
          url: `https://cdn.discordapp.com/avatars/${userId}/${avatarId}?size=2048`,
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "image/*",
          },
        })
          .then(response => {
            if (response.status !== 200) {
              throw new Error(`Network response was not ok. Status: ${response.status} ${response.statusText}`);
            }
  
            const contentType = response.headers["content-type"];
            let extension = "webp";
  
            if (contentType === "image/gif") {
              extension = "gif";
            } else if (contentType === "image/png") {
              extension = "png";
            } else if (contentType === "image/jpeg" || contentType === "image/jpg") {
              extension = "jpg";
            }
  
            res.set("Content-Type", contentType);
            res.send(response.data);
          })
          .catch(error => {
            console.error("Error en la petición:", error.message);
            res.status(500).send("Error al obtener la imagen del usuario");
          });
      })
      .catch(error => {
        console.error("Error en la petición:", error.message);
        res.status(500).send("Error al obtener el perfil del usuario");
      });
});

module.exports = router;