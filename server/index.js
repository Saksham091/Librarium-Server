const express = require("express")
const auth = require("./Routes/auth")
const book = require("./Routes/book")
const payment = require("./Routes/payment")
const wishlist = require("./Routes/wishlist")
const cart = require("./Routes/cart")
const cors = require('cors');
const mongoose = require("mongoose")
const middleware = require("./Middlleware/auth")
const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/auth", auth)
app.use("/book", middleware, book)
app.use("/wishlist", middleware, wishlist)
app.use("/cart", middleware, cart)
app.use("/payment", payment)

mongoose.connect(process.env.MONGO_URL).then( () =>{
    app.listen(process.env.PORT, () =>{
        console.log(`Now running on port ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log(error);
})


app.get("/", (req ,res) => {
    res.send("Hi am working")
})


