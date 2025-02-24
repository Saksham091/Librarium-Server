const router = require("express").Router();
const book = require("../Modules/bookModal");

router.post("/", async (req, res) => {
    console.log(req.body);
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
        const book = await book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
