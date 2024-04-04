const express = require("express");
const UserModel = require("../model/user.model");

const userRouter = express.Router();


userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error" })
    }
})
userRouter.post("/", async (req, res) => {
    const { name, title, address } = req.body
    try {
        const newuser = new UserModel({ name, title, address });
        await newuser.save();
        res.status(200).send(newuser);
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error" })
    }
})

module.exports = userRouter