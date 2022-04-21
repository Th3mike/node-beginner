// config inicial

require("dotenv").config();
const express = require("express");
const app = express();
<<<<<<< HEAD
var cors = require('cors');

// depois do db
const mongoose = require("mongoose");
=======

// depois do db
const mongoose = require("mongoose");

>>>>>>> 7def8b7 (curso concluido)
const Bosses = require("./models/Bosses");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas
app.post("/bosses", async (req, res) => {
  const { name, level, description, approved } = req.body;

  const bosses = {
    name,
    level,
    description,
    approved,
  };

  try {
    await Bosses.create(bosses);

    res.status(201).json({ message: "Boss inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

//Exibir o json
<<<<<<< HEAD
app.get("/bosses", async (req, res) => {
=======
app.get("/", async (req, res) => {
>>>>>>> 7def8b7 (curso concluido)
  try {
    const bosses = await Bosses.find();

    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

app.get("/bosses/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const bosses = await Bosses.findOne({ _id: id });

    if (!Bosses) {
      res.status(422).json({ message: "Boss não encontrado!" });
      return;
    }

    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

app.patch("/bosses/:id", async (req, res) => {
  const id = req.params.id;

  const { name, level, description, approved } = req.body;

  const bosses = {
    name,
    level,
    description,
    approved,
  };

  try {
    const updatedBosses = await Bosses.updateOne({ _id: id }, bosses);

    if (updatedBosses.matchedCount === 0) {
      res.status(422).json({ message: "Boss não encontrado!" });
      return;
    }

    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

app.delete("/bosses/:id", async (req, res) => {
  const id = req.params.id;

  const bosses = await Bosses.findOne({ _id: id });

  if (!bosses) {
    res.status(422).json({ message: "Boss não encontrado!" });
    return;
  }

  try {
    await Bosses.deleteOne({ _id: id });

    res.status(200).json({ message: "Boss removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/*app.get("/", (req, res) => {
  res.json({ message: "AlohA!" });
});*/

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.rtyt4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectou ao banco!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
