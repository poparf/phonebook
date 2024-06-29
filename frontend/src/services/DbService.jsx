import axios from "axios";

//const url = "http://localhost:3001/api/persons";
const url = "/api/persons";

const addPersonToDb = (person) => {
  return axios.post(url, person);
};

const getAllPersonsFromDb = () => {
  return axios.get(url).then((response) => response.data);
};

const deletePersonFromDb = (person) => {
  return axios.delete(`${url}/${person.id}`);
};

const updatePersonFromDb = (person) => {
  return axios.put(`${url}/${person.id}`, person);
};

export default {
  addPersonToDb,
  getAllPersonsFromDb,
  deletePersonFromDb,
  updatePersonFromDb,
};
