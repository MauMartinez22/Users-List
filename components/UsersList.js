import React from "react";
import { useState } from "react";
import UsersForm from "./UsersForm";
import axios from "axios";
import { useEffect } from "react";
import dlt from '../assets/borrar-usuario.svg'
import edit from '../assets/editar.svg'

const UsersList = ({ closeModal }) => {
  const [modalUser, setModalUser] = useState(false)
  const [user, setUser] = useState([])
  const [userSelected, setUserSeleced] = useState(null)

  

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUser(res.data))
  }, []);



  const getUser = () => {
    axios.get("https://users-crud1.herokuapp.com/users/").then((res) => {
      setUser(res.data)
      closeModal()
    })
  };

  const selectUser = (user) => {
    setUserSeleced(user)
  };

  const creatUser = () => {
    alert("crear user")
  };

  const deselectUser = () => {
    console.log("deseleccionado")
    setUserSeleced(null)
  };

  const deleteUser = (user) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
      .then((res) => {
        alert("User "+'"' + user.first_name + " " + user.last_name + '"'+ " have been deleted.")
        axios.get("https://users-crud1.herokuapp.com/users/").then((res) => {
          setUser(res.data);
          deselectUser();
        });
      });
  };

  return (
    <div>
      <div className="users-list">
        {user.map((user) => (
          <div className="card" key={user.id}>
            <h2>
              {user.first_name} {user.last_name}
            </h2>
            <p>Correo</p>
            <h3>{user.email}</h3>
            <p>Cumpleaños</p>
            <h4>{user.birthday}</h4>

            <div className="buttons-section">
              <button
                onClick={() => {
                  selectUser(user)
                  setModalUser(true)
                }}
                className="edit-btn"> <img src={edit} className="icon" /> </button>
              <button onClick={() => deleteUser(user)} className="delet-btn"> <img className="icon" src={dlt} /> </button>
            </div>
          </div>
        ))}
      </div>

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
  );
};

export default UsersList;



