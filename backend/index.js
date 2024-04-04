const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/user.routes");
const connection = require("./db");
app.use("/user",userRouter);

app.listen(8080, async () => {
    try {
        await connection
        console.log("db is connected.");
    } catch (error) {
        console.log(error);
    }
})