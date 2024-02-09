const router = require("express").Router();
const user = require("../Modules/userModal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, password, email } = req.body;

    // Velidating If The Email Already Exist

    try {
        const foundUser = await user.findOne({ email: email });


        if (foundUser) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Already Exists",
                    }
                ]
            });
        } else {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            });

            const token = await jwt.sign({
                email
            }, process.env.Key , {
                expiresIn: 3600000
            })

            res.send(`Welcome New User ~ ${token}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json
    }
});

// For Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const oldUser = await user.findOne({ email: email });

        if (!oldUser) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            let valid = await bcrypt.compare(password, oldUser.password);

            if (!valid) {
                return res.status(400).json({
                    "error": [
                        {
                            "msg": "Wrong Password",
                        }
                    ]
                });
            } else {
                const token = await jwt.sign({
                    email
                }, process.env.Key, {
                    expiresIn: 3600000
                })

                res.status(200).json({token:`${token}`});
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({
            "error": [
                {
                    "msg": "Internal server error.",
                }
            ]
        });
    }
});

router.get("/all", async (req, res) => {
    try {
        const data = await user.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router