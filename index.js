const app = require("express")();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const name = parseInt(req.query["age"]);
    res.send({
        title: "Fullstack Developer",
        firstname: "Shyam",
        lastname: "Sahoo",
        age: name || 0,
        favourites: ["Java", "Python", "Javascript", "Go"]
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));