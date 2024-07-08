const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:id", (req, res) => {
    const userId = req.params.id;
    const token = req.query.token || process.env.TOKEN;

    axios({
      method: "GET",
      url: `https://discord.com/api/v9/users/${userId}/profile`,
      headers: {
        "authorization": token,
      },
    })
      .then(response => {
        const bannerId = response.data.user.banner;
  
        if (!bannerId) {
          res.status(404).send("User has no banner");
          return;
        }
  
        axios({
          method: "GET",
          url: `https://cdn.discordapp.com/banners/${userId}/${bannerId}?size=2048`,
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
            console.error("Request Error:", error.message);
            res.status(500).send("Error retrieving user image");
          });
      })
      .catch(error => {
        console.error("Request Error:", error.message);
        res.status(500).send("Error retrieving user profile");
      });
});

module.exports = router;