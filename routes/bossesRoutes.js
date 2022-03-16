const router = require("express").Router();

const res = require("express/lib/response");
const { restart } = require("nodemon");
const Bosses = require("../models/Bosses");

router.post("/", async (req, res) => {
  //req.body
  const { name, level, description, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome do boss é obrigatório!" });
    return;
  }

  //params definidos
  const bosses = {
    name,
    level,
    description,
    approved,
  };

  //Create
  try {
    //Criando dados
    await Bosses.create(bosses);
    res
      .status(201)
      .json({ message: "Boss adicionado no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read - leitura de dados
router.get("/", async (req, res) => {
  try {
    const bosses = await Bosses.find();

    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //extrair o dado da req, pela url = req.parms

  const id = req.params.id;

  try {
    const bosses = await Bosses.findOne({ _id: id });

    if (!bosses) {
      res.status(422).json({ message: "O boss não foi encontrado" });
      //nao executar a req.
      return;
    }
    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update PUT/PATCH

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, level, description, approved } = req.body;

  const bosses = {
    name,
    level,
    description,
    approved,
  };

  try {
    const updateBosses = await Bosses.updateOne({ _id: id }, bosses);

    if (updateBosses.matchedCount === 0) {
      res.status(422).json({ message: "O boss não foi encontrado" });
    }
    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete - deletar dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const bosses = await Bosses.findOne({ _id: id });

  if (!bosses) {
    res.status(422).json({ message: "O boss não foi encontrado" });
    //nao executar a req.
    return;
  }

  try {
    await Bosses.deleteOne({ _id: id });

    res.status(200).json({ message: "Boss removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
