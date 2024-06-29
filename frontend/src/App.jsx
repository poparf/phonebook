import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import DbService from "./services/DbService";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    DbService.getAllPersonsFromDb().then((persons) => {
      setPersons(persons);
      setPersonsToShow(persons);
    });
  }, []);

  const [personsToShow, setPersonsToShow] = useState(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Message text={message}/>
      <Filter persons={persons} setPersonsToShow={setPersonsToShow} />
      <h1>Add a new person</h1>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setPersonsToShow={setPersonsToShow}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons
        setPersons={setPersons}
        personsToShow={personsToShow}
        setPersonsToShow={setPersonsToShow}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
