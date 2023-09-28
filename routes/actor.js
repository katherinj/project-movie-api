const express = require("express");
const Actor = require("../models/actor");
const router = express.Router();

router.get("/:actorId", async (req, res, next) => {
  try {
    const { actorId } = req.params;
    const actor = await Actor.fetchActorById(actorId);
    return res.status(200).json({ actor });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
