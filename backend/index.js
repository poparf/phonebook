require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
const morgan = require("morgan");
morgan.token("postBody", (req, res) => JSON.stringify(req.body));
let tiny = ":method :url :status :res[content-length] - :response-time ms";
app.use(morgan(`${tiny} :postBody`));
const entryModel = require("./models/entry");

const PORT = process.env.PORT || 3001;

app.get("/api/persons", (req, res) => {
  entryModel.find({}).then((data) => {
    res.json(data);
  });
});

app.get("/api/persons/:id", (req, res) => {
  entryModel
    .findById(req.params.id)
    .then((out) => {
      res.json(out);
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res) => {
  entryModel
    .deleteOne({ _id: req.params.id })
    .then((out) => {
      res.json(out);
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", async (req, res) => {
  let doc = await entryModel.findById(req.params.id);

  doc.name = req.body.name;
  doc.number = req.body.number;

  doc
    .save()
    .then((out) => {
      res.status(200).send(out);
    })
    .catch((er) => {
      next(err);
    });
});

app.post("/api/persons", async (req, res) => {
  let entry = req.body;

  if (!entry) {
    return res.status(400).json({
      error: "Content missing.",
    });
  }

  // Check if entry has name and number fields
  if (!entry.hasOwnProperty("name") || !entry.hasOwnProperty("number")) {
    return res.status(400).json({
      error: "Request body must include name and number.",
    });
  }

  // Check if the name already exists in the phonebook
  const existingEntry = await entryModel.findOne({ name: entry.name });
  if (existingEntry) {
    return res.status(400).json({
      error: "Person with specified name is already in the phonebook.",
    });
  }

  try {
    let newPhone = new entryModel({
      name: req.body.name,
      number: req.body.number,
    });

    const out = await entryModel.create(newPhone);
    return res.status(201).location(`/api/persons/${out.id}`).send(out);
  } catch (error) {
    next(error);
  }
});

app.get("/info", (req, res) => {
  entryModel
    .countDocuments({})
    .then((count) => {
      let htmlContent = `
    <div>
        <p>Phonebook has info for ${count} people.</p>
        <br/>
        ${new Date()}
    </div>
`;
      res.send(htmlContent);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (request, response, error) => {
  console.error(error.message);
  res.send(400).json({
    error: error.message,
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serverul ruleaza la http://localhost:${PORT}`);
});
