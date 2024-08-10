import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fitchData();
  }, []);
  async function fitchData() {
    const response = await axios.get("https://reqres.in/api/users?page=2");
    console.log(response);
    setUsers(response.data.data);
  }

  async function handleCreate() {
    const newUser = {
      first_name: "mohamad",
      last_name: "nemati",
      email: `mohamad@gmail.com`,
      avatar: "https://reqres.in/img/faces/10-image.jpg",
    };
    const response = await axios.post("https://reqres.in/api/users", newUser);
    setUsers([...users, newUser]);
  }

  async function handleUpdate(e) {
    e.first_name = "updated";
    const response = await axios.put(`https://reqres.in/api/users/${e.id}`);
    const updatedUsers = [...users];
    const index = updatedUsers.indexOf(e);
    updatedUsers[index] = { ...e };
    setUsers(updatedUsers);
  }

  const handleDelete = async (e) => {
    const response = await axios.delete(`https://reqres.in/api/users/${e.id}`);
    console.log(response);
    const newUsers = users.filter((u) => u.id !== e.id);
    setUsers(newUsers);
  };

  return (
    <>
      <button onClick={handleCreate} className="btn btn-success btn-lg mx-2 my-2">
        Create
      </button>
      <div className="row">
        {users.map((e, i) => {
          return (
            <div key={i} className="col-4 p-5 text-center">
              <img
                src={e.avatar}
                alt=""
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  height: "150px",
                }}
              />
              <h4>
                {e.first_name} {e.last_name}
              </h4>
              <h5>{e.email}</h5>
              <div className="row">
                <div className="col-6">
                  <button
                    onClick={() => {
                      handleUpdate(e);
                    }}
                    className="btn btn-info btn-lg"
                  >
                    Update
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={() => {
                      handleDelete(e);
                    }}
                    className="btn btn-danger btn-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Users;
