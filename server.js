require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/model_article");
const app = express();

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  let articles = await Article.find().sort({ date: "desc" });

  res.render("index", { articles: articles });
});

app.listen(5000, () => {
  console.log("Ton serv marche: http://localhost:5000");
});
