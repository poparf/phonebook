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

// var fs = require("fs");
// var path = require("path");
// var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });
// setup the logger
//app.use(morgan("combined", { stream: accessLogStream }));

const PORT = process.env.PORT || 3001;

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

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }
//   app.use(requestLogger)

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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Serverul ruleaza la http://localhost:${PORT}`);
});
