const router = require("express").Router();
const book = require("../Modules/bookModal");

router.post("/", async (req, res) => {
    const { name, image, author, description, price } = req.body;

    try {
        const newBook = await book.create({
            name,
            image,
            author,
            description,
            price
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/all", async (req, res) => {
    try {
        const data = await book.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/display", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const data = await book.find().limit(limit);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/search/", async (req, res) => {
    try {
        console.log('Handling search request');
        const { q } = req.query;
        const searchResults = await book.find({ name: { $regex: new RegExp(q, 'i') } });
        res.status(200).json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const bookById = await book.findById(id);
        if (!bookById) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(bookById);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
