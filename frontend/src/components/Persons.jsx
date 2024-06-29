import DbService from "../services/DbService";

const Persons = ({ setPersons, personsToShow, setPersonsToShow, setMessage }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}
            <button
              onClick={() => {
                DbService.deletePersonFromDb(p).then(() => {
                  
                  setTimeout(()=> {
                    setMessage("")
                  },5000)
                }).catch(() => {
                  setMessage("Person already deleted.");
                  setTimeout(()=> {
                    setMessage("")
                  },5000)
                });
                let finalPersons = personsToShow.filter((x) => x.id != p.id);
                  setPersonsToShow([...finalPersons]);
                  setPersons([...finalPersons]);
                  setMessage("Sucessfuly deleted.");
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Persons;
