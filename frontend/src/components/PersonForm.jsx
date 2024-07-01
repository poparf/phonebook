import { useState } from "react";
import DbService from "../services/DbService";



const PersonForm = ({ persons, setPersons, setPersonsToShow, setMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let foundPerson;
    if ((foundPerson = persons.find((x) => x.name === newName))) {
      let response = confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one ?`
      );

      if (response) {
        foundPerson.number = newNumber;
        DbService.updatePersonFromDb(foundPerson).then(res => {
          setNewName("");
          setNewNumber("");
          setPersonsToShow([...persons]);
    
          setMessage(`Replaced phone number for ${newName}.`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }).catch(error => {
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
      }
      return;
    }

  
    let newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
    };
    DbService.addPersonToDb(newPerson).then(res => {
      console.log("im herethen");
      setPersons([...persons, newPerson]);
      setPersonsToShow([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
      setMessage(`Added new person: ${newName}.`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }).catch(error => {
      setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
    )
    
  };


 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        phone:{" "}
        <input
          value={newNumber}
          onChange={(e) => {
            setNewNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
