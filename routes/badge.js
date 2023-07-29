const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:id", (req, res) => {
    const badgeId = req.params.id;

    axios({
        method: "GET",
        url: `https://cdn.discordapp.com/badge-icons/${badgeId}`,
        responseType: "arraybuffer",
        headers: {
            "Content-Type": "image/*",
        },
    }).then(response => {
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

        // Enviar la imagen como respuesta en la API
        res.set("Content-Type", contentType);
        res.send(response.data);
    }).catch(error => {
        console.error("Error en la petición:", error.message);
        res.status(500).send("Error al obtener el badge icon");
    });
});

module.exports = router;