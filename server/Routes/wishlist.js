const express = require('express');
const router = express.Router();
const user = require('../Modules/userModal');

// Post route
router.post("/", async (req, res) => {
    const { email } = req.user
    const { wishlist } = req.body;
    wishlist._id = (new Date().getTime()).toString();

    try {
        const userWithList = await user.findOne({ email: email });

        if (!userWithList) {
            return res.status(400).json({ "error": [{ "msg": "Email Not Found", }] });
        } else {
            userWithList.wishlist.push(wishlist);
            await userWithList.save();
            return res.status(200).json({ "message": "Item added to the cart successfully", "user": userWithList });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ "error": [{ "msg": "Internal server error.", }] });
    }
});

router.get("/all", async (req, res) => {
    const { wishlist } = req.user;
    try {
        res.status(200).json({ wishlist: wishlist })
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({"error": [{"msg": "Internal server error.",}]});
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { user_Id } = req.user;
    const { id } = req.params;

    try {
        const userWithWishlist = await user.findOneAndUpdate( 
            {_id: user_Id},
            {
                 $pull:{ wishlist: {_id: id }  }
            },
            { new: true}
        );
        if (!userWithWishlist) {
            return res.status(400).json({"error": [{"msg": "Item not found.",}]});
        }else{
            return res.status(200).json({"Message": [{"msg": "Item deleted successfully.",}]});
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({"error": [{"msg": "Internal server error.",}]});
    }
});


module.exports = router;
