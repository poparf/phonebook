import { useState } from "react";

const Filter = ({ persons, setPersonsToShow }) => {
  const [searchField, setSearchField] = useState("");
  return (
    <p>
      Search after name:{" "}
      <input
        value={searchField}
        onChange={(event) => {
          const value = event.target.value;
          setSearchField(value);

          if (value === "") setPersonsToShow(persons);
          else
            setPersonsToShow(
              persons.filter((x) =>
                x.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
              )
            );
        }}
      />
    </p>
  );
};

export default Filter;
