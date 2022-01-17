const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            "username":req.body.username,
            "email": req.body.email
        },
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;