const express = require("express");
const Article = require("./../models/model_article");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Articles");
});

router.get("/new", (req, res) => {
  let newArticle = true;
  let update = false;
  res.render("articles/new", {
    article: new Article(),
    newArticle: newArticle,
    update: update,
  });
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/article", { article: article });
});

router.post("/new", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    article = await article.save();
    res.redirect("/articles/" + article.id);
  } catch (error) {
    res.render("articles/new", { article: article });
  }
});

router.get("/update/:id", async (req, res) => {
  let update = true;
  let newArticle = false;
  const article = await Article.findById(req.params.id);
  res.render("articles/new", {
    update: update,
    article: article,
    newArticle: newArticle,
  });
});

router.put("/update/:id", async (req, res) => {
  await Article.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
    },
    (error, docs) => {
      if (error) {
        console.log(error);
        res.redirect("/");
      } else {
        res.redirect(`/articles/${req.params.id}`);
        console.log(docs);
      }
    }
  );
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);

  res.redirect("/");
});

module.exports = router;
