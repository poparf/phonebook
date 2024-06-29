const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;

entries = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(entries);
});

app.get("/api/persons/:id", (req, res) => {
  let searchedId = req.params.id;
  let entry = entries.find((e) => e.id == searchedId);
  if (entry) res.send(entry);
  else res.status(400).end();
});

app.delete("/api/persons/:id", (req, res) => {
  entries = entries.filter((e) => e.id != req.params.id);
  res.status(200).end();
});

app.post("/api/persons", (req, res) => {
  let entry = req.body;
  if (!entry) {
    res.status(400).json({
      error: "Content missing.",
    });
  }

  // Check if entry has name and number fields
  if (!entry.hasOwnProperty("name") || !entry.hasOwnProperty("number"))
    res.status(400).json({
      error: "Request body must include name and number.",
    });
  // check if the name already exists in the phonebook
  if (entries.find((e) => e.name === entry.name))
    res.send(400).json({
      error: "Person with specified name is already in the phonebook.",
    });

  let newPerson = {
    id: String(Math.floor(Math.random() * 10000)),
    name: entry.name,
    number: entry.number,
  };
  entries = entries.concat(newPerson);
  res.status(201).location(`/api/persons/${newPerson.id}`).send(newPerson);
});

app.get("/info", (req, res) => {
  let noPersons = entries.length;
  let htmlContent = `
        <div>
            <p>Phonebook has info for ${noPersons} people.</p>
            <br/>
            ${new Date()}
        </div>
    `;
  res.send(htmlContent);
});

app.listen(PORT, () => {
  console.log(`Serverul ruleaza la http://localhost:${PORT}`);
});
