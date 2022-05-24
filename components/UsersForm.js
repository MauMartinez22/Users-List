import axios from "axios"
import React, { useState, useEffect } from "react"
import close from '../assets/cruzar.svg'

const UsersForm = ({
  getUser,
  userSelected,
  deselectUser,
  creatUser,
  closeModal
}) => {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [birthday, setBirthday] = useState("")

  useEffect(() => {
    if (userSelected !== null) {
      setName(userSelected.first_name)
      setPassword(userSelected.password)
      setLastName(userSelected.last_name)
      setEmail(userSelected.email)
      setBirthday(userSelected.birthday)
    } else {
      setName("")
      setPassword("")
      setLastName("")
      setEmail("")
      setBirthday("")
    }
  }, [userSelected])
  
  const submit = (e) => {
    e.preventDefault();
    const user = {
      first_name: name,
      last_name: lastName,
      password,
      email,
      birthday
    };
    deselectUser()
    closeModal()
    getUser()
    axios
      .post("https://users-crud1.herokuapp.com/users/", user)
      .then(() => {
        getUser()
        deselectUser()
      })
      .catch((error) => console.log(error.response));

    if (userSelected !== null) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          user
        )
        .then(() => {
          getUser()
          deselectUser()
        });
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", user)
        .then(() => {
          getUser()
          deselectUser()
        })
        .catch((error) => console.log(error.response))
    }
    deselectUser()
    getUser()
  };

  return (
    <div className="modal">
      <div className="modal-continer">
        <form onSubmit={submit}>
          <div className="input-place">
            <label htmlFor="name" className="form-label">
              First name
            </label>
            <input
              //placeholder="Example"
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="input-place">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="input-place">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="eemail"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-place" >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="input-place">
            <label htmlFor="birthday" className="form-label">
              Birthday
            </label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              onChange={(e) => setBirthday(e.target.value)}
              value={birthday}
            />
          </div>
          <button id="submit" type="submit">Submit</button>
        </form>

        <button id="close" onClick={closeModal}> <img src={close} className='icon' /> </button>
      </div>
    </div>
  );
};

export default UsersForm;


