const express = require("express");
const app = express();
const Pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override");
const port = 4000;

// MIDDLEWARE
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Pagination
// app.get("/poke", (req, res) => {
//   const page = req.query.page;
//   const limit = req.query.limit;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const result = Pokemon.splice(startIndex, endIndex);
//   res.render("posts/index.ejs", {
//     data: result,
//   });
// });

// ROUTES
// GET -- index page (Main Page)
// app.get("/poke", (req, res) => {
//   const result = Pokemon.splice(0, 8);
//   res.render("posts/index.ejs", {
//     data: result,
//   });
// });

// GET -- index page (Main Page)
app.get("/poke", (req, res) => {
  res.render("posts/index.ejs", {
    data: Pokemon,
  });
});

// GET -- new page (Create Pokemon Page)
app.get("/poke/new", (req, res) => {
  res.render("posts/new.ejs", {
    data: Pokemon,
  });
});

// GET -- show page (Pokemon Status)
app.get("/poke/:index", (req, res) => {
  res.render("posts/show.ejs", {
    data: Pokemon[req.params.index],
    index: req.params.index,
  });
});

// POST -- create new Pokemon
app.post("/poke", (req, res) => {
  console.log(req.body);
  Pokemon.unshift(req.body); //add to 1st item
  // Pokemon.push(req.body);
  res.redirect("/poke");
});

// DELETE
app.delete("/poke/:index", (req, res) => {
  Pokemon.splice(req.params.index, 1); //remove the item from the array
  res.redirect("/poke"); //redirect back to index route
});

// PUT -- update/replace edited Pokemon
app.put("/poke/:index", (req, res) => {
  Pokemon[req.params.index] = req.body;
  console.log(req.body);
  res.redirect("/poke"); //redirect to the index page
});

// GET -- edit Pokemon page
app.get("/poke/:index/edit", (req, res) => {
  res.render(
    "posts/edit.ejs", //render views/edit.ejs
    {
      data: Pokemon[req.params.index],
      index: req.params.index,
    }
  );
});

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
