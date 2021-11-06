const app = require("express")();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({
    name: "Shyam Sahoo",
    age: 24,
    gender: "Male",
    phone: "9777944995",
    pincode: "769003",
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
