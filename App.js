
import { React, useEffect, useState } from "react";
import axios from "axios";
import UsersList from "./components/UsersList.js";
import UsersForm from "./components/UsersForm.js";
import './App.css'

const App = () => {
  const [user, setUser] = useState([]);
  const [userSelected, setUserSeleced] = useState(null);
  const [modalUser, setModalUser] = useState(false);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUser(res.data));
  }, []);


  const getUser = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUser(res.data));
  };

  const selectUser = (user) => {
    setUserSeleced(user);
  };

  const creatUser = () => {
    alert("crear user");
  };

  const deselectUser = () => {
    console.log("deseleccionado");
    setUserSeleced(null);
  };

  const deleteUser = (user) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
      .then((res) => {

        axios.get("https://users-crud1.herokuapp.com/users/").then((res) => {
          setUser(res.data);
          deselectUser();
        });
      });
  };

  const closeModal = () => setModalUser(false);

  return (
    <div>
      <div className="banner">
        <div>
          <button className="blind" onClick={getUser()}> <h1>Users List</h1> </button>
        </div>
        <div>
          <button
            className="new-user-btn"
            onClick={() => setModalUser(!modalUser)}
          >
            Crear Nuevo Usuario
          </button>
          {modalUser ? (
            <UsersForm
              getUser={getUser}
              userSelected={userSelected}
              deselectUser={deselectUser}
              creatUser={creatUser}
              closeModal={closeModal}
            />
          ) : null}
        </div>
      </div>

      <UsersList
        user={user}
        selectUser={selectUser}
        deleteUser={deleteUser}
        modalUser={setModalUser}
        closeModal={closeModal}
      />
    </div>
  );
};

export default App;


