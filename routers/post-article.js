const express = require("express");
const axios = require("axios");

const FormData = require("form-data");

const router = express.Router();

router.post("/post", async (req, res) => {
  const form = new FormData();

  const { authorization } = req.headers;

  form.append("subject", encodeURI(req.body.subject));
  form.append("content", encodeURI(req.body.content));

  const apiUrl = `https://openapi.naver.com/v1/cafe/${process.env.CLUB_ID}/menu/${process.env.MENU_ID}/articles`;

  try {
    const { data } = await axios.post(apiUrl, form, {
      headers: {
        Authorization: authorization,
      },
    });

    res.json({ data });
  } catch (error) {
    const {
      status,
      data: { message },
    } = error.response;

    res.status(status).json({
      status: message.status,
      error: message.error,
    });
  }
});

module.exports = router;
