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
    }).then(response => {
        return res.send(response.data);
    })
    .catch(error => {
        console.error("Request Error:", error.message);
        return res.status(500).send("Error retrieving user profile");
    });
});

module.exports = router;