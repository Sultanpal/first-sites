const express = require("express");
const cors = require('cors');
const { createUser, userSchemaZod, loginUser } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signUp", async function (req, res) {
    try {
        const result = await createUser(req.body);

        if (!result.success) {
            return res.status(400).send(result.message);
        }

        res.send("User created successfully");

    } catch(error) {
        console.error("Database error:", error);
    }
}
)

app.post("/login",async function (req, res) {
    try {
        const result = await loginUser(req.body);

        if (!result.success) {
            return res.status(400).send(result.message);
        }

        res.send("user login successfully!!");


    } catch {
        res.status(400).json({
            msz: "somthing error"
        })
    }
})
app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});

