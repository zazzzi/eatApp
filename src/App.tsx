import React, { useState, useEffect } from 'react';
import {db} from './firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
 
function App() {
  const [newName, setNewName] = useState<string>("")
  const [newNumber, setNewNumber] = useState<any>(0)
  const [users, setUsers] = useState<any>([]);
  const usersCollectionRef = collection(db, 'users')

  //adds to database
  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, phone: Number(newNumber)})
  }

  const deleteUser = async (id: any) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)

  }

  const updateUser = async (id: any, number: any) => {
    const userDoc = doc(db, "users", id)
    const newFields = {phone: number + 1}
    await updateDoc(userDoc, newFields)
  }

  // fetches all database.
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getUsers()
  }, [users])

  return (
    <div >
      <input placeholder="Name" onChange={(event) => {
        setNewName(event.target.value)
      }}/>
      <input type="number" placeholder="Number" onChange={(event) => {
        setNewNumber(event.target.value)
      }}/>
      <button onClick={createUser}>Create User</button>
      {
        users.map((user: any) => 
          <div>
            {user.name + " " + user.phone}
            <button onClick={() => {updateUser(user.id, user.phone)}}>increase number</button>
            <button onClick={() => {deleteUser(user.id)}}>delete</button>
          </div>
          
        ) 
      }
    </div>
  );
}

export default App;
