const express = require('express');
const router = express.Router();
const user = require('../Modules/userModal');

// Post route
router.post("/", async (req, res) => {
    const { email, wishlist } = req.body;

    try {
        const userWithList = await user.findOne({ email: email });

        if (!userWithList) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            userWithList.wishlist.push(wishlist);
            await userWithList.save();
            return res.status(200).json({
                "message": "Item added to the cart successfully",
                "user": userWithList
            });
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

    const { email } = req.query;

    try {
        const userWithList = await user.findOne({ email: email });

        if (!userWithList) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            const result = userWithList.wishlist
            res.status(200).json({wishlist:result})
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

router.delete("/delete", async (req, res) => {
    const { email } = req.body;

    try {
        const userWithWishlist = await user.findOne({ email: email });

        if (!userWithWishlist) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            await userWithWishlist.updateOne({ $unset: { wishlist: 1 } });
            return res.status(200).json({
                "message": "Wishlist removed successfully",
            });
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


module.exports = router;
